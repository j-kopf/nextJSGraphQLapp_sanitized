#things to add for prod readme:
1. no ai/copilot
2. manually look for these if you don't find them all, its all good
3. GUEST user role should not see any PII (maybe comment in the code)
4. want to only edit your own stuff
5. user mapping file to encompass 3&4 above? 
6. no teams...individual ? 



# Secure GraphQL Training with Next.js & Apollo

## 📌 Project Overview
This project provides a **Next.js application with Apollo GraphQL** for **security code review training**.  
The goal is to **identify and mitigate security vulnerabilities** related to GraphQL API design and implementation.

---

## ⚠️ **Security Issues to Identify**
### 🚨 **1. Hardcoded API Keys**
- **File:** `config/config.yaml`
- **Issue:** Hardcoded API keys are stored **as plaintext**, making them easy to extract.
- **Fix:** Store API keys in environment variables.

### 🚨 **2. Stack Trace Exposure**
- **File:** `backend/FinancialAccountManager.java`
- **Issue:** Uses `printStackTrace()`, leaking internal system paths and sensitive debugging info.
- **Fix:** Replace `printStackTrace()` with proper logging.

### 🚨 **3. GraphQL Access Control Bypass: Profile Editing**
- **File:** `graphql/resolvers.ts`
- **Issue:** `updateUserProfile` mutation allows **any ADMIN to edit any profile**, rather than restricting them to editing their own.
- **Fix:** Implement backend validation to ensure an ADMIN can only edit their own profile.

### 🚨 **4. GraphQL Access Control Bypass: Tax ID Exposure**
- **File:** `graphql/resolvers.ts`
- **Issue:** `fetchUserDetails` query **allows GUEST users to view sensitive Tax ID data** if they hit the resolver directly.
- **Fix:** Enforce role-based access control on the backend.

---

## 📁 **Project Structure**
/secure-training-nextjs
  ├── /backend                  ✅ Contains stack trace exposure vulnerability
  │   ├── FinancialAccountManager.java  
  ├── /components               ✅ React components for each GraphQL operation
  │   ├── Account.tsx
  │   ├── Loan.tsx
  │   ├── UserDetails.tsx
  │   ├── UserProfile.tsx
  │   ├── UserTransactions.tsx
  ├── /config                   ✅ Contains hardcoded API keys
  │   ├── config.yaml
  ├── /graphql                  ✅ Apollo GraphQL schema & resolvers (Contains vulnerabilities)
  │   ├── dataSources.ts
  │   ├── resolvers.ts
  │   ├── schema.gql
  ├── /pages                    ✅ Next.js pages for UI navigation (NO vulnerabilities here)
  │   ├── index.tsx
  │   ├── account.tsx
  │   ├── loan.tsx
  │   ├── profile.tsx
  │   ├── transactions.tsx
  │   ├── userdetails.tsx
  │   ├── /api                   ✅ Next.js API routes for Apollo Server
  │   │   ├── graphql.ts
  ├── /styles                   ✅ Contains styles for UI components (NO vulnerabilities here)
  │   ├── components.css
  │   ├── globals.css
  ├── README.md                 ✅ Training Documentation
  ├── package.json              ✅ Node.js dependencies




---

## 🚀 **Next Steps**
1. **Review the GraphQL queries & resolvers for vulnerabilities.**
2. **Trace how data flows from the frontend to the backend.**
3. **Identify and document security issues, then propose fixes.**

📌 **This is a code review exercise—there is no need to build or deploy the project.**
