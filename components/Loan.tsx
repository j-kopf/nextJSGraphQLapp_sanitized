import { useQuery, gql } from '@apollo/client';

const FETCH_LOAN_DETAILS = gql`
    query fetchLoanDetails($username: String!) {
        fetchLoanDetails(username: $username)
    }
`;

const Loan = ({ username, role }: { username: string; role: string }) => {
    if (role !== "ADMIN") {
        return <p>Access Denied</p>; // ✅ Frontend correctly restricts access
    }

    const { data, loading, error } = useQuery(FETCH_LOAN_DETAILS, { variables: { username } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading loan details.</p>;

    return (
        <div>
            <h2>Loan Information</h2>
            <p>{data.fetchLoanDetails}</p>
        </div>
    );
};

export default Loan;
