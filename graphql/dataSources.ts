export class UserAPI {
    async getUserDetails(userId: string) {
        const response = await fetch(`https://circle-api.com/user/${userId}/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        return await response.json();

        // Data from API:
        // {
        //     username: username,
        //     balance: "$" + (Math.random() * 5000).toFixed(2),
        //     taxID: "TAX-" + Math.floor(Math.random() * 1000000) // ❌ Vulnerability: Should not be exposed
        // };
    }

    async getTransactionHistory() {
        const response = await fetch(`https://circle-api.com/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }

        return await response.json();

        // Data from API
        // [
        //     { date: "2024-02-20", description: "Grocery Store", amount: "-$120.50", status: "Completed" },
        //     { date: "2024-02-18", description: "Salary Deposit", amount: "$3,000.00", status: "Completed" }
        // ]; // ❌ No authentication check (any user can request any transaction history)
    }

    async getAccountSettings(userId: string) {
        const response = await fetch(`https://circle-api.com/account/${userId}/settings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch account settings');
        }

        return await response.json();

        // Data from API:
        // {
        //     notifications: true,
        //     twoFactorAuth: false
        // };
    }

    async deleteUser(userId: string) {
        const response = await fetch(`https://circle-api.com/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        return response.status === 204;

        // ❌ No validation, any user can delete a user
    }
}
