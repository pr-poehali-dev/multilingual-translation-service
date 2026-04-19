import json
import os
import urllib.request
import urllib.error
import psycopg2


def handler(event: dict, context) -> dict:
    """Переводит текст через Yandex Translate API и сохраняет результат в БД."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    text = body.get('text', '').strip()
    target_language = body.get('targetLanguage', 'en')

    if not text:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'text is required'}),
        }

    iam_token = os.environ.get('YANDEX_IAM_TOKEN', '')
    folder_id = 'b1gabr5rhlp92h6s3kp3'

    payload = json.dumps({
        'folderId': folder_id,
        'texts': [text],
        'targetLanguageCode': target_language,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://translate.api.cloud.yandex.net/translate/v2/translate',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {iam_token}',
        },
        method='POST',
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    translation = result['translations'][0]
    translated_text = translation['text']
    detected_language = translation.get('detectedLanguageCode')

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.translations (source_text, translated_text, target_language, detected_language) "
        f"VALUES (%s, %s, %s, %s) RETURNING id",
        (text, translated_text, target_language, detected_language),
    )
    record_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({
            'id': record_id,
            'translatedText': translated_text,
            'detectedLanguage': detected_language,
            'targetLanguage': target_language,
        }),
    }
