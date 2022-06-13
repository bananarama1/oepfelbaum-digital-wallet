import './App.css';
import { useEffect, useState } from 'react';
import { GrMoney } from 'react-icons/gr';

function App() {
  const [bankAccounts,setBankAccounts] = useState(null);

  const clientId = "W3iQzbLyZ5kA76SVkEYl7UOm42Y8mEgkeFZrK_WuafY=";
  const clientSecret = "Iz8rPlJLAyiMngfrILU1w5iUJUlcnANNJX-uuviJQw8=";

  const accountList = [];

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
    urlencoded.append("client_id", clientId);
    urlencoded.append("client_secret", clientSecret);
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
      <OepfelbaumHeader/>
      <TotalAssets accountList={accountList}/>
    </div>
  );
}


function TotalAssets(accountList) {
  return(
    <div className='Total-assets'>
      <GrMoney size={30}/>
      <div>100000</div>
    </div>
  );
}

function OepfelbaumHeader() {
  return(
    <div className="Oepfelbaum-header">
      <div>Oepfelbaum | Digitales Portemonnaie</div>
    </div>
  );
}

export default App;
