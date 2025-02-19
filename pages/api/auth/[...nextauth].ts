import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      switch (token?.name?.toLowerCase()) {
        // Should not hardcode role assignment, this can be easily bypassed
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
     * Session Callback
     * Expose the role from the token into the session.
     */
    async session({ session, token }) {
      session.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
