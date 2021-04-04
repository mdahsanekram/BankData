import logo from './logo.svg';
import './App.css';
import TableData from './component/TableData';
import BankData from './component/BankData';

function App() {
  return (
    <div className="App">
      {/* <div className="row">
      <div className="col-md-6">
      <TableData/>
      </div>
      <div className="col-md-6">
      <PiChart/>
      </div>
      </div> */}
      <BankData/>
      
    </div>
  );
}

export default App;
