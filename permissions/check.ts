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
