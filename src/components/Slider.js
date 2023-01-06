import { useState } from "react";
import Styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { SliderData } from "../data";
import { Mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = Styled.div`
height:100vh;
width:100%;
overflow:hidden;
position:relative;
${Mobile({ display: "none" })};
`;
const Arrow = Styled.div`
height:50px;
width:50px;
background-color:gray;
border-radius:50%;
display:flex;
cursor:pointer;
align-items:center;
justify-content:center;
position:absolute;
top:0px;
bottom:0px;
margin:auto;
left:${(props) => props.direction === "left" && "10px"};
right:${(props) => props.direction === "right" && "10px"};
opacity:0.5;
z-index:2;


`;

const Wrapper = Styled.div`
    
height:100%;
display:flex;
transition:all 1.5s ease;
transform:translateX(${(props) => props.slideIndex * -100}vw);
    
    
`;
const Slide = Styled.div`

height:100vh;
width:100vw;
display:flex;
align-items:center;
background-color:#${(props) => props.bg};
`;
const ImageContainer = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
padding:30px 50px;`;
const InfoContainer = Styled.div`
flex:1;
width:50vw;
padding:20px 70px;
`;
const Title = Styled.h1`
font-size:70px`;
const Description = Styled.p`
 
 font-size:20px;
 `;
const Button = Styled.button`
font-size:20px;
padding:10px;
background-color:transparent;
cursor:pointer;
border-radius:5px;`;
const Img = Styled.img`
height:100%;
`;
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((slideIndex) => (slideIndex > 0 ? slideIndex - 1 : 2));
    } else if (direction === "right") {
      setSlideIndex((slideIndex) => (slideIndex < 2 ? slideIndex + 1 : 0));
    }
  };

  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => {
          handleClick("left");
        }}
      >
        <ArrowBackIosRoundedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SliderData.map((item) => (
          <Slide bg={item.bg}>
            <ImageContainer>
              <Img src={item.image} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Link style={{ all: "unset" }} to={"/products"}>
                <Button>Buy Now</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        direction="right"
        onClick={() => {
          handleClick("right");
        }}
      >
        <ArrowForwardIosRoundedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
