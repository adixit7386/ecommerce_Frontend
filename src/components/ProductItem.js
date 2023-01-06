import React from "react";
import Styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Link } from "react-router-dom";

const Info = Styled.div`
opacity:0;
height:100%;
width:100%;
position:absolute;

display:flex;
align-items:center;
justify-content:center;
background-color:rgba(0,0,0,0.2);
z-index:3;
transition:all 0.5s ease;
`;
const Container = Styled.div`
flex:1;
min-width:280px;
height:350px;
margin:5px;
display:flex;
align-items:center;
justify-content:center;
position:relative;
background-color:#f5fbfd;
&:hover ${Info}{
opacity:1;
}
`;
const Img = Styled.img`
height:75%;
z-index:2;
`;
const Circle = Styled.div`
height:200px;
width:200px;
position:absolute;
border-radius:50%;
background-color:white;
`;
const Icon = Styled.div`
height:40px;
width:40px;
margin:5px;
border-radius:50%;
background-color:white;
display:flex;
align-items:center;
justify-content:center;
transition:all 0.5s ease;
&:hover{
    backround-color:gray;
    transform:scale(1.1);

}
cursor:pointer;
`;

const ProductItem = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Img src={item.img} />
      <Info>
        <Icon>
          <Link style={{ all: "unset" }} to={`/product/${item._id}`}>
            <ShoppingCartOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <Link style={{ all: "unset" }} to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductItem;
