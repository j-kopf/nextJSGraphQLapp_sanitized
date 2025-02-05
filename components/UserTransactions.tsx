import { useQuery, useMutation, gql } from '@apollo/client';

const FETCH_USER_PROFILE = gql`
    query fetchUserDetails($username: String!) {
        fetchUserDetails(username: $username) {  // ❌ No authentication check
            username
            balance
            taxID  // ❌ Vulnerability: Exposed to all users, including GUEST
        }
    }
`;

const UPDATE_USER_PROFILE = gql`
    mutation updateUserProfile($username: String!, $newProfileData: String!) {
        updateUserProfile(username: $username, newProfileData: $newProfileData)  // ❌ Any ADMIN can edit any user
    }
`;

export const UserTransactions = () => {
    const { data, loading, error } = useQuery(FETCH_USER_PROFILE, { variables: { username } });
    const [updateProfile] = useMutation(UPDATE_USER_PROFILE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user profile.</p>;

    const handleEditProfile = () => {
        if (role !== "ADMIN") {
            alert("You do not have permission to edit this profile."); // ✅ Secure frontend check
            return;
        }
        updateProfile({ variables: { username, newProfileData: "Updated Profile Info" } }); // ❌ No backend validation
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {data.fetchUserDetails.username}</p>
            <p>Balance: {data.fetchUserDetails.balance}</p>
            <p>Tax ID: {data.fetchUserDetails.taxID} {/* ❌ Visible to all users, including GUEST */}</p>
            {role === "ADMIN" && (
                <button onClick={handleEditProfile}>Edit Profile</button> // ❌ Allows any ADMIN to edit any profile
            )}
        </div>
    );
};

export default UserTransactions;
