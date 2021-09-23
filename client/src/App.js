import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/home";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import SearchResults from "./components/SearchResults/SearchResults";
import { useDispatch } from "react-redux";
import { getCategories } from "./actions/ProductActions";
// import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import UserProfile from "./components/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import creatheClothe from "./components/AdminPanel/createClothe.js";
import editClothe from "./components/AdminPanel/editClothe.js";
import CartScreen from "./components/Cart/CartScreen";
import GenreResults from "./components/SearchResults/GenreResults";
import ListDetail from "./components/AdminPanel/orderFilterList"
import NewAdminPanel from "./components/AdminPanel/NewAdminPanel"
import ProductList from "./components/AdminPanel/productList"
import PanelTitle from "./components/AdminPanel/PanelTitle";
import OrderHistory from "./components/OrderHistory/OrderHistory.js"
import CheckOut from "./components/Checkout/CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./components/Review/Review.js";

const stripePromise = loadStripe(
  "pk_test_51Jb4lZCUIIDXCqbkKXri5uz0jgOhwsWSGfXIjayHYBbF1WbUbFyYN9IG87QIIWgxzJbu38Oe1SmF2jounkyUbKYA00aSTtx30h"
);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/search/name/:name?" component={SearchResults} />
        <Route exact path="/search/genre/:genre?" component={GenreResults} />
        {/* <Route exact path="/admin" component={AdminPanel} /> */}
        <Route path="/admin" component={PanelTitle}/>
        <div style={{display: 'flex', backgroundColor: '#E4ECE8'}}>
          <Route path="/admin" component={NewAdminPanel}/>
          <Route exact path="/admin/listDetail" component={ListDetail} />
          <Route exact path="/admin/listproducts" component={ProductList} />
          <Route exact path="/admin/createClothe" component={creatheClothe} />
          <Route exact path="/admin/editClothe/:id" component={editClothe} />
        </div>
        <Route
          exact
          path="/search/category/:category"
          component={SearchResults}
        />
        <Route exact path="/search/details/:id" component={ProductDetail} />
        <Route exact path="/search/review" component={Review} /> 
        <PrivateRoute exact path="/user/userProfile" component={UserProfile} />
        <PrivateRoute exact path="/user/userProfile/orderHistory" component={OrderHistory} />
        <Elements stripe={stripePromise}>
          <Route exact path="/user/checkout" component={CheckOut} />
        </Elements>
        <Route exact path="/cart" component={CartScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
