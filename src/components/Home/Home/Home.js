import React from "react";
import Header from "../../Shared/Header/Header";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews/Reviews";
import WeProvide from "../WeProvide/WeProvide";
import Footer from "../../Shared/Footer/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Products />
      <Reviews />
      <WeProvide />
      <Footer />
    </div>
  );
};

export default Home;
