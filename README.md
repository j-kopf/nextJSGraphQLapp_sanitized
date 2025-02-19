HighBar Owners ProdSec Training

This will be an interactive activity. This is a fake repo which includes security issues that need to be mitigated. When you discover an issue, submit a PR to correct it if you'd like. Note again that this is a faux repo, and will have issues if you try to build or run anything. The project isn't complete, so there won't be things like a Next.JS config. 

Some Rules for the interactive activity:
1. No ai/copilot
2. Manually look for these if you don't find them all, its all good. 
3. Work individually and provide individual solutions, but feel free to chat with a colleague(s) if needed.
4. This code will not build or compile. This is just meant to be a code review exercise.
5. There are a few ways to go about submitting solutions. One option is to submit a PR with a fix for each issue you find. If you decide to do that, the format is defined in .github/pull_request_template.md. Other options for this include noting all issues locally in some fashion (google Doc, or whatever else is comfortable for you), or documenting all issies in a "New Issue" in GitHub. Open to other solutions as well, it's about what gives you the most value.
6. Again, if you don't finish in time it's OK. feel free to ping me for any questions at any point.


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



