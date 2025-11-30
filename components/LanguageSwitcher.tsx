"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('header.languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-secondary transition-colors"
        aria-label={t('aria')}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden md:block text-sm font-medium">
          {locale === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-semibold">{t('label')}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center space-x-3 ${
                locale === 'en' ? 'bg-secondary font-medium' : ''
              }`}
            >
              <span>🇬🇧</span>
              <span>{t('english')}</span>
              {locale === 'en' && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
            <button
              onClick={() => handleLanguageChange('de')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center space-x-3 ${
                locale === 'de' ? 'bg-secondary font-medium' : ''
              }`}
            >
              <span>🇩🇪</span>
              <span>{t('german')}</span>
              {locale === 'de' && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
