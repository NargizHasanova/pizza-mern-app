import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import './scss/App.scss';
import { NotFound } from './pages/notFound/NotFound';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} /> 
            {/* hec bir path uygun gelmirse * olan path cixir */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
