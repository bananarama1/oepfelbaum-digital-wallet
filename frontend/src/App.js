import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [bankAccounts,setBankAccounts] = useState([{}]);

  async function fetchBackendData() {
    const response = await fetch('api/bankAccounts');
    const body = await response.json();
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
    var token;
    const response = fetch("token", requestOptions)
      .then(response => response.json())
      .then(result => token = result)
      .catch(error => console.log('error', error));
    console.log(token);

  }

  useEffect(() => {
    fetchBackendData();
    fetchNatwestAccountAccessToken();
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
