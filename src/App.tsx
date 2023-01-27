import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import './App.css';
import { Template } from './components/MainComponents';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <BrowserRouter>
          <Template>
              <Header />
              <Routes />
              <Footer />
          </Template>
      </BrowserRouter>
  );
}

export default App;
