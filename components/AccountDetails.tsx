// /components/AccountDetails.tsx

import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';

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
  
  // We'll assume our session has { userId: string; role: string } if logged in
  const sessionUserId = sessionData?.userId || null;

  // 1. Check if we're authenticated
  if (status === 'loading') {
    return <p>Loading session...</p>;
  }
  if (!sessionUserId) {
    return <p>Access Denied: You must be logged in.</p>;
  }

  // 2. Front-end Enforced Ownership Check
  //    Only allow the user to view their own settings.
  if (sessionUserId !== userId) {
    return <p>Access Denied: You can only view your own account settings.</p>;
  }

  // 3. Perform the GraphQL query
  const { data, loading, error } = useQuery(FETCH_MY_ACCOUNT_SETTINGS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading account settings.</p>;

  return (
    <div>
      <h2>Account Settings</h2>
      <p>
        Notifications: {data.fetchMyAccountSettings.notifications ? 'Enabled' : 'Disabled'}
      </p>
      <p>
        Two-Factor Authentication:{' '}
        {data.fetchMyAccountSettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
      </p>
    </div>
  );
};

export default AccountDetails;
