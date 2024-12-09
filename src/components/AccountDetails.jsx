import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountDetails = ({ accountReference }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`/api/account/${accountReference}`);
        setAccount(response.data.account);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    if (accountReference) {
      fetchAccountDetails();
    }
  }, [accountReference]);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>Account Name: {account.accountName}</p>
      <p>Account Reference: {account.accountReference}</p>
      <p>Email: {account.customerEmail}</p>
      <p>Balance: ₦{account.balance}</p>
      <p>Account Type: {account.accounts[0]?.bank}</p>
    </div>
  );
};

export default AccountDetails;
