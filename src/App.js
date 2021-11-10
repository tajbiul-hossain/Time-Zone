import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import Notfound from "./components/NotFound/Notfound";
import About from "./components/About/About/About";
import Contact from "./components/Contact/Contact/Contact";
import UserOrders from "./components/UserOrders/UserOrders/UserOrders";
import PlaceOrder from "./components/Home/PlaceOrder/PlaceOrder/PlaceOrder";
import ManageOrders from "./components/ManageOrders/ManageOrders/ManageOrders";
import AddNewProduct from "./components/AddNewProduct/AddNewProduct/AddNewProduct";
import "./App.css";
import Shop from "./components/Shop/Shop/Shop";

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
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <PrivateRoute path="/place-order/:productId">
              <PlaceOrder />
            </PrivateRoute>
            <PrivateRoute path="/my-orders">
              <UserOrders />
            </PrivateRoute>
            <PrivateRoute path="/manage-orders">
              <ManageOrders />
            </PrivateRoute>
            <PrivateRoute path="/add-new-product">
              <AddNewProduct />
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
