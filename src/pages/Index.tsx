import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ar', label: 'العربية' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'pl', label: 'Polski' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'uk', label: 'Українська' },
];

const LANG_LABELS: Record<string, string> = Object.fromEntries(
  LANGUAGES.map(l => [l.code, l.label])
);

export default function Index() {
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const translate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setTranslatedText('');
    setDetectedLang('');
    try {
      const resp = await fetch('https://functions.poehali.dev/a4a72ef8-f713-498c-af93-d498d39b1352', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, targetLanguage: targetLang }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Ошибка перевода');
      setTranslatedText(data.translatedText);
      setDetectedLang(data.detectedLanguage || '');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Ошибка перевода';
      toast({ title: 'Ошибка', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearAll = () => {
    setSourceText('');
    setTranslatedText('');
    setDetectedLang('');
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
            <Link to="/features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </Link>
            <Link to="/api-docs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              API
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-2xl font-medium tracking-tight mb-2">Переводчик</h1>
          <p className="text-sm text-muted-foreground">Мгновенный перевод на 15+ языков через Yandex Translate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-sm animate-scale-in">
          <div className="flex flex-col border-r border-border">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs text-muted-foreground font-mono">
                {detectedLang
                  ? `Определено: ${LANG_LABELS[detectedLang] ?? detectedLang}`
                  : 'Исходный текст'}
              </span>
              {sourceText && (
                <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Очистить
                </button>
              )}
            </div>
            <Textarea
              value={sourceText}
              onChange={e => setSourceText(e.target.value)}
              placeholder="Введите текст для перевода..."
              className="flex-1 min-h-[260px] resize-none border-0 rounded-none focus-visible:ring-0 text-sm p-4"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translate();
              }}
            />
            <div className="px-4 py-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">{sourceText.length} симв.</span>
              <span className="text-xs text-muted-foreground">Ctrl+Enter — перевести</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="h-auto border-0 p-0 text-xs font-mono text-muted-foreground shadow-none focus:ring-0 w-auto gap-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(l => (
                    <SelectItem key={l.code} value={l.code} className="text-xs font-mono">
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {translatedText && (
                <button onClick={copyResult} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Icon name={copied ? 'Check' : 'Copy'} size={12} />
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              )}
            </div>
            <div className="flex-1 min-h-[260px] p-4">
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  Переводим...
                </div>
              ) : translatedText ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Перевод появится здесь</p>
              )}
            </div>
            <div className="px-4 py-3 border-t border-border flex items-center justify-end">
              <span className="text-xs text-muted-foreground font-mono">{translatedText.length} симв.</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={translate}
            disabled={!sourceText.trim() || loading}
            className="h-9 px-6 text-sm"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={14} className="animate-spin mr-2" />
                Перевожу...
              </>
            ) : (
              <>
                <Icon name="ArrowRight" size={14} className="mr-2" />
                Перевести
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}