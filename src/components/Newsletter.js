import React from "react";
import Styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Mobile } from "../responsive";
const Container = Styled.div`
display:flex;
align-items:center;
margin:5px;
justify-content:center;
flex-direction:column;
height:60%;
padding-top:30px;
padding-bottom:30px;
background-color:#fcf1ed`;
const Title = Styled.h1`
margin-top:5px;
margin-bottom:5px;
font-size:5rem;
${Mobile({ fontSize: "3rem" })}`;
const Description = Styled.p`
font-size:1.5rem;
text-align:center;
color:gray;
${Mobile({ fontSize: "1rem", padding: "10px" })}`;
const InputContainer = Styled.div`
border:solid 2px lightgray;
width:50vw;
height:40px;
display:flex;
align-items:center;
border-radius:5px;
background-color:white;
justify-content:center;
${Mobile({ width: "90%" })};`;
const Input = Styled.input`
border:none;
flex:9;

font-size:18px;
padding-left:5px;
height:80%;

border-top-right-radius:0px;
border-bottom-right-radius:0px;
border-top-left-radius:5px;
border-bottom-left-radius:5px;
&:focus{
    outline:none;
}

`;
const Button = Styled.button`
flex:1;
height:100%;
display:flex;
align-items:center;
justify-content:center;
background-color:teal;
border:none;
border-top-right-radius:5px;
border-bottom-right-radius:5px;
cursor:pointer;`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get Timely Updates from your favourite Products</Description>
      <InputContainer>
        <Input placeholder={"Enter your email"} />
        <Button>
          <SendOutlinedIcon height={{ height: "40px" }} />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
