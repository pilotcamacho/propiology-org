import 'i18next';
import type common from '../public/locales/en/common.json';
import type nav from '../public/locales/en/nav.json';
import type auth from '../public/locales/en/auth.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      nav: typeof nav;
      auth: typeof auth;
    };
  }
}
