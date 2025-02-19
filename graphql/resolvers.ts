// /graphql/resolvers.ts

import { IResolvers } from '@graphql-tools/utils';
import { permissionCheck } from '../permissions/check';

const resolvers: IResolvers = {
  Query: {
    // a user can fetch any user's details, userId should be fetched from authentication creds
    fetchUserDetails: async (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      return dataSources.userAPI.getUserDetails(userId);
    },

    /**
     * fetchTransactionHistory
     * Requires CAN_VIEW_TRANSACTION_HISTORY.
     */
    fetchTransactionHistory: async (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_TRANSACTION_HISTORY', session)) {
        throw new Error('Access denied: You cannot view transaction history.');
      }
      return dataSources.userAPI.getTransactionHistory();
    },

    fetchLoanDetails: async (_, { username }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_SENSITIVE_DATA', session)) {
        throw new Error('Access denied: You cannot view loan details.');
      }
      // Return placeholder for demonstration
      return `Loan details for ${username}... (secured content)`;
    },

    fetchMyAccountSettings: async (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_ACCOUNT_SETTINGS', session)) {
        throw new Error('Access denied: You cannot view account settings.');
      }
      return dataSources.userAPI.getAccountSettings(userId);
    },

    fetchOutstandingBalance: async (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_ALL_OUTSTANDING_BALANCES', session)) {
        throw new Error('Access denied: You cannot view outstanding balances.');
      }
      return dataSources.userAPI.getOutstandingBalance(userId);
    },

    /**
     * fetchAllOutstandingBalances
     * Also admin-only => needs CAN_VIEW_ALL_OUTSTANDING_BALANCES
     */
    fetchAllOutstandingBalances: async (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_ALL_OUTSTANDING_BALANCES', session)) {
        throw new Error('Access denied: You cannot view all outstanding balances.');
      }
      return dataSources.userAPI.getAllOutstandingBalances();
    },

    generateMonthlyReport: async (_, __, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_GENERATE_MONTHLY_REPORT', session)) {
        throw new Error('Access denied: You cannot generate monthly reports.');
      }
      return dataSources.userAPI.generateMonthlyReport();
    },
  },

  Mutation: {
    updateUserProfile: async (_, { username, newProfileData }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      return dataSources.userAPI.updateUserProfile
        ? dataSources.userAPI.updateUserProfile(username, newProfileData)
        : `Updating user profile for ${username} with data: ${newProfileData}`;
    },
  },
};

export default resolvers;
