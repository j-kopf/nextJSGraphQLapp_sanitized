// /graphql/resolvers.ts

import { IResolvers } from "@graphql-tools/utils";

const userRoles = {
  alice: "ADMIN",
  bob: "USER",
  carlos: "GUEST",
};

const resolvers: IResolvers = {
  Query: {
    // -------------------------------------
    // Existing Queries (with known issues)
    // -------------------------------------
    fetchUserDetails: (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      // ❌ No permission check: any user with a session can see any user's details
      return dataSources.userAPI.getUserDetails(userId);
    },

    fetchTransactionHistory: (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      // ❌ No permission check: any user with a session can see all transactions
      return dataSources.userAPI.getTransactionHistory();
    },

    fetchLoanDetails: (_, { username }, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      // Assume this is secure (not fully shown in prior code)
      return `Loan details for ${username}...`;
    },

    // -------------------------------------
    // VULNERABLE Query: fetchMyAccountSettings
    // -------------------------------------
    fetchMyAccountSettings: (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      // ❌ Vulnerability: We do NOT check session.userId === userId
      // which means ANY authenticated user can fetch ANY user's account settings.

      return dataSources.userAPI.getAccountSettings(userId);
    },

// a secure implementation might look like:
    // fetchMyAccountSettings: (_, { userId }, { dataSources, session }) => {
    //     if (!session) {
    //       throw new Error("Session required.");
    //     }
    //     // ✅ Fix: Restrict to self OR allow admin
    //     if (session.userId !== userId && session.role !== "ADMIN") {
    //       throw new Error("Access Denied: You can only view your own settings.");
    //     }
      
    //     return dataSources.userAPI.getAccountSettings(userId);
    //   },

    // -------------------------------------
    // Secure Queries (added previously)
    // -------------------------------------
    fetchOutstandingBalance: (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      if (session.role !== "ADMIN") {
        throw new Error("Access denied. Only admins can view outstanding balances.");
      }
      if (session.userId !== userId) {
        throw new Error("You can only view your own balance.");
      }
      return dataSources.userAPI.getOutstandingBalance(userId);
    },

    fetchAllOutstandingBalances: (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      if (session.role !== "ADMIN") {
        throw new Error("Access denied. Only admins can view all outstanding balances.");
      }
      return dataSources.userAPI.getAllOutstandingBalances();
    },

    generateMonthlyReport: (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error("Session required.");
      }
      if (session.role !== "ADMIN") {
        throw new Error("Access denied. Only admins can generate the monthly report.");
      }
      return dataSources.userAPI.generateMonthlyReport();
    },
  },

  Mutation: {
    updateUserProfile: (_, { username, newProfileData }, { dataSources, session }) => {
      // Original (vulnerable) logic
      // In reality, you'd check if session.role === 'ADMIN' or session.userId === username
      if (!session) {
        throw new Error("Session required.");
      }
      return `Updating user profile for ${username} with data: ${newProfileData}`;
    },
  },
};

export default resolvers;
