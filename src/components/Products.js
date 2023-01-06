import { useState, useEffect } from "react";
import Styled from "styled-components";

import ProductItem from "../components/ProductItem";
import axios from "axios";
const Container = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;
flex-wrap:wrap;

`;

const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://node-js-backend-beryl.vercel.app/api/product/find?category=${cat}`
            : "https://node-js-backend-beryl.vercel.app/api/product/find"
        );

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const FilterProducts = () => {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    };
    filters && FilterProducts();
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filters
        ? filteredProducts.map((item) => <ProductItem item={item} />)
        : products.slice(0, 8).map((item) => <ProductItem item={item} />)}
    </Container>
  );
};

export default Products;
