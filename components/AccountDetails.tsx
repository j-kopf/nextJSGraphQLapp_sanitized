import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';

const FETCH_ACCOUNT_SETTINGS = gql`
    query fetchAccountSettings($userId: String!) {
        fetchAccountSettings(userId: $userId) {
            notifications
            twoFactorAuth
        }
    }
`;

export const AccountDetails = ({ userId }: { userId: string }) => {
    const { role } = useSession();
    const { data, loading, error } = useQuery(FETCH_ACCOUNT_SETTINGS, { variables: { userId } });

    if (role !== "ADMIN") {
        return <p>Access Denied</p>; // ✅ Frontend correctly restricts access
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading account settings.</p>;

    return (
        <div>
            <h2>Account Settings</h2>
            <p>Notifications: {data.fetchAccountSettings.notifications ? "Enabled" : "Disabled"}</p>
            <p>Two-Factor Authentication: {data.fetchAccountSettings.twoFactorAuth ? "Enabled" : "Disabled"}</p>
        </div>
    );
};

export default AccountDetails;
