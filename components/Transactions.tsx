import { useQuery, gql } from '@apollo/client';

const FETCH_TRANSACTION_HISTORY = gql`
    query fetchTransactionHistory($username: String!) {
        fetchUserTransactions(username: $username) {
            transactionId
            sender
            receiver
            amount
        }
    }
`;

export const Transactions = () => {
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
                {data.fetchUserTransactions.map((transaction: any) => (
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
