import React from "react";
import Styled from "styled-components";
const Container = Styled.div`
display:flex;
align-items:center;
justify-content:center;
background-color:teal;
height:30px;
position:fixed;
width:100%;
z-index:4;
top:60px;
`;
const Span = Styled.span`
color:white;
padding-top:2px;
padding-bottom:2px;
`;
const Announcement = () => {
  return (
    <Container>
      <Span>hurry!!! 40% off on all the clothes!!</Span>
    </Container>
  );
};

export default Announcement;
