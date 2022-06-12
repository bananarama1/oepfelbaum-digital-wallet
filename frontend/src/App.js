import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [bankAccounts,setBankAccounts] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/bankAccounts');
      const body = await response.json();
      setBankAccounts(body);
    }
    fetchData();
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
