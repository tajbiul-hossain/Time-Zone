import React from "react";
import Banner from "../Banner/Banner";
import RecentTrips from "../RecentTrips/RecentTrips";
import Products from "../Products/Products";
import Header from "../../Shared/Header/Header";
import "./Home.css";
import Footer from "../../Shared/Footer/Footer";
import Reviews from "../Reviews/Reviews";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Products />
      <Reviews />
      <RecentTrips />
      <Footer />
    </div>
  );
};

export default Home;
