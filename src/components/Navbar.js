import { useState } from "react";
import Styled from "styled-components";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { logout } from "../redux/userRedux";
import { useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sideRedux";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Mobile } from "../responsive";
import { useDispatch } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const Container = Styled.div`
height:60px;
width:100%;
display:flex;
top:0px;
align-items:center;
background-color:#f8f9fa;
position:fixed;
z-index:4;
transition:visibility 0.5s ease;
${Mobile({ height: "60px" })}
`;

const Wrapper = Styled.div`
flex:1;
padding:10px 20px;
display:flex;
justify-content:space-between;
${Mobile({ paddingLeft: "10px", paddingRight: "5px" })}
`;

const Left = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
${Mobile({ flex: "0.8" })}`;

const IconContainer = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
`;
const HeadingContainer = Styled.div`
flex:4;
padding:0px 10px;
`;

const Heading = Styled.h1`
margin:0 auto 0 auto;
cursor:pointer;
${Mobile({ fontSize: "28px" })};
`;

const Center = Styled.div`
flex:1;
display:flex;
align-items:center;
jusify-content:center;
${Mobile({ flex: "0.8" })};`;

const InputContainer = Styled.div`
flex:9;
height:40px;
display:flex;
align-items:center;
jusify-content:center;
border:solid 2px gray;
border-top-left-radius:5px;
border-bottom-left-radius:5px;
padding:2px 4px;

${Mobile({ height: "35px", width: "60px" })}
`;
const Input = Styled.input`
background-color:#f8f9fa;
font-size: 18px;
font-size: 18px;
flex: 1;
border:none;

height: 35px;
outline:none;
${Mobile({ width: "40px", height: "15px", fontSize: "15px" })};
    
&:focus{
 font-size: 18px;
font-size: 18px;
flex: 1;
border:none;

height: 35px;
outline:none;
${Mobile({ width: "50px", height: "15px", fontSize: "15px" })}; 
}


`;

const SearchIconContainer = Styled.div`
height:40px;
width:40px;
border:solid 2px gray;
border-left:none;
display:flex;
align-items:center;
jusify-content:center;
border-top-right-radius:5px;
border-bottom-right-radius:5px;
padding:2px 4px;
${Mobile({ width: "35px", height: "35px" })}`;

const Right = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${Mobile({ flex: "0.7" })}
`;

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
const AccountContainer = Styled.div`
  height: 150px;
  width: 150px;
  box-shadow:5px 5px 20px black;
  border-radius: 5px;
  z-index:5;
  position:absolute;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: stretch;
  top:90px;
  right:30px;
  flex-direction: column;
  ${Mobile({
    right: "5px",
  })};
  `;

const Top = Styled.div`
  height: 38%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Middle = Styled.div`
  width: 100%;
  height: 26%;

  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const Bottom = Styled.div`
  width: 100%;
  height: ${(props) => (props.loggedIn === "true" ? "38%" : "50%")};
  align-items: center;
  display: flex;
  cursor: pointer;
  transition:all 0.5s ease;
  justify-content: center;
  
  border-radius: 5px;
  &:hover {
    background-color: lightgray;
  }
  
`;
const Name = Styled.span`
  font-size: 18px;
`;
const Username = Styled.span`
  font-size: 12px;
`;

const LogoutText = Styled.span`
  font-size: 18px;
  margin-right: 10px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const IconStyle = {
    height: "35px",
    width: "35px",
    cursor: "pointer",
    marginRight: "10px",
  };
  const linkStyle = {
    all: "unset",
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media max-width:(480px)": {
      height: "30px",
      width: "30px",
    },
  };
  const handleClickSidebar = () => {
    dispatch(toggleSidebar());
  };
  const handleClickNavigate = (props) => {
    if (props === "logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(props);
    }
  };

  const handleClickAccount = (e) => {
    if (e.target.classList.contains("parent")) {
      setClicked(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <IconContainer>
            <MenuRoundedIcon
              onClick={handleClickSidebar}
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
            />
          </IconContainer>
          <HeadingContainer onClick={() => handleClickNavigate("/home")}>
            <Heading>eShop</Heading>
          </HeadingContainer>
        </Left>
        <Center>
          <InputContainer>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
              className="NavbarInput"
            />
          </InputContainer>
          <SearchIconContainer>
            <Link style={linkStyle} to={search && `/products/${search}`}>
              <SearchRoundedIcon
                style={{
                  height: "40px",
                  width: "40px",
                  cursor: "pointer",
                  "@media max-width:(480px)": {
                    height: "30px",
                    width: "30px",
                  },
                }}
              />
            </Link>
          </SearchIconContainer>
        </Center>

        <Right>
          <Link style={{ all: "unset" }} to="/cart">
            <Badge
              style={{
                marginRight: "8px",
                marginLeft: "10px",
              }}
              badgeContent={quantity}
              color="primary"
            >
              <ShoppingCartRoundedIcon
                style={{
                  height: "35px",
                  width: "35px",
                  cursor: "pointer",
                }}
              />
            </Badge>
          </Link>
          <PersonIcon
            onClick={() => {
              setClicked((data) => !data);
            }}
            style={IconStyle}
          />
          {clicked &&
            (user !== null ? (
              <ParentContainer
                className="parent"
                toggle={clicked}
                onClick={(e) => handleClickAccount(e)}
              >
                <AccountContainer loggedIn={true}>
                  <Top>
                    <PersonIcon
                      onClick={() => {
                        setClicked((data) => !data);
                      }}
                      style={IconStyle}
                    />
                  </Top>
                  <Middle>
                    <Name>{user.name}</Name>
                    <Username>{user.username}</Username>
                  </Middle>
                  <Bottom onClick={() => handleClickNavigate("logout")}>
                    <LogoutText>Logout</LogoutText>
                    <LogoutOutlinedIcon style={IconStyle} />
                  </Bottom>
                </AccountContainer>
              </ParentContainer>
            ) : (
              <ParentContainer
                className="parent"
                toggle={clicked}
                onClick={(e) => handleClickAccount(e)}
              >
                <AccountContainer loggedIn={false}>
                  <Bottom onClick={() => navigate("/login")}>
                    <LogoutText>Login</LogoutText>
                  </Bottom>
                  <Bottom onClick={() => navigate("/register")}>
                    <LogoutText>Register</LogoutText>
                  </Bottom>
                </AccountContainer>
              </ParentContainer>
            ))}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
