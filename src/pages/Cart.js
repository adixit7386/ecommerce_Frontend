import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import { userRequest } from "../requestMethods";
import { Mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux.js";
import Sidebar from "../components/Sidebar";
import axios from "axios";
const KEY =
  "pk_test_51LpFwPSEFBNUdOgSATrHb1mx3pxUlQWQ3ThlkaReT25Tx2iOWPI1a92qRlaDH631D3OtD3xQVvwZjFtdODPMFnZx00KXw1TqLX";

const Container = Styled.div`
`;

const Wrapper = Styled.div`
padding:20px;`;

const Title = Styled.h1`
font-weight:300;
text-align:center;
margin:0 auto 0 auto;`;

const Top = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;`;

const TopButton = Styled.button`
border-radius:5px;

padding:${(prop) => (prop.type === "filled" ? "10px 20px" : "8px 18px")};
background-color:${(prop) => (prop.type === "filled" ? "black" : "white")};
border:${(prop) => (prop.type === "filled" ? "none" : "solid 2px black")};
color:${(prop) => (prop.type === "filled" ? "white" : "black")};
font-weight:500;
font-size:18px;
cursor:pointer;
${Mobile({
  margin: "2px",
})};`;

const Bottom = Styled.div`
margin:10px 0px;
display:flex;
align-items:top;
justify-content:center;
${Mobile({
  flexDirection: "column",
})};`;

const Info = Styled.div`
flex:3;`;

const Summary = Styled.div`
flex:1;
padding:20px;
box-shadow:0px 0px 10px lightgray;
border-radius:5px;
height:300px;

`;

const Product = Styled.div`
border-radius:5px;
box-shadow:0px 0px 10px lightgray;
margin-top:10px;
margin-bottom:10px;
margin-right:5px;
padding:7px 12px;
display:flex;
align-items:center;
justify-content:center;
${Mobile({
  flexDirection: "column",
  marginRight: "0px",
})};`;

const ProductDetail = Styled.div`
flex:3;
display:flex;
align-items:center;
${Mobile({ flexDirection: "column" })};
`;

const Img = Styled.img`

height:150px;
width:230px;
`;

const Detail = Styled.div`
flex:1;

padding:20px;
display:flex;
align-items:flex-start;
flex-direction:column;
jusify-content:center;`;

const PriceDetail = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`;

const DetailText = Styled.span`
padding:4px;

`;

const ProductColor = Styled.div`
height:20px;
width:20px;
border-radius:50%;
background-color:${(props) => props.color};
display:inline-block;
`;

const Amount = Styled.h2`
margin:10px;
`;
const Price = Styled.h1`
margin:10px;
`;
const QuantityContainer = Styled.div`
display:flex;
align-items:center;`;
const AmountContainer = Styled.div``;

const SummaryTitle = Styled.h1`
text-align:center;
`;

const SummaryItem = Styled.div`
display:flex;
align-items:center;
justify-content:space-between;`;

const SummaryItemText = Styled.span``;

const SummaryItemPrice = Styled.h3`
margin-top:10px;
margin-bottom:10px;`;

const SummaryButton = Styled.button`
border-radius:5px;
padding:10px 20px;
background-color:black;
border:none;
color:white;
font-size:18px;
cursor:pointer;
width:100%;

`;
const ParentContainer = Styled.div`
width:100vw;
height:100vh;

top:0px;
left:0px;
bottom:0px;
position:fixed;
z-index:6;
display:flex;
background-color:gray;
align-items:center;
justify-content:center;
opacity:0.8;`;

const Cart = () => {
  const tokens = JSON.parse(
    JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user
  )?.currentUser;

  const iconStyle = {
    height: "25px",
    width: "25px",
    color: "red",
    cursor: "pointer",
  };
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  const [failure, setFailure] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let address = {};
        let products = [];
        let product = {};
        const res = await axios.post(
          "https://node-js-backend-beryl.vercel.app/api/checkout/payment",
          {
            tokenId: stripeToken,
            amount: cart.total,
          }
        );
        console.log(res);

        if (res.status === 200) {
          address.locality = stripeToken.card.address_line1;
          address.city = stripeToken.card.address_city;
          address.country = stripeToken.card.address_country;
          address.pincode = stripeToken.card.address_zip;
          address.state = stripeToken.card.address_state;

          cart.products.map((item) => {
            product = {};
            product.productId = item._id;
            product.quantity = item.quantity;
            product.color = item.color;
            product.size = item.size;
            product.img = item.img;
            product.title = item.title;
            product.price = item.price;
            product.quantity = item.quantity;
            products.push(product);
            return item;
          });
          try {
            await userRequest.post("/order", {
              userId: tokens._id,
              products: products,
              amount: cart.total,
              address: address,
            });

            navigate("/orders");
          } catch (error) {
            setFailure(true);
          }
        }
      } catch (err) {
        setFailure(true);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, cart.products, tokens?._id, navigate]);

  const handleDelete = (item) => {
    dispatch(removeProduct(item));
  };

  return (
    <Container>
      {failure && (
        <ParentContainer>
          <h1>Payment failed! Kindly Refresh the page and Try Again</h1>
        </ParentContainer>
      )}
      <Navbar />
      <Sidebar />
      <Announcement />
      <div style={{ marginTop: "90px", minHeight: "100vh" }}>
        <Wrapper>
          <Title>{cart.total > 0 ? "Your Bag" : "Your bag is empty"}</Title>
          {cart.total > 0 && (
            <>
              <Top>
                <Link style={{ all: "unset" }} to={"/products"}>
                  <TopButton>Continue Shopping</TopButton>
                </Link>
                {user ? (
                  <StripeCheckout
                    name="e-Shopping"
                    image=""
                    billingAddress
                    shippingAddress
                    description="Checkout with card payment"
                    amount={cart.total}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <TopButton type={"filled"}>Checkout Now</TopButton>
                  </StripeCheckout>
                ) : (
                  <TopButton type={"filled"} onClick={() => navigate("/login")}>
                    Checkout Now
                  </TopButton>
                )}
              </Top>
              <Bottom>
                <Info>
                  {cart.products.map((item) => (
                    <Product key={item.index}>
                      <ProductDetail>
                        <Img src={item.img} />
                        <Detail>
                          <DetailText>
                            <b>Product: </b>
                            {item.title}
                          </DetailText>
                          <DetailText>
                            <b>Id: </b>
                            {item._id}
                          </DetailText>
                          <DetailText>
                            <b>Color: </b>
                            <ProductColor color={item.color}></ProductColor>
                          </DetailText>
                          <DetailText>
                            <b>Size: </b>
                            {item.size}
                          </DetailText>
                        </Detail>
                      </ProductDetail>
                      <PriceDetail>
                        <QuantityContainer>
                          <Amount>{item.quantity}</Amount>
                          <DeleteIcon
                            style={iconStyle}
                            onClick={() => handleDelete(item)}
                          />
                        </QuantityContainer>
                        <AmountContainer>
                          <Price>₹{item.price * item.quantity}</Price>
                        </AmountContainer>
                      </PriceDetail>
                    </Product>
                  ))}
                </Info>
                <Summary>
                  <SummaryTitle>Order Summary</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>₹40</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>-₹40</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  {user ? (
                    <StripeCheckout
                      name="e-Shopping"
                      image=""
                      billingAddress
                      shippingAddress
                      description="Checkout with card payment"
                      amount={cart.total}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <SummaryButton>Checkout Now</SummaryButton>
                    </StripeCheckout>
                  ) : (
                    <SummaryButton onClick={() => navigate("/login")}>
                      Checkout Now
                    </SummaryButton>
                  )}
                </Summary>
              </Bottom>
            </>
          )}
        </Wrapper>
        <Footer />
      </div>
    </Container>
  );
};

export default Cart;
