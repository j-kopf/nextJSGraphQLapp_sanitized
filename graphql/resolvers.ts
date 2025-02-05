import { IResolvers } from '@graphql-tools/utils';

const userRoles = {
    alice: "ADMIN",
    bob: "USER",
    carlos: "GUEST"
};

const resolvers: IResolvers = {
    Query: {
        fetchUserDetails: (_, { userId }, { dataSources, session }) => {
            if (!session) {
                throw new Error("Session required.");
            }

            return dataSources.userAPI.getUserDetails(userId); // ❌ No permission check
        },

        fetchTransactionHistory: (_, __, { dataSources, session }) => {
            if (!session) {
                throw new Error("Session required.");
            }
            
            return dataSources.userAPI.getTransactionHistory(); // ❌ No permission check
        },

        fetchAccountSettings: (_, { userId }, { dataSources, session }) => {
            if (!session || session.role !== "ADMIN") {
                throw new Error("Access Denied"); // ✅ Secure Implementation
            }
            return dataSources.userAPI.getAccountSettings(userId);
        },
    },

    Mutation: {
        deleteUser: (_, { userId }, { dataSources, session }) => {
            if (!session) {
                throw new Error("Session required.");
            }

            return dataSources.userAPI.updateUserProfile(userId); // ❌ No validation, any ADMIN can edit any user
        }
    }
};

export default resolvers;
