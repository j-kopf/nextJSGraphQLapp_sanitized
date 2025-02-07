import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { permissionCheck } from '../permissions/check';

const FETCH_TRANSACTION_HISTORY = gql`
  query fetchTransactionHistory {
    fetchTransactionHistory {
      transactionId
      sender
      receiver
      amount
    }
  }
`;

export const Transactions = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>You must be logged in to view transactions.</p>;
  }

  if (!permissionCheck('CAN_VIEW_TRANSACTION_HISTORY', sessionData)) {
    return <p>Access Denied: You do not have permission to view transaction history.</p>;
  }

  const { data, loading, error } = useQuery(FETCH_TRANSACTION_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.fetchTransactionHistory.map((transaction: any) => (
          <tr key={transaction.transactionId}>
            <td>{transaction.transactionId}</td>
            <td>{transaction.sender}</td>
            <td>{transaction.receiver}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Transactions;
