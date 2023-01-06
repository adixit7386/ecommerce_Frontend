import React from "react";
import Styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { toggleSidebar } from "../redux/sideRedux";
import { useDispatch, useSelector } from "react-redux";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Mobile } from "../responsive";
const ParentContainer = Styled.div`
width:100vw;
height:100vh;
visibility:${(props) => (props.toggle ? "visible" : "hidden")};
top:0px;
left:0px;
bottom:0px;
position:fixed;
z-index:6;

opacity:1;`;

// position:fixed;
const Container = Styled.div`
width:250px;
top:0px;
bottom:0px;
z-index:5;
height:100vh;
box-shadow:0px 0px 50px black;
${Mobile({ width: "160px" })}
background-color:#f8f9fa;

margin-left:${(props) => (props.toggle !== true ? "-300px" : "0px")};;
transition:all 0.3s ease-in-out;
`;

const Wrapper = Styled.div`
height:content-fit;
display:flex;
align-items:center;
justify-content:top;
flex-direction:column;
${Mobile({ justifyContent: "left" })};

`;

const ContentContainerMenu = Styled.div`

margin-left:43px;
height:60px;
display:flex;
align-items:center;
justify-content:stretch;
border-radius:5px;
${Mobile({ marginLeft: "10px" })}



`;
// ${Mobile({ flexDirection: "column", justifyContent: "center" })}

const Content = Styled.span`
font-size:20px;
${Mobile({ fontSize: "20px" })}
`;
const IconContainer = Styled.div`
margin:"10px"

`;
const Title = Styled.h1`
 
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  ${Mobile({ marginLeft: "10px", fontSize: "28px" })}
`;
const Sidebar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let route = location.pathname.split("/")[1];
  const dispatch = useDispatch();

  const handleClickSidebar = () => {
    dispatch(toggleSidebar());
  };
  const IconStyle = {
    height: "25px",
    width: "25px",
    marginLeft: "10px",
    marginRight: "10px",
  };
  const IconStyleMenu = { height: "40px", width: "40px", cursor: "pointer" };
  const TableContainer = Styled.table`
width:100%;
align-items:center;
justify-content:center;
${Mobile({ width: "80%" })}
`;
  const TableRow = Styled.tr`
flex:1;
background-color:${(props) => props.name === props.page && "lightgray"};
background-color:${(props) =>
    props.name === "home" && props.page === "" && "lightgray"};

border-radius:5px;
display:flex;
padding:5px;
align-items:center;
cursor:pointer;
height:40px;
margin:10px;
transition: all 0.5s ease;
&:hover{
  background-color:lightgray;
  
}`;

  const TableData = Styled.td`
flex:${(props) => (props.names === "route" ? "3" : "2")};
display:flex;
align-items:${(props) => (props.names === "route" ? "left" : "center")};
justify-content:center;
flex-direction:column;`;
  const handleClick = (e) => {
    navigate("/" + e);
  };

  const toggle = useSelector((state) => state.side.sidebar);
  const handleClickParent = (e) => {
    if (e.target.classList.contains("parent")) {
      dispatch(toggleSidebar());
    }
  };
  return (
    <ParentContainer
      toggle={toggle}
      className="parent"
      onClick={(e) => handleClickParent(e)}
    >
      <Container className="sidebar" toggle={toggle}>
        <ContentContainerMenu>
          <MenuRoundedIcon style={IconStyleMenu} onClick={handleClickSidebar} />
          <Title className="sidebar">eShop</Title>
        </ContentContainerMenu>

        <Wrapper className="sidebar">
          <TableContainer className="sidebar">
            <TableRow
              className="sidebar"
              name={"home"}
              page={route}
              onClick={() => handleClick("home")}
            >
              <TableData names="icon" className="sidebar">
                <IconContainer className="sidebar">
                  <HomeIcon className="sidebar" style={IconStyle} />
                </IconContainer>
              </TableData>
              <TableData className="sidebar" names="route">
                <Content className="sidebar">Home</Content>
              </TableData>
            </TableRow>

            <TableRow
              className="sidebar"
              name="products"
              page={route}
              onClick={() => handleClick("products")}
            >
              <TableData className="sidebar" names="icon">
                <IconContainer className="sidebar">
                  <WidgetsIcon className="sidebar" style={IconStyle} />
                </IconContainer>
              </TableData>
              <TableData className="sidebar" names="route">
                <Content className="sidebar">Products</Content>
              </TableData>
            </TableRow>

            <TableRow
              name="cart"
              page={route}
              onClick={() => handleClick("cart")}
              className="sidebar"
            >
              <TableData className="sidebar" names="icon">
                <IconContainer className="sidebar">
                  <ShoppingCartRoundedIcon
                    className="sidebar"
                    style={IconStyle}
                  />
                </IconContainer>
              </TableData>
              <TableData className="sidebar" names="route">
                <Content className="sidebar">Cart</Content>
              </TableData>
            </TableRow>
            <TableRow
              className="sidebar"
              name="orders"
              page={route}
              onClick={() => handleClick("orders")}
            >
              <TableData className="sidebar" names="icon">
                <IconContainer className="sidebar">
                  <LocalShippingIcon className="sidebar" style={IconStyle} />
                </IconContainer>
              </TableData>
              <TableData className="sidebar" names="route">
                <Content className="sidebar">Orders</Content>
              </TableData>
            </TableRow>
          </TableContainer>
        </Wrapper>
      </Container>
    </ParentContainer>
  );
};

export default Sidebar;
