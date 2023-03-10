import React, { useState } from "react";
import Styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Mobile } from "../responsive";
import { publicRequest } from "../requestMethods";

const Container = Styled.div`
height:100vh;
background-color:#f8f9fa;
display:flex;
align-items:center;
justify-content:center;
`;

const Wrapper = Styled.div`

display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
width:700px;

`;
const Title = Styled.h1`
  font-size:45px;
  margin-bottom:10px;
`;

const LoginText = Styled.span`
  font-size: 25px;
  
  margin-bottom:20px;
  margin-top:10px;
`;

const InputWrapper = Styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
${Mobile({ flexWrap: "" })}
`;
const InputContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
padding:10px 5px;
height:30px;
background-color:white;
border:solid gray 1px;
border-radius:5px;
margin:6px 12px;

width:300px;
${Mobile({ margin: "3px 12px" })};
`;
const Input = Styled.input`


font-size:18px;
width:90%;
height:90%;
border:none;

outline:none;
transition:all 0.3s ease;
&:focus{
    
    
    border:none;
    outline:none;
    font-size:18px;
width:90%;
height:90%;
}

`;
const CheckboxContainer = Styled.div`
width:100%;
display:flex;

align-items:center;
justify-content:center;
margin-top:10px;

`;

const Button = Styled.button`
margin-top:20px;

padding:10px 5px;
height:50px;
border:none;
width:50%;
border-radius:10px;
background-color:#0d6efd;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
color:white;

&:hover{
    background-color:#0d6ee5;
};
cursor:Pointer;`;

const Warning = Styled.span`
margin-top:10px;`;
const RegisterTextOr = Styled.span`
font-size: 14px;
margin-top:20px;


`;
const Login = () => {
  let user = {};
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [missing, setMissing] = useState(false);
  let name = fname + " " + lname;

  const navigate = useNavigate();
  const handleClick = async () => {
    if (password !== repassword || !userName || !password || !email || !name) {
      setMissing(true);
      return;
    }
    setMissing(false);

    user.username = userName;
    user.email = email;
    user.password = password;
    user.name = name;

    try {
      const res = await publicRequest.post("/auth/register", user);
      console.log(res.data);
      if (res.status === 201) {
        navigate("/login");
      } else if (res.status === 500) {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>eShop</Title>
        <LoginText>Please Register Here</LoginText>
        <InputWrapper>
          <InputContainer name="firstname">
            <Input
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
            />
          </InputContainer>
          <InputContainer name="lastname">
            <Input
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
            />
          </InputContainer>
          <InputContainer name="username">
            <Input
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputContainer>
          <InputContainer name="email">
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer name="password">
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer name="repeatpassword">
            <Input
              type="password"
              placeholder="Repeat Password"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </InputContainer>
        </InputWrapper>
        <Button type="button" onClick={handleClick}>
          Register
        </Button>

        <CheckboxContainer>
          <Warning>
            already have an account?{" "}
            <Link to="/login" style={{ all: "unset", cursor: "pointer" }}>
              Login
            </Link>{" "}
          </Warning>
        </CheckboxContainer>
        <Warning>
          I agree with the <b style={{ cursor: "pointer" }}>PRIVACY POLICY</b>
        </Warning>
        {repassword && password !== repassword && (
          <Warning>Passwords do not match</Warning>
        )}
        {error && (
          <Warning style={{ color: "red" }}>
            this account already exists
          </Warning>
        )}
        {missing && (
          <Warning style={{ color: "red" }}>
            please fill all the required details
          </Warning>
        )}
        <RegisterTextOr>OR</RegisterTextOr>
        <LoginText>
          <strong
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            Continue
          </strong>{" "}
        </LoginText>
      </Wrapper>
    </Container>
  );
};

export default Login;
