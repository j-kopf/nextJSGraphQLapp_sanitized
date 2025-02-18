HighBar Owners ProdSec Training

This will be an interactive activity. This is a fake repo which includes security issues that need to be mitigated. When you discover an issue, submit a PR to correct it if you'd like. Note again that this is a faux repo, and will have issues if you try to build or run anything. The project isn't complete, so there won't be things like a Next.JS config. 

Some Rules for the interactive activity:
1. no ai/copilot
2. manually look for these if you don't find them all, its all good. Feel free to submit a PR to fix issues, or just note what's wrong, whatever you will get most valu
3. work individually, feel free to chat with a colleague if needed.
4. this code not build or compile. this is just meant to be a code exercise so this does n
5. ideally, you'll submit a PR with a fix for each issue you find. If you decide to do that, the format should be something like the below (pull-request.template.md). However, other options for this include noting all issues locally in some fashion (google Doc, or whatever else), or documenting all issies in a "New Issue" in GitHub. 
6. again, if you don't finish in time it's OK. feel free to ping me for any questions at any point.


## 📁 **Project Structure**
```
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
  ```



