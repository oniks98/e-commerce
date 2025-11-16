# Edge Function: Update User Phone

This Edge Function updates the `phone` field in the `auth.users` table using Supabase Admin API.

## Deploy the Function

1. **Ensure Supabase CLI is installed:**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link your project:**
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. **Deploy the function:**
   ```bash
   supabase functions deploy update-user-phone
   ```

5. **Verify deployment:**
   Go to your Supabase Dashboard → Edge Functions and check if `update-user-phone` is listed.

## Environment Variables

The function uses these automatically provided environment variables:
- `SUPABASE_URL` - Your project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key with admin privileges

No additional configuration needed!

## Testing

You can test the function using curl:

```bash
curl -i --location --request POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/update-user-phone' \
  --header 'Authorization: Bearer YOUR_USER_JWT_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"phone":"0675679990"}'
```

## How It Works

1. User submits profile form with phone number
2. Client updates user metadata via `supabase.auth.updateUser()`
3. Client calls Edge Function with phone number
4. Edge Function:
   - Verifies user's JWT token
   - Validates phone format
   - Formats phone to E.164 (+380...)
   - Updates `auth.users.phone` using Admin API
   - Also updates `user_metadata.phone` for backward compatibility
5. Client refreshes user data

## Phone Format

- The function expects phone numbers in any format (e.g., "0675679990")
- Automatically converts to E.164 format (e.g., "+380675679990")
- If number already starts with "+", it's used as-is
- Ukrainian numbers are prefixed with "+38"

## Error Handling

The client gracefully handles Edge Function errors:
- If phone update fails, other profile data is still saved
- Errors are logged to console for debugging
- Success message shows even if phone update fails (with warning in console)
