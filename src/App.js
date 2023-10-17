
import { useEffect } from 'react';

// react router dom is for give different web routes for different web pages
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// Component Imports
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import Home from './components/Home'

// Product Imports
import ProductDetails from './components/product/ProductDetails';

// User Imports
import Login from './components/user/Login'
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';

// Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';

// Cart Imports
import Cart from './components/cart/Cart'

import { loadUser } from './actions/userActions';
import store from './store'
import { useSelector } from 'react-redux';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<Profile />} exact />
            <Route path="/me/update" element={<UpdateProfile />} exact />
            <Route path='/cart' element = {<Cart />}/>
          </Routes>
        </div>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} exact />
          <Route path="/admin/products" element={<ProductsList />} exact />
          <Route path="/admin/users" element={<UsersList />} exact />
          <Route path="/admin/product" element= {<NewProduct />} exact />
          <Route path="/admin/product/:id" element= {<UpdateProduct />} exact />
          <Route path="/admin/user/:id" element= {<UpdateUser />} exact />
        </Routes>

        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
