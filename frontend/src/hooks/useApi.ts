'use client';

import { getCookie } from 'cookies-next/server';
import * as api from '@/lib/api';

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';
    
export function useApi() {
  return {
    getUser: async () => {
      const token = await getCookie(AUTH_COOKIE_NAME);
      return api.getUser(token ?? '');
    },
  };
}
