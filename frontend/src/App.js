import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import './scss/App.scss';
import { NotFound } from './pages/notFound/NotFound';
import Cart from './pages/Cart';
import EmptyBasket from './pages/emptyBasket/EmptyBasket';
import Auth from './pages/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/userSlice';

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/empty-basket' element={<EmptyBasket />} />
            <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
            <Route path='*' element={<NotFound />} />
            {/* hec bir path uygun gelmirse * olan path cixir */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
