//src\lib\supabase\middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

import { createServerClient } from '@supabase/ssr';

export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options }),
          );
          response.headers.forEach((value, key) => {
            if (
              key === 'set-cookie' &&
              !response.headers.getSetCookie().includes(value)
            ) {
              response.headers.append(key, value);
            }
          });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}
