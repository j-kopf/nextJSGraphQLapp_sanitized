import React from 'react';
import { GetServerSideProps } from 'next';
import { UserDetails } from '../../components/UserDetails';
import { AccountDetails } from '../../components/AccountDetails';

interface ProfilePageProps {
    userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <h2>User Details</h2>
                <UserDetails userId={userId} />

                <h2>Account Details</h2>
                <AccountDetails userId={userId} />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { userId } = context.params;

    return {
        props: {
            userId,
        },
    };
};

export default ProfilePage;
