import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Sidebar from "../components/Sidebar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Styled from "styled-components";

const Container = Styled.div`
height:100vh;`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Announcement />
      <div style={{ marginTop: "90px", minHeight: "100vh" }}>
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
      </div>
    </Container>
  );
};

export default Home;
