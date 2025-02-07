import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import resolvers from "../../graphql/resolvers";
import { UserAPI } from "../../graphql/dataSources";
import { getServerSession } from 'next-auth';
import fs from "fs";
import path from "path";

// IMPORTANT: For demonstration/training only; in production, never hardcode secrets.
// Typically, you'd store the schema in a separate file or import it.
const typeDefs = fs.readFileSync(
  path.join(process.cwd(), "graphql", "schema.gql"),
  "utf8"
);

// Create the Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
    const session = await getServerSession(req, res)

    if (!session) {
      throw new Error("Session required.");
    }

    return {
      session,
      dataSources: {
        userAPI: new UserAPI(),
      },
    };
  },
});

// Disable body parsing (handled by Apollo)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Next.js API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
