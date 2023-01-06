import React from "react";
import Styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";
import { Mobile } from "../responsive";
const Container = Styled.div`
display:flex;
align-items:top;
justify-content:center;
margin:5px;
position:sticky;
top:100%;
padding:20px;
height:40%;
background-color:#f5fbfd;
`;

const Left = Styled.div`
flex:1;
display:flex;
align-items:left;
padding:10px 20px;
justify-content:center;
flex-direction:column;`;

const Heading = Styled.h1`

`;
const Description = Styled.p`
`;
const SocialIcons = Styled.div`
display:flex;
align-items:center;
justify-content:flex-start;`;
const Icons = Styled.div`
cursor:pointer;

height:50px;
width:50px;
background-color:#f5fbfd;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
margin:10px;
color:#${(props) => props.color};
`;
const Center = Styled.div`
padding:10px 20px;
flex:1;
${Mobile({ display: "none" })};`;
const Title = Styled.h3`
margin-bottom:30px;`;
const List = Styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
margin-bottom:10px;
`;
const ListItem = Styled.li`
margin-top:10px;
font-weight:2px;
cursor:pointer;
width:50%;`;
const Right = Styled.div`
padding:10px 20px;
flex:1;
${Mobile({ display: "none" })}`;
const ContactItem = Styled.div`
display:flex;

align-items:center;
padding:7px 12px;`;
const Payment = Styled.img`
height:40px;
width:50px;
padding:10px;`;
const Footer = () => {
  const navigate = useNavigate();
  const handleClick = (props) => {
    navigate(props);
  };
  return (
    <Container>
      <Left>
        <Heading>eShopping</Heading>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisl
          eu enim imperdiet lacinia vitae id enim. Ut urna est, varius nec
          maximus nec, luctus euismod nibh.
        </Description>
        <SocialIcons>
          <Icons color={"000000"}>
            <FacebookIcon style={{ height: "40px", width: "40px" }} />
          </Icons>
          <Icons color={"000000"}>
            <InstagramIcon style={{ height: "40px", width: "40px" }} />
          </Icons>
          <Icons color={"000000"}>
            <TwitterIcon style={{ height: "40px", width: "40px" }} />
          </Icons>
        </SocialIcons>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem onClick={() => handleClick("/products/man fashion")}>
            Man Fashion
          </ListItem>
          <ListItem onClick={() => handleClick("/products/accessories")}>
            Accessories
          </ListItem>
          <ListItem onClick={() => handleClick("/orders")}>
            Order Tracking
          </ListItem>
          <ListItem onClick={() => handleClick("/cart")}>Wishlist</ListItem>
          <ListItem onClick={() => handleClick("/cart")}>Cart</ListItem>
          <ListItem onClick={() => handleClick("/products/women")}>
            Woman Fashion
          </ListItem>
          <ListItem onClick={() => handleClick("/cart")}>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Info</Title>
        <ContactItem>
          {" "}
          <LocationOnIcon style={{ marginRight: "30px" }} />
          ABC University, XYZ
        </ContactItem>
        <ContactItem>
          {" "}
          <LocalPhoneIcon style={{ marginRight: "30px" }} />
          +91 4364736374
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "30px" }} />
          abcd@gmail.com
        </ContactItem>
        <Payment
          src={
            "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png"
          }
        />
        <Payment
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/772px-Mastercard-logo.svg.png?20210817144358"
          }
        />
        <Payment
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png"
          }
        />
      </Right>
    </Container>
  );
};

export default Footer;
