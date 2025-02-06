import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/session';
import { Transactions } from '../components/Transactions';

export default function TransactionsPage() {
    return (
        <div>
            <h1>All Transactions</h1>
            <Transactions />
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
