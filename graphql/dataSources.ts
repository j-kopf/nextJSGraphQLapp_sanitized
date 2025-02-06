// /graphql/dataSources.ts

export class UserAPI {
    // =====================================
    // Existing Methods
    // =====================================

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

    // =====================================
    // New Methods for the Secure Operations
    // =====================================

    async getOutstandingBalance(userId: string) {
        // Example endpoint for fetching a single user's outstanding balance
        const response = await fetch(`https://circle-api.com/user/${userId}/outstandingBalance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch outstanding balance');
        }

        // Assume the API returns { balance: "1234.56" }
        return await response.json();
    }

    async getAllOutstandingBalances() {
        // Example endpoint for fetching outstanding balances for all users/companies
        const response = await fetch(`https://circle-api.com/outstandingBalances`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all outstanding balances');
        }

        // Assume the API returns array of objects or a simple array of balances
        return await response.json();
    }

    async generateMonthlyReport() {
        // Example endpoint for generating or fetching a monthly report
        const response = await fetch(`https://circle-api.com/reports/monthly`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to generate monthly report');
        }

        // Assume it returns a string or structured data
        return await response.text();
    }
}
