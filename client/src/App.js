import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
