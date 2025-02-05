import { useQuery, useMutation, gql } from '@apollo/client';
import { useSession } from 'next-auth/react'

const FETCH_USER_DETAILS = gql`
  query fetchUserDetails($userId: String!) {
    fetchUserDetails(userId: $userId) {
      username
      balance
      taxID  // ❌ Vulnerability: Tax ID is exposed here
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($userId: String!) {
    updateUserProfile(userId: $userId)
  }
`;

export const UserDetails = ({ userId }: { userId: string }) => {
      const { role, userId: sessionUserId } = useSession()
      
      const { data, loading, error } = useQuery(FETCH_USER_DETAILS, {
        variables: { userId },
      });
      const [deleteUser] = useMutation(DELETE_USER);
  
      const handleDeleteUser = () => {
          if (role !== "ADMIN" || userId === sessionUserId) {
              alert("You do not have permission to delete this user."); // ✅ Secure frontend check
              return;
          }
          
          deleteUser({ variables: { userId } });
      };



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user details.</p>;

    return (
        <div>
            <p>Username: {data.fetchUserDetails.username}</p>
            <p>Balance: {data.fetchUserDetails.balance}</p>
            <p>Tax ID: {data.fetchUserDetails.taxID} {/* ❌ Sensitive information exposed */}</p>
            {role === "ADMIN" && userId !== sessionUserId && (
                <button onClick={handleDeleteUser}>Edit Profile</button> // ✅ Frontend enforces restriction
            )}
        </div>
    );
};

export default UserDetails;
