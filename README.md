This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Create supabase project. [https://supabase.com/](https://supabase.com/)

2. Create github app in github.com and connect with supabase project.

3. Create .env.local file from the example.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Run stripe development webhook
```bash
stripe listen --forward-to localhost:3000/api/webhooks
```
6. And copy the webhook key into the env.local

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
