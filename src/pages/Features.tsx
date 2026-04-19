import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const LANGUAGES = [
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'FR', label: 'Français' },
  { code: 'ES', label: 'Español' },
  { code: 'IT', label: 'Italiano' },
  { code: 'PT', label: 'Português' },
  { code: 'ZH', label: '中文' },
  { code: 'JA', label: '日本語' },
  { code: 'KO', label: '한국어' },
  { code: 'AR', label: 'العربية' },
  { code: 'TR', label: 'Türkçe' },
  { code: 'PL', label: 'Polski' },
  { code: 'NL', label: 'Nederlands' },
  { code: 'UK', label: 'Українська' },
];

const FEATURES = [
  {
    icon: 'Zap',
    title: 'Мгновенный перевод',
    desc: 'Результат за доли секунды — Yandex Translate обрабатывает запросы на серверах в России и СНГ.',
  },
  {
    icon: 'ScanText',
    title: 'Автоопределение языка',
    desc: 'Не нужно указывать исходный язык — система определяет его автоматически.',
  },
  {
    icon: 'Database',
    title: 'История переводов',
    desc: 'Все переводы сохраняются в базе данных и доступны через API.',
  },
  {
    icon: 'Code2',
    title: 'REST API',
    desc: 'Открытый API для интеграции сервиса в ваши приложения, боты и скрипты.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Надёжность',
    desc: 'Инфраструктура Яндекс Облака: 99.9% uptime, шифрование и защита данных.',
  },
  {
    icon: 'Globe2',
    title: '15+ языков',
    desc: 'Европейские, азиатские и восточные языки — один сервис для всех задач.',
  },
];

export default function Features() {
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
            <Link to="/api-docs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              API
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-2xl font-medium tracking-tight mb-2">Возможности</h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Сервис перевода на базе Yandex Translate — быстро, надёжно и с открытым API.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-sm mb-16 animate-scale-in">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-background p-6 flex flex-col gap-3">
              <Icon name={f.icon as never} size={18} className="text-foreground" />
              <h3 className="text-sm font-medium">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 animate-fade-in">
          <h2 className="text-base font-medium mb-1">Поддерживаемые языки</h2>
          <p className="text-xs text-muted-foreground mb-6">Перевод доступен в любую сторону между всеми языками.</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <span key={l.code} className="lang-chip active">
                <span className="mr-1.5 opacity-60">{l.code}</span>
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-border rounded-sm p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <p className="text-sm font-medium mb-1">Готовы начать?</p>
            <p className="text-xs text-muted-foreground">Попробуйте переводчик прямо сейчас или подключите API.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button className="h-9 px-5 text-sm">Попробовать</Button>
            </Link>
            <Link to="/api-docs">
              <Button variant="outline" className="h-9 px-5 text-sm">Документация API</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
