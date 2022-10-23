
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import WebFont from 'webfontloader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './Components/Products/ProductDetails';
import LoginSignup from './Components/Authentication/LoginSignup';
import { useSelector } from 'react-redux';
import UserData from './Exception/UserData';
import ProtectedRoute from './Route/ProtectedRoute'
import Profile from './Components/User/Profile'
import UpdatePassword from './Components/User/Update/UpdatePassword';
import Store from './Redux/store'
import { loadUser } from "./Actions/UserAction"
import UpdateProfile from './Components/User/Update/UpdateProfile';
import About from './Components/About/About';
import Products from './Components/Products/Products';
import Search from './Components/Products/Search';
import Support from './Exception/Support';
import Cart from './Components/Cart/Cart';
import Favorite from './Components/Cart/Favorites';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Components/Cart/Payment';
import Success from './Components/Cart/Success';
import MyOrder from './Components/User/MyOrder/MyOrder';
import MoreOption from './Components/User/MoreOption';
import Dashboard from './Components/Admin/Dashboard';
import AllProducts from './Components/Admin/AllProducts';
import EditProduct from './Components/Admin/EditProduct';
import CreateProduct from './Components/Admin/CreateProduct';
import AllOrder from './Components/Admin/AllOrder';
import UpdateOrder from './Components/Admin/UpdateOrder';
import MyOrderDetails from './Components/User/MyOrderDetails';
import AllUsers from './Components/Admin/AllUsers';
import UpdateUser from './Components/Admin/UpdateUser';
import AllReviews from './Components/Admin/AllReviews';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Rules from './Exception/Rules';
import ComingSoon from './Exception/ComingSoon';
import Contact from './Exception/Contact';

function App ()
{
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey ()
  {
    const { data } = await axios.get("/api/v1/key");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() =>
  {
    // load font Family tu google
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        {isAuthenticated && (<UserData user={user} />)}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favorites" component={Favorite} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/faq" component={Rules} />
          <Route exact path="/creator" component={ComingSoon} />
          <Route exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/me" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
          <ProtectedRoute exact path="/me/update/info" component={UpdateProfile} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/success" component={Success} />
          <ProtectedRoute exact path="/orders" component={MyOrder} />
          <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
          <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
          <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrder} />
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />
          <Route exact path="/more" component={MoreOption} />
          {/* <Route component={
            window.location.pathname === "/process/payment" ? null : Notfound
          } /> */}
        </Switch>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
    ;

}

export default App;
