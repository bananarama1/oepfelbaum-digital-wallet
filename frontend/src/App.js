import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [bankAccounts,setBankAccounts] = useState(null);

  async function fetchBackendData() {
    const response = await fetch('api/bankAccounts');
    const body = await response.json();
    console.log(body);
    setBankAccounts(body);
  }

  async function fetchNatwestAccountAccessToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "W3iQzbLyZ5kA76SVkEYl7UOm42Y8mEgkeFZrK_WuafY=");
    urlencoded.append("client_secret", "Iz8rPlJLAyiMngfrILU1w5iUJUlcnANNJX-uuviJQw8=");
    urlencoded.append("scope", "accounts");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'manual'
    };
    const response = await fetch("token", requestOptions);
    const body = await response.json();
    console.log(body);
    return body;
  }

  async function postAccountRequest(accountAccessToken) {

    const authorizationString = accountAccessToken.token_type + ' ' + accountAccessToken.access_token;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", authorizationString);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Data": {
        "Permissions": [
          "ReadAccountsDetail",
          "ReadBalances",
          "ReadTransactionsCredits",
          "ReadTransactionsDebits",
          "ReadTransactionsDetail"
        ]
      },
      "Risk": {}
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'manual'
    };
    const response = await fetch("open-banking/v3.1/aisp/account-access-consents", requestOptions);
    const body = await response.json();
    console.log(body);
    return body;
  }


  useEffect(() => {
    fetchBackendData().then(fetchNatwestAccountAccessToken).then(postAccountRequest);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World</p>
      </header>
    </div>
  );
}

export default App;
