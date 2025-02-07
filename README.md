#things to add for prod readme:
1. no ai/copilot
2. manually look for these if you don't find them all, its all good
3. no teams...individual ? 




=============================
SECURITY VULNERABILITIES LIST
=============================

File & Location: config/config.yaml
Issue & Explanation:
  - Hardcoded API Keys (e.g., paymentGatewayKey, smsProviderKey)
Details / Impact:
  - Storing secrets in plain text is risky—if the repo leaks, attackers get these keys.
Suggested Fix & Code Snippet:
  - Move to environment variables or secrets manager.
  Example (in config.yaml):
    api:
      paymentGatewayKey: "${PAYMENT_GATEWAY_KEY}"
  Then set the actual key in .env or a secure vault.

------------------------------------------------------------------

File & Location: backend/FinancialAccountManager.java (e.printStackTrace())
Issue & Explanation:
  - Stack Trace Exposure
Details / Impact:
  - Printing full stack traces can disclose internal paths, configs, or credentials in logs.
Suggested Fix & Code Snippet:
  - Use secure logging.
    Example:
      catch (IOException e) {
        logger.log(Level.SEVERE, "Error loading configuration: {0}", e.getMessage());
      }

------------------------------------------------------------------

File & Location: backend/FinancialAccountManager.java (logger.info(...) line)
Issue & Explanation:
  - Logging Sensitive Info (DB credentials)
Details / Impact:
  - DB_USER and DB_PASSWORD end up in logs, accessible to staff or attackers who read logs.
Suggested Fix & Code Snippet:
  - Don’t log secrets. 
    Vulnerable line:
      logger.info("Loaded DB credentials -> user: " + DB_USER + ", password: " + DB_PASSWORD);
    Remove or mask the password:
      logger.info("Loaded DB user: " + DB_USER);

------------------------------------------------------------------

File & Location: pages/api/auth/[...nextauth].ts (jwt callback)
Issue & Explanation:
  - Weak Role Assignment based on GitHub username (alice => ADMIN)
Details / Impact:
  - Attackers can create a GitHub user named “alice” to escalate privileges.
Suggested Fix & Code Snippet:
  - Fetch roles from a secure DB or identity provider.
    Example:
      async jwt({ token }) {
        const userRecord = await getUserFromDB(token.sub);
        token.role = userRecord.role;
        return token;
      }

------------------------------------------------------------------

File & Location: graphql/resolvers.ts → fetchUserDetails
Issue & Explanation:
  - No Permission Check for taxID => GUEST can see sensitive data
Details / Impact:
  - The UI checks CAN_VIEW_SENSITIVE_DATA, but the resolver only checks session existence.
    A GUEST can bypass the UI and still retrieve taxID via GraphQL calls.
Suggested Fix & Code Snippet:
  - Add a permission check in the resolver:
    fetchUserDetails: async (_, { userId }, { dataSources, session }) => {
      if (!session) throw new Error("Session required.");
      if (!permissionCheck('CAN_VIEW_SENSITIVE_DATA', session)) {
        throw new Error("Access denied.");
      }
      return dataSources.userAPI.getUserDetails(userId);
    },

------------------------------------------------------------------

File & Location: graphql/resolvers.ts → fetchMyAccountSettings
Issue & Explanation:
  - No Ownership Check => user can fetch other people's account settings
Details / Impact:
  - The UI only sends the current user’s ID, but the resolver doesn’t confirm session.userId == userId.
    Attackers can request any user’s settings directly.
Suggested Fix & Code Snippet:
  - Enforce ownership or admin override:
    fetchMyAccountSettings: async (_, { userId }, { dataSources, session }) => {
      if (!session) throw new Error("Session required.");
      if (!permissionCheck('CAN_VIEW_ACCOUNT_SETTINGS', session)) {
        throw new Error("Access denied.");
      }
      if (session.userId !== userId && session.role !== 'ADMIN') {
        throw new Error("You cannot view others' settings.");
      }
      return dataSources.userAPI.getAccountSettings(userId);
    },

------------------------------------------------------------------

File & Location: graphql/resolvers.ts → updateUserProfile
Issue & Explanation:
  - No Server-Side Check => any authenticated user can update/delete any user
Details / Impact:
  - The UI checks CAN_DELETE_USERS, but the resolver has no check. 
    Normal USER or GUEST can call the mutation directly in GraphQL.
Suggested Fix & Code Snippet:
  - Reintroduce permission check:
    updateUserProfile: async (_, { username, newProfileData }, { dataSources, session }) => {
      if (!session) throw new Error("Session required.");
      if (!permissionCheck('CAN_DELETE_USERS', session)) {
        throw new Error("Access denied.");
      }
      return dataSources.userAPI.updateUserProfile(username, newProfileData);
    },

------------------------------------------------------------------

File & Location: graphql/schema.gql → type User { taxID: String! }
Issue & Explanation:
  - Sensitive Field (taxID) directly exposed in schema
Details / Impact:
  - If the resolver doesn’t block it for unauthorized users, taxID can be fetched by anyone with a session.
Suggested Fix & Code Snippet:
  - Either remove taxID from the public schema or strictly enforce checks in fetchUserDetails.
    Example:
      type User {
        username: String!
        balance: String!
        taxID: String @deprecated(reason: "Sensitive")
      }
    Or confirm only roles with CAN_VIEW_SENSITIVE_DATA can see it.

## 📁 **Project Structure**
/secure-training-nextjs
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

---

## 🚀 **Next Steps**
1. **Review the GraphQL queries & resolvers for vulnerabilities.**
2. **Trace how data flows from the frontend to the backend.**
3. **Identify and document security issues, then propose fixes.**

📌 **This is a code review exercise—there is no need to build or deploy the project.**
