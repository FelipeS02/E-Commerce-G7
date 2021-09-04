import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import NavBar from "./components/NavBar/NavBar";
import AdminPanel from "./components/AdminPanel/CreateClothe";

import { useAuth0 } from "@auth0/auth0-react";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={NavBar} />

        <Route exact path="/" component={Home} />

        <Route exact path="/search/name/:name?" component={SearchResults} />

        <Route exact path="/admin/createProduct" component={AdminPanel} />

      </BrowserRouter>
    </div>
  );
}

export default App;
