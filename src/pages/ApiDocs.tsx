import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const CODE_EXAMPLES: Record<string, string> = {
  curl: `curl -X POST https://your-api-url/translate \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Привет, мир!",
    "targetLanguage": "en"
  }'`,
  js: `const response = await fetch('https://your-api-url/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Привет, мир!',
    targetLanguage: 'en',
  }),
});
const data = await response.json();
console.log(data.translatedText); // "Hello, World!"`,
  python: `import requests

resp = requests.post('https://your-api-url/translate', json={
    'text': 'Привет, мир!',
    'targetLanguage': 'en',
})
data = resp.json()
print(data['translatedText'])  # "Hello, World!"`,
};

type Tab = 'curl' | 'js' | 'python';

const RESPONSE_EXAMPLE = `{
  "id": 42,
  "translatedText": "Hello, World!",
  "detectedLanguage": "ru",
  "targetLanguage": "en"
}`;

export default function ApiDocs() {
  const [tab, setTab] = useState<Tab>('curl');
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Languages" size={18} />
            <span className="font-mono text-sm font-medium tracking-tight">LinguaAPI</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Переводчик
            </Link>
            <Link to="/features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-2xl font-medium tracking-tight mb-2">Документация API</h1>
          <p className="text-sm text-muted-foreground">Интегрируй перевод в любое приложение за несколько минут.</p>
        </div>

        <div className="space-y-10 animate-slide-up">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs bg-foreground text-primary-foreground px-2 py-0.5 rounded-sm">POST</span>
              <code className="font-mono text-sm">/translate</code>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Переводит текст на указанный язык. Язык источника определяется автоматически.
            </p>

            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Тело запроса</h3>
            <div className="border border-border rounded-sm overflow-hidden mb-8">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Поле</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Тип</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Обязательно</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Описание</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">text</td>
                    <td className="px-4 py-2.5 text-muted-foreground">string</td>
                    <td className="px-4 py-2.5 text-muted-foreground">да</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Текст для перевода</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">targetLanguage</td>
                    <td className="px-4 py-2.5 text-muted-foreground">string</td>
                    <td className="px-4 py-2.5 text-muted-foreground">да</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Код языка (ru, en, de, fr…)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Ответ 200</h3>
            <div className="border border-border rounded-sm overflow-hidden mb-8">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Поле</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Тип</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Описание</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">id</td>
                    <td className="px-4 py-2.5 text-muted-foreground">number</td>
                    <td className="px-4 py-2.5 text-muted-foreground">ID записи в базе данных</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">translatedText</td>
                    <td className="px-4 py-2.5 text-muted-foreground">string</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Переведённый текст</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">detectedLanguage</td>
                    <td className="px-4 py-2.5 text-muted-foreground">string</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Определённый язык источника</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">targetLanguage</td>
                    <td className="px-4 py-2.5 text-muted-foreground">string</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Язык перевода</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium mb-4">Примеры кода</h2>
            <div className="border border-border rounded-sm overflow-hidden">
              <div className="flex border-b border-border">
                {(['curl', 'js', 'python'] as Tab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2.5 text-xs font-mono transition-colors ${
                      tab === t
                        ? 'bg-foreground text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t === 'js' ? 'JavaScript' : t === 'python' ? 'Python' : 'cURL'}
                  </button>
                ))}
              </div>
              <div className="relative group">
                <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto bg-muted/20">
                  {CODE_EXAMPLES[tab]}
                </pre>
                <button
                  onClick={() => copy(CODE_EXAMPLES[tab])}
                  className="copy-btn absolute top-3 right-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <Icon name={copied ? 'Check' : 'Copy'} size={12} />
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium mb-4">Пример ответа</h2>
            <div className="border border-border rounded-sm overflow-hidden">
              <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto bg-muted/20">
                {RESPONSE_EXAMPLE}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium mb-4">Коды ошибок</h2>
            <div className="border border-border rounded-sm overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Код</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Причина</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">400</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Поле text пустое или отсутствует</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">500</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Внутренняя ошибка или недоступность Yandex Translate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
