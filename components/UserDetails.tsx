// /components/UserDetails.tsx

import { useQuery, useMutation, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { permissionCheck } from '../permissions/check';

const FETCH_USER_DETAILS = gql`
  query fetchUserDetails($userId: String!) {
    fetchUserDetails(userId: $userId) {
      username
      balance
      taxID
    }
  }
`;

const DELETE_USER = gql`
  mutation updateUserProfile($username: String!, $newProfileData: String!) {
    updateUserProfile(username: $username, newProfileData: $newProfileData)
  }
`;

export const UserDetails = ({ userId }: { userId: string }) => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>You must be logged in to view user details.</p>;
  }
  // For reading user details, require CAN_VIEW_SENSITIVE_DATA
  if (!permissionCheck('CAN_VIEW_SENSITIVE_DATA', sessionData)) {
    return <p>Access Denied: You cannot view user details.</p>;
  }

  const { data, loading, error } = useQuery(FETCH_USER_DETAILS, {
    variables: { userId },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = () => {
    if (!permissionCheck('CAN_DELETE_USERS', sessionData)) {
      alert('You do not have permission to delete this user.');
      return;
    }
    deleteUser({ variables: { username: userId, newProfileData: 'DELETED' } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user details.</p>;

  return (
    <div>
      <p>Username: {data.fetchUserDetails.username}</p>
      <p>Balance: {data.fetchUserDetails.balance}</p>
      <p>Tax ID: {data.fetchUserDetails.taxID}</p>
      {permissionCheck('CAN_DELETE_USERS', sessionData) && (
        <button onClick={handleDeleteUser}>Delete User</button>
      )}
    </div>
  );
};

export default UserDetails;
