// /graphql/resolvers.ts

import { IResolvers } from '@graphql-tools/utils';
import { permissionCheck } from '../permissions/check';

const resolvers: IResolvers = {
  Query: {
    /**
     * fetchUserDetails: VULNERABILITY
     * Any authenticated user (including GUEST) can view 'taxID'.
     */
    fetchUserDetails: async (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      // ❌ No permissionCheck for CAN_VIEW_SENSITIVE_DATA => GUEST can see taxID
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

    /**
     * fetchLoanDetails
     * We'll require CAN_VIEW_SENSITIVE_DATA for loan data.
     */
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

    /**
     * fetchMyAccountSettings
     * We require CAN_VIEW_ACCOUNT_SETTINGS, but no ownership check => possible vulnerability.
     */
    fetchMyAccountSettings: async (_, { userId }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      if (!permissionCheck('CAN_VIEW_ACCOUNT_SETTINGS', session)) {
        throw new Error('Access denied: You cannot view account settings.');
      }
      return dataSources.userAPI.getAccountSettings(userId);
    },

    /**
     * fetchOutstandingBalance
     * We'll treat it as an admin-only check => needs CAN_VIEW_ALL_OUTSTANDING_BALANCES
     */
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

    /**
     * generateMonthlyReport
     * Also admin-only => needs CAN_GENERATE_MONTHLY_REPORT
     */
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
    /**
     * updateUserProfile
     * REMOVED server-side permission check => ANY authenticated user can do it,
     * ignoring front-end restrictions.
     */
    updateUserProfile: async (_, { username, newProfileData }, { dataSources, session }) => {
      if (!session) {
        throw new Error('Session required.');
      }
      // ❌ No permissionCheck => vulnerability.
      return dataSources.userAPI.updateUserProfile
        ? dataSources.userAPI.updateUserProfile(username, newProfileData)
        : `Updating user profile for ${username} with data: ${newProfileData}`;
    },
  },
};

export default resolvers;
