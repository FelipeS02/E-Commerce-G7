import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import SearchResults from "./components/SearchResults/SearchResults";
import { useDispatch } from "react-redux";
import { getCategories } from "./actions/ProductActions";
import SideBarFilter from "./components/SideBarFilter/SideBarFilter";
import { Button } from "react-bootstrap";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import creatheClothe from "./components/AdminPanel/createClothe.js";

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
        <Route exact path="/admin" component={AdminPanel} />
        <Route
          exact
          path="/search/category/:category"
          component={SearchResults}
        />
        <Route exact path="/search/details/:id" component={ProductDetail} />
        <Route exact path="/admin/createClothe" component={creatheClothe} />
      </BrowserRouter>
    </div>
  );
}

export default App;
