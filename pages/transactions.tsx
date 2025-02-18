import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { Transactions } from '../components/Transactions';
import { permissionCheck } from '../permissions/check';

export default function TransactionsPage() {
  return (
    <div>
      <h1>All Transactions</h1>
      <Transactions />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // In Next.js 13+ or older versions, you might need a custom approach,
  // but conceptually we get the session from NextAuth:
  const session = await getServerSession(context.req, context.res, {
    // Provide your NextAuth config or pass the full NextAuthOptions
  });

  if (!session) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  if (!permissionCheck('CAN_VIEW_TRANSACTION_HISTORY', session)) {
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
