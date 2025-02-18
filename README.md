HighBar Owners ProdSec Training

This will be an interactive activity. This repo will include security issues that need to be mitigated. When you discover an issue, submit a PR to correct it.

Some Rules for the interactive activity:
1. no ai/copilot
2. manually look for these if you don't find them all, its all good. 
3. work individually, feel free to chat with a colleague if needed.
4. this code not build or compile. this is just meant to be a code exercise so this does not need to be built or run.
5. again, if you don't finish in time it's OK. feel free to ping me for any questions at any point.




## 📁 **Project Structure**
/nextjsgraphqlapp_sanitized
  ├─ /backend
  │   └─ FinancialAccountManager.java
  ├─ /components
  │   ├─ AccountDetails.tsx
  │   ├─ Loan.tsx
  │   ├─ Transactions.tsx
  │   └─ UserDetails.tsx
  ├─ /config
  │   └─ config.yaml
  ├─ /graphql
  │   ├─ dataSources.ts
  │   ├─ resolvers.ts
  │   └─ schema.gql
  ├─ /pages
  │   ├─ index.tsx
  │   ├─ transactions.tsx
  │   ├─ unauthorized.tsx
  │   ├─ /api
  │   │   ├─ auth
  │   │   │   └─ [...nextauth].ts
  │   │   └─ graphql.ts
  │   └─ /profile
  │       └─ [userId].tsx
  ├─ /permissions
  │   └─ check.ts
  ├─ /styles
  │   ├─ components.css
  │   └─ globals.css
  ├─ README.md
  └─ package.json


