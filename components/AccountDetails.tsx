import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { permissionCheck } from '../permissions/check';

const FETCH_MY_ACCOUNT_SETTINGS = gql`
  query fetchMyAccountSettings($userId: String!) {
    fetchMyAccountSettings(userId: $userId) {
      notifications
      twoFactorAuth
    }
  }
`;

export const AccountDetails = ({ userId }: { userId: string }) => {
  const { data: sessionData, status } = useSession();

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }
  if (!sessionData) {
    return <p>You must be logged in to view account settings.</p>;
  }

  // Front-end check for viewing account settings
  if (!permissionCheck('CAN_VIEW_ACCOUNT_SETTINGS', sessionData)) {
    return <p>Access Denied: You cannot view account settings.</p>;
  }

  const { data, loading, error } = useQuery(FETCH_MY_ACCOUNT_SETTINGS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading account settings.</p>;

  return (
    <div>
      <h2>Account Settings</h2>
      <p>Notifications: {data.fetchMyAccountSettings.notifications ? 'Enabled' : 'Disabled'}</p>
      <p>Two-Factor Authentication: {data.fetchMyAccountSettings.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
};

export default AccountDetails;
