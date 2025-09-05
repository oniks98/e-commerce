//src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

// Singleton для клиента браузера
let clientInstance: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }

  return clientInstance;
}
