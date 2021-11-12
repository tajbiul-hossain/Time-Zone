import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import MakePayment from "../MakePayment/MakePayment";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ManageOrders from "../ManageOrders/ManageOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import Orders from "../Orders/Orders";
import GiveReview from "../GiveReview/GiveReview";
import "./Dashboard.css";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../AdminRoute/AdminRoute";
const drawerWidth = 220;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { user, admin, logOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List sx={{ paddingLeft: "1rem" }}>
        <ListItem>
          <ListItemIcon style={{ width: "45px", height: "45px" }}>
            <img
              src={user.photoURL}
              alt=""
              style={{ width: "80%", borderRadius: "50%" }}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: "#fff" }} primary={user.displayName} />
        </ListItem>
      </List>
      <Divider sx={{ color: "#fff" }} />
      {!admin && (
        <List sx={{ paddingLeft: "1rem" }}>
          <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
            <ListItem>
              <ListItemIcon>
                <HomeOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/orders`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: 30, color: "#fff" }}
                />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/payment`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <PaymentOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Payment" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/review`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <StarBorderOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItem>
          </Link>
        </List>
      )}
      {admin && (
        <List sx={{ paddingLeft: "1rem" }}>
          <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
            <ListItem>
              <ListItemIcon>
                <HomeOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/manage-orders`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: 30, color: "#fff" }}
                />
              </ListItemIcon>
              <ListItemText primary="Manage Orders" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/add-product`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <AddBoxOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/manage-products`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <RemoveCircleOutlineOutlinedIcon
                  sx={{ fontSize: 30, color: "#fff" }}
                />
              </ListItemIcon>
              <ListItemText primary="Manage Products" />
            </ListItem>
          </Link>
          <Link
            to={`${url}/make-admin`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <PersonAddOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Make Admin" />
            </ListItem>
          </Link>
        </List>
      )}
      <Divider sx={{ color: "#fff" }} />
      <List sx={{ paddingLeft: "1rem", color: "#fff" }}>
        <ListItem button onClick={() => logOut()}>
          <ListItemIcon>
            <LogoutOutlinedIcon sx={{ fontSize: 30, color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#141414",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#141414",
              paddingTop: "5rem",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#141414",
              paddingTop: "5rem",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },

          backgroundColor: "#fff",
          color: "#141414",
        }}
      >
        <Toolbar />
        <Switch>
          {!admin && (
            <Route exact path={path}>
              <Orders />
            </Route>
          )}
          {admin && (
            <Route exact path={path}>
              <ManageOrders />
            </Route>
          )}
          <Route path={`${path}/orders`}>
            <Orders />
          </Route>
          <Route path={`${path}/payment`}>
            <MakePayment />
          </Route>
          <Route path={`${path}/review`}>
            <GiveReview />
          </Route>
          <AdminRoute path={`${path}/manage-orders`}>
            <ManageOrders />
          </AdminRoute>
          <AdminRoute path={`${path}/add-product`}>
            <AddNewProduct />
          </AdminRoute>
          <AdminRoute path={`${path}/manage-products`}>
            <ManageProducts />
          </AdminRoute>
          <AdminRoute path={`${path}/make-admin`}>
            <MakeAdmin />
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
