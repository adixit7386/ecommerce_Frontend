import React from "react";
import Styled from "styled-components";
import { Mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = Styled.div`
flex:1;
margin:3px;
height:70vh;
position:relative;


`;
const Img = Styled.img`
width:100%;
height:100%;
object-fit:cover;
${Mobile({ height: "30vh", width: "100vw" })};
border-radius: 10px;
`;
const InfoContainer = Styled.div`
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`;
const Title = Styled.h1`
font-size:50px;
color:black;
margin-bottom:4%;`;
const Button = Styled.button`
border:none;
padding:10px;
font-size:20px;
border-radius:5px;
cursor:pointer;`;
const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Img src={item.img} />
      <InfoContainer>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.category}`}>
          <Button>Buy now</Button>
        </Link>
      </InfoContainer>
    </Container>
  );
};

export default CategoryItem;
