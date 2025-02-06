import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

/**
 * STEP 1: Define Roles.
 */
export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

/**
 * STEP 2: Define Role Permissions.
 *         Each role has a set of capabilities. We'll cover:
 *         - CAN_VIEW_SENSITIVE_DATA
 *         - CAN_DELETE_USERS
 *         - CAN_VIEW_TRANSACTION_HISTORY
 *         - CAN_VIEW_ACCOUNT_SETTINGS
 *         - CAN_VIEW_ALL_OUTSTANDING_BALANCES
 *         - CAN_GENERATE_MONTHLY_REPORT
 */
export const RolePermissions = {
  [Roles.ADMIN]: {
    CAN_VIEW_SENSITIVE_DATA: true,
    CAN_DELETE_USERS: true,
    CAN_VIEW_TRANSACTION_HISTORY: true,
    CAN_VIEW_ACCOUNT_SETTINGS: true,
    CAN_VIEW_ALL_OUTSTANDING_BALANCES: true,
    CAN_GENERATE_MONTHLY_REPORT: true,
  },
  [Roles.USER]: {
    CAN_VIEW_SENSITIVE_DATA: true,
    CAN_DELETE_USERS: false,
    CAN_VIEW_TRANSACTION_HISTORY: true,
    CAN_VIEW_ACCOUNT_SETTINGS: true,
    CAN_VIEW_ALL_OUTSTANDING_BALANCES: false,
    CAN_GENERATE_MONTHLY_REPORT: false,
  },
  [Roles.GUEST]: {
    CAN_VIEW_SENSITIVE_DATA: false, // GUEST should NOT see sensitive data
    CAN_DELETE_USERS: false,
    CAN_VIEW_TRANSACTION_HISTORY: false,
    CAN_VIEW_ACCOUNT_SETTINGS: false,
    CAN_VIEW_ALL_OUTSTANDING_BALANCES: false,
    CAN_GENERATE_MONTHLY_REPORT: false,
  },
};

/**
 * STEP 3: permissionCheck Utility
 *         We will use this in resolvers and frontend components
 *         to check if a session has a given permission.
 */
export function permissionCheck(
  permission: keyof typeof RolePermissions[Roles.ADMIN],
  session?: { role?: Roles }
): boolean {
  if (!session?.role) {
    return false; // Not logged in or no role => no permissions
  }
  const perms = RolePermissions[session.role];
  if (!perms) {
    return false; // Unknown role => no permissions
  }
  return perms[permission] === true;
}

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    /**
     * STEP 4: JWT Callback
     *         For demonstration, we simply map GitHub user "alice" => ADMIN,
     *         "bob" => USER, everything else => GUEST.
     */
    async jwt({ token }) {
      // If you have a GitHub username, let's see who you are.
      // token.name might be the GitHub profile name.
      switch (token?.name?.toLowerCase()) {
        case 'alice':
          token.role = Roles.ADMIN;
          break;
        case 'bob':
          token.role = Roles.USER;
          break;
        default:
          token.role = Roles.GUEST;
      }
      return token;
    },

    /**
     * STEP 5: Session Callback
     *         Expose the role from the token into the session.
     */
    async session({ session, token }) {
      session.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
