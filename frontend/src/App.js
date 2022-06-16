import './App.css';
import { useEffect, useState} from 'react';
import { GrMoney } from 'react-icons/gr';

function App() {
  const [bankAccounts, setBankAccounts] = useState([]);
  var natWestAuthorization;

  const clientId = "W3iQzbLyZ5kA76SVkEYl7UOm42Y8mEgkeFZrK_WuafY=";
  const clientSecret = "Iz8rPlJLAyiMngfrILU1w5iUJUlcnANNJX-uuviJQw8=";


  async function fetchBackendData() {
    const response = await fetch('api/bankAccounts');
    const body = await response.json();
    console.log(body);
    setBankAccounts(body._embedded.bankAccounts);
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
    const accountAccessToken = await response.json();
    console.log(accountAccessToken);
    natWestAuthorization = accountAccessToken.token_type + ' ' + accountAccessToken.access_token;
    return accountAccessToken;
  }

  async function postAccountRequest() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", natWestAuthorization);
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

  async function approveConsentProgrammatically(accountConsentRequest) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic VzNpUXpiTHlaNWtBNzZTVmtFWWw3VU9tNDJZOG1FZ2tlRlpyS19XdWFmWT06SXo4clBsSkxBeWlNbmdmcklMVTF3NWlVSlVsY25BTk5KWC11dXZpSlF3OD0=");
    // myHeaders.append("Access-Control-Allow-Origin", "*");

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code id_token",
      scope: "openid accounts",
      redirect_uri: "https://ecf5c9b1-e25c-49e2-b37a-0fb4d08e9da9.example.org/redirect",
      state: "ABC",
      request: accountConsentRequest.Data.ConsentId,
      authorization_mode: "AUTO",
      authorization_username: "123456789012@ecf5c9b1-e25c-49e2-b37a-0fb4d08e9da9.example.org"
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'manual',
    };

    const searchParamString = params.toString(); 
    const response = await fetch("authorize?" + searchParamString, requestOptions);
    const body = await response.text();
    console.log(body);
    let code = ""; //TODO: extract code from response body. body is empty for unknown reason. The same request sent from POSTMAN suddeeds.
    return code;
  }

  async function exchangeCodeForAccessToken(code) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "W3iQzbLyZ5kA76SVkEYl7UOm42Y8mEgkeFZrK_WuafY=");
    urlencoded.append("client_secret", "Iz8rPlJLAyiMngfrILU1w5iUJUlcnANNJX-uuviJQw8=");
    urlencoded.append("redirect_uri", "https://ecf5c9b1-e25c-49e2-b37a-0fb4d08e9da9.example.org/redirect");
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'manual'
    };

    //const response = await fetch("token", requestOptions).catch(console.log("Error in exchangeCodeForAccessToken"));
    const body = {};
    console.log(body);
    return body;
  }

  async function listAccounts(token) {
    //TODO: method can not work since approveConsentProgrammatically is not working. For now this method returns a static accountList object
    const accountList = {
      "Data": {
          "Account": [
              {
                  "AccountId": "13efad7b-24f2-48ef-b524-d4951d25c7bd",
                  "Currency": "GBP",
                  "AccountType": "Personal",
                  "AccountSubType": "Savings",
                  "Description": "Personal",
                  "Nickname": "Sydney Beard",
                  "Account": [
                      {
                          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                          "Identification": "50000012345602",
                          "Name": "Sydney Beard"
                      }
                  ]
              },
              {
                  "AccountId": "a91ec5ba-b0c2-40c2-8213-dea873a1fd12",
                  "Currency": "GBP",
                  "AccountType": "Personal",
                  "AccountSubType": "CurrentAccount",
                  "Description": "Personal",
                  "Nickname": "Sydney Beard",
                  "Account": [
                      {
                          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                          "Identification": "50000012345601",
                          "Name": "Sydney Beard"
                      }
                  ]
              }
          ]
      },
      "Links": {
          "Self": "https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts"
      },
      "Meta": {
          "TotalPages": 1
      }
    };
    console.log(accountList);
    return accountList;
  }
  async function getAccountBalances(accountId) {
    let balances;
    if (accountId === '13efad7b-24f2-48ef-b524-d4951d25c7bd') {
      balances = {
        "Data": {
            "Balance": [
                {
                    "AccountId": "13efad7b-24f2-48ef-b524-d4951d25c7bd",
                    "CreditDebitIndicator": "Credit",
                    "Type": "Expected",
                    "DateTime": "2022-05-31T10:15:00.000Z",
                    "Amount": {
                        "Amount": "125680.92",
                        "Currency": "GBP"
                    }
                },
                {
                    "AccountId": "13efad7b-24f2-48ef-b524-d4951d25c7bd",
                    "CreditDebitIndicator": "Credit",
                    "Type": "ForwardAvailable",
                    "DateTime": "2022-05-31T10:15:00.000Z",
                    "Amount": {
                        "Amount": "125680.92",
                        "Currency": "GBP"
                    }
                }
            ]
        },
        "Links": {
            "Self": "https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts/13efad7b-24f2-48ef-b524-d4951d25c7bd/balances"
        },
        "Meta": {
            "TotalPages": 1
        }
      };
    } else if(accountId === 'a91ec5ba-b0c2-40c2-8213-dea873a1fd12') {
      balances = {
        "Data": {
            "Balance": [
                {
                    "AccountId": "a91ec5ba-b0c2-40c2-8213-dea873a1fd12",
                    "CreditDebitIndicator": "Credit",
                    "Type": "Expected",
                    "DateTime": "2022-06-13T10:19:11.836Z",
                    "Amount": {
                        "Amount": "19601.40",
                        "Currency": "GBP"
                    }
                },
                {
                    "AccountId": "a91ec5ba-b0c2-40c2-8213-dea873a1fd12",
                    "CreditDebitIndicator": "Credit",
                    "Type": "ForwardAvailable",
                    "DateTime": "2022-06-13T10:19:11.836Z",
                    "Amount": {
                        "Amount": "19601.40",
                        "Currency": "GBP"
                    }
                }
            ]
        },
        "Links": {
            "Self": "https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts/a91ec5ba-b0c2-40c2-8213-dea873a1fd12/balances"
        },
        "Meta": {
            "TotalPages": 1
        }
      };
    }
    console.log(balances);
    return balances;
  
  }

  useEffect(() => {
    fetchBackendData().then(fetchNatwestAccountAccessToken).then(postAccountRequest).then(approveConsentProgrammatically).then(exchangeCodeForAccessToken).then(listAccounts);
  }, []);

  function AccountList(props) {
    const accountItems = props.accountList.map((accountItem) => 
      <AccountItem key={accountItem.accountIdentificationNumber} account={accountItem}/>
    );
    return(
      <div>
        {accountItems}
      </div>
    );
  }
  
  function AccountItem(props) {
    const account = props.account;
    return(
      <div>
        {account.accountIdentificationNumber}
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

  

  return (
    <div className="App">
      <OepfelbaumHeader/>
      <TotalAssets accountList={bankAccounts}/>
      <AccountList accountList={bankAccounts}/>
    </div>
  );
}



export default App;
