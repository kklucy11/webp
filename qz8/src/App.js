import './App.css';
import multiButton from './cgi_multiButton'
import HelloCGU from './cgi_hello'
function App() {
  return (
    <div className="App">
      <div>{HelloCGU()}</div>
      <div>{multiButton(10)}</div>
    </div>
  );
}
export default App;

