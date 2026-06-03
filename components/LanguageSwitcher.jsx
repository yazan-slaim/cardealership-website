'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import styled from '@emotion/styled';

const SwitcherButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // e.g. /en/about

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    
    // Naively replace the locale in the URL
    // e.g., /en/about -> /ar/about
    // e.g., /en -> /ar
    let newPathname = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      newPathname = pathname.replace(`/${locale}/`, `/${nextLocale}/`);
    } else if (pathname === `/${locale}`) {
      newPathname = `/${nextLocale}`;
    }

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <SwitcherButton onClick={toggleLanguage} disabled={isPending}>
      {locale === 'en' ? 'العربية' : 'English'}
    </SwitcherButton>
  );
}
