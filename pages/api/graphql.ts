import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import resolvers from "../../graphql/resolvers";
import { UserAPI } from "../../graphql/dataSources";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// IMPORTANT: For demonstration/training only; in production, never hardcode secrets.
// Typically, you'd store the schema in a separate file or import it.
const typeDefs = fs.readFileSync(
  path.join(process.cwd(), "graphql", "schema.gql"),
  "utf8"
);

const SECRET_KEY = "SuperSecretKey"; // ❌ Hardcoded key for demonstration (should be in env variables)

// Create the Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: NextApiRequest }) => {
    const token = req.headers.authorization?.split(" ")[1];
    let session = null;

    if (token) {
      try {
        // Decodes JWT. Example payload might be: { sub: "alice", role: "ADMIN", iat:..., exp:... }
        const decoded: any = jwt.verify(token, SECRET_KEY);

        // Build a session object with userId and role
        session = {
          userId: decoded.sub,
          role: decoded.role,
        };
      } catch (err) {
        console.warn("Invalid token"); // ❌ In real production, you might throw an error or handle it more gracefully.
      }
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
