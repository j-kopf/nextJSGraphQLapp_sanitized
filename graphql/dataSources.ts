// /graphql/dataSources.ts

export class UserAPI {
    // =====================================
    // Existing Methods
    // =====================================

    async getUserDetails(userId: string) {
        // the api host should be loaded from the config file
        // No AUTH?
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
    }

    async getTransactionHistory() {
        // the api host should be loaded from the config file
        // No AUTH?
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
    }

    async getAccountSettings(userId: string) {
        // the api host should be loaded from the config file
        // No AUTH?
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
    }

    async deleteUser(userId: string) {
        // the api host should be loaded from the config file
        // No AUTH?
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
    }


    async getOutstandingBalance(userId: string) {
        // the api host should be loaded from the config file
        // No AUTH?
        //  endpoint for fetching a single user's outstanding balance
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
        //  endpoint for fetching outstanding balances for all users/companies
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
        // the api host should be loaded from the config file
        // No AUTH?
        //  endpoint for generating or fetching a monthly report
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
