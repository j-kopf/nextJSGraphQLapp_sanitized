import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { permissionCheck } from '../pages/api/auth/[...nextauth]';

const FETCH_LOAN_DETAILS = gql`
  query fetchLoanDetails($username: String!) {
    fetchLoanDetails(username: $username)
  }
`;

const Loan = ({ username }: { username: string }) => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Access Denied: You must be logged in.</p>;
  }

  // Must have CAN_VIEW_SENSITIVE_DATA to see loan details
  if (!permissionCheck('CAN_VIEW_SENSITIVE_DATA', sessionData)) {
    return <p>Access Denied: You do not have permission to view loan details.</p>;
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
