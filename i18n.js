import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

export const locales = ['en', 'ar'];

export default getRequestConfig(async () => {
  const headersList = headers();
  const locale = headersList.get('x-next-intl-locale') || 'en';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
