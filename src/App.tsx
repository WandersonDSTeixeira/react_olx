import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
