import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/session';
import { UserTransactions } from '../components/UserTransactions';

export default function TransactionsPage() {
    return (
        <div>
            <h1>User Transactions</h1>
            <UserTransactions />
        </div>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getServerSession(req, res)

    if (!session || (session.role !== 'ADMIN' && session.role !== 'READ_ONLY_ADMIN')) {
        return {
            redirect: {
                destination: '/unauthorized',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
