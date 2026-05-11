'use server';

import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next/server';

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetctApi<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
    cache: 'no-store',
  };

  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API 요청 실패 : ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const conTentType = response.headers.get('Content-Type');
  if (conTentType && conTentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

export async function getUser(token?: string) {
  if (!token && typeof window !== 'undefined') {
    token = await getCookie(AUTH_COOKIE_NAME, { cookies });
  }

  return fetctApi<string>(
    '/user-test',
    {
      method: 'GET',
    },
    token,
  );
}
