import Styled from "styled-components";
import Navbar from "../components/Navbar.js";
import Announcement from "../components/Announcement.js";
import Newsletter from "../components/Newsletter.js";
import Products from "../components/Products.js";
import Footer from "../components/Footer.js";
import { Mobile } from "../responsive.js";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
const Container = Styled.div``;
const Title = Styled.h1`
margin:20px;`;

const FilterContainer = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`;

const Filter = Styled.div`
margin:10px;
display:flex;

align-items:left;

${Mobile({
  alignItems: "flex-start top",
  flexDirection: "column",
  justifyContent: "space-between",
  marginTop: "0px",
})};
;`;

const FilterText = Styled.span`
display:flex;
align-items:center;
justify-content:center;
${Mobile({
  margin: "10px",
})};`;

const Select = Styled.select`
padding:10px;
margin:10px;
font-size:18px;
border-radius:5px;
${Mobile({
  marginTop: "0px",
})};`;
const Option = Styled.option``;
const ProductList = () => {
  const history = useLocation();
  let category = history.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  if (category && category.search("%20") !== -1) {
    category = category.replace("%20", " ");
  }
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Sidebar />
      <div style={{ marginTop: "90px", minHeight: "100vh" }}>
        <Announcement />
        <Title>{category}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleChange}>
              <Option disabled selected>
                Color
              </Option>
              <Option>red</Option>
              <Option>green</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
            </Select>
            <Select name="size" onChange={handleChange}>
              <Option disabled selected>
                Size
              </Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option disabled selected>
                Sort by
              </Option>
              <Option value="newest">Newest First</Option>

              <Option value="asc">Price(asc)</Option>
              <Option value="dsc">Price(dsc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={category} sort={sort} filters={filters} />
        <Newsletter />
        <Footer />
      </div>
    </Container>
  );
};

export default ProductList;
