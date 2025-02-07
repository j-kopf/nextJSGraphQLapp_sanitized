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
    /**
     * JWT Callback
     * For demonstration, we simply map GitHub user "alice" => ADMIN,
     * "bob" => USER, everything else => GUEST.
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
