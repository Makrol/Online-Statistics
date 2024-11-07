import CsvUploader from './Components/CsvUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="left-section">
          <CsvUploader />
      </div>
      <div className="right-section">
        {/* Treść drugiego div */}
      </div>
      
    </div>
  );
}

export default App;
