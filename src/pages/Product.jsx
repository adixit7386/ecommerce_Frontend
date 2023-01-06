import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Navbar from "../components/Navbar.js";
import Announcement from "../components/Announcement.js";
import Newsletter from "../components/Newsletter.js";
import Footer from "../components/Footer.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Mobile } from "../responsive.js";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods.js";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux.js";
import Sidebar from "../components/Sidebar";
const Container = Styled.div`
`;
const ProductContainer = Styled.div`
display:flex;
align-items:top;
justify-content:center;
height:70%;
${Mobile({
  flexDirection: "column",
})};
`;
const ImgContainer = Styled.div`
flex:1;
display:flex;

align-items:center;
justify-content:center;
padding:40px;
`;
const InfoContainer = Styled.div`
flex:1;
padding:40px;`;
const Image = Styled.img`
height:60vh;

${Mobile({
  height: "30vh",
})};
`;
const Title = Styled.h1`
`;
const Desc = Styled.p``;
const Price = Styled.h2`
font-weight:200;
font-size:20px;`;

const FilterContainer = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;`;
const Filter = Styled.div`
margin:20px;
flex:1;
margin-left:0px;
display:flex;
align-items:center;
`;
const FilterTitle = Styled.span`
margin:5px;
margin-left:0px;`;
const FilterColor = Styled.div`
height:25px;
width:25px;
margin:5px;
background-color:${(props) => props.color};
border:${(props) =>
  props.color === props.selected && `solid 4px ${props.color}`};

border-radius:50%;`;
const FilterSize = Styled.select`
padding:10px;
font-size:17px;
margin-top:5px;
margin-bottom:5px;
`;
const FilterSizeOption = Styled.option``;
const AddContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;`;
const AmountContainer = Styled.div`
display:flex;
flex:1;
align-items:center;
justify-content:flex-start;`;
const Amount = Styled.h2`
margin:10px;
`;
const ButtonContainer = Styled.div`
flex:1;`;
const Button = Styled.button`

padding:10px;
font-size:17px;
background-color:teal;
color:white;
border:none;
cursor:pointer;
`;
const Warning = Styled.h3`
color:red`;

const Product = () => {
  const location = useLocation();
  const itemId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [missing, setMissing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/find/" + itemId);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [itemId]);

  const [quantity, setquantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  const handleClick = (type) => {
    if (type === "remove") {
      setquantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
    } else {
      setquantity((quantity) => quantity + 1);
    }
  };

  const handleClickCart = () => {
    if (!color || !size) {
      setMissing(true);
      return;
    }
    setMissing(false);
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <div style={{ marginTop: "90px", minHeight: "100vh" }}>
        <Announcement />
        <ProductContainer>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>{product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((item) => (
                  <FilterColor
                    color={item}
                    key={item}
                    name={item}
                    selected={color}
                    onClick={(e) => {
                      setColor(item);
                    }}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterSize
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  <FilterSizeOption selected disabled>
                    Size
                  </FilterSizeOption>
                  {product.size?.map((item) => (
                    <FilterSizeOption>{item}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <RemoveIcon
                  onClick={() => {
                    handleClick("remove");
                  }}
                />
                <Amount>{quantity}</Amount>
                <AddIcon
                  onClick={() => {
                    handleClick("add");
                  }}
                />
              </AmountContainer>
              <ButtonContainer>
                <Button onClick={handleClickCart}>Add to Cart</Button>
              </ButtonContainer>
            </AddContainer>
            {missing && (
              <Warning>
                {missing ? `Please select size and color` : "/  "}
              </Warning>
            )}
          </InfoContainer>
        </ProductContainer>
        <Newsletter />
        <Footer />
      </div>
    </Container>
  );
};

export default Product;
