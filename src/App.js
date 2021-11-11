import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider";
import Home from "./components/Home/Home/Home";
import Shop from "./components/Shop/Shop/Shop";
import PlaceOrder from "./components/Home/PlaceOrder/PlaceOrder/PlaceOrder";
import About from "./components/About/About/About";
import Contact from "./components/Contact/Contact/Contact";
import Dashboard from "./components/DashBoard/DashBoard/DashBoard";
import Login from "./components/Login/Login/Login";
import Register from "./components/Register/Register/Register";
import Notfound from "./components/NotFound/Notfound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <PrivateRoute path="/place-order/:productId">
              <PlaceOrder />
            </PrivateRoute>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
