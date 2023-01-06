import React from "react";
import Styled from "styled-components";
import { Category } from "../data";
import CategoryItem from "../components/CategoryItem";
import { Mobile } from "../responsive";
const Container = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;

${Mobile({ flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {Category.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  );
};

export default Categories;
