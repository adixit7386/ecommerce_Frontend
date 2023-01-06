import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Mobile } from "../responsive";
import Sidebar from "../components/Sidebar";
import { userRequest } from "../requestMethods";

const Container = Styled.div`

`;

const Wrapper = Styled.div`
padding:20px;`;

const Title = Styled.h1`
font-weight:300;
text-align:center;
margin:0 auto 0 auto;`;

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

const Product = Styled.div`
display:flex;
flex:1;
width:100%;
align-items:center;
justify-content:center;
${Mobile({
  flexDirection: "column",
})};
`;

const ProductDetail = Styled.div`
flex:3;
display:flex;
align-items:center;
${Mobile({
  flexDirection: "column",
})};
`;

const Img = Styled.img`

height:150px;
width:230px;
padding:10px 12px;`;

const Detail = Styled.div`
flex:3;
padding:20px;
display:flex;
align-items:flex-start;
flex-direction:column;
jusify-content:center;`;

const PriceDetail = Styled.div`
flex:3;
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

const OrderContainer = Styled.div`
margin-top:10px;
margin-bottom:10px;
display:flex;
padding:10px 20px;
align-items:center;
flex-direction:column;

border-radius:10px;
box-shadow:0px 0px 10px lightgray;`;

const Heading = Styled.span`
display:inline;
font-size:18px;
width:50%;
margin-top:5px;
`;
const Text = Styled.span`
word-wrap:break-word;
width:50%;
margin-top:5px;
color:${(props) =>
  props.status === "pending"
    ? "green"
    : props.status === "cancellation pending"
    ? "red"
    : "balck"}`;

const DetailSection = Styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
${Mobile({ flexDirection: "column" })};
`;
const OrderDetails = Styled.div`
flex:1;
display:flex;
align-items:top;
justify-content:center;
flex-wrap:wrap;
padding:10px 20px;
`;
const AddressDetails = Styled.div`
flex:1;
display:flex;
align-items:right;
justify-content:center;
padding:10px 20px;

flex-wrap:wrap;
`;

const CancelButton = Styled.button`
width:50%;
cursor:pointer;
border:none;
margin-top:5px;
font-size:18px;
border-radius:5px;
padding:10px 12px ;`;

const Orders = () => {
  const [data, setData] = useState([]);
  const [deletedOrder, setDeletedOrder] = useState({});

  let tokens;

  if (localStorage.getItem("persist:rootReducer") !== undefined) {
    if (
      JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user !==
      undefined
    ) {
      tokens = JSON.parse(
        JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user
      )?.currentUser;
    }
  }
  console.log(tokens);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.get(`/order/find/${tokens?._id}`);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [tokens?._id, deletedOrder]);

  const handleClick = async (id, status) => {
    try {
      const res = await userRequest.put(`/order/${id}`, {
        status: "cancellation pending",
      });
      setDeletedOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Announcement />
      <div style={{ marginTop: "90px", minHeight: "100vh" }}>
        <Wrapper>
          {data.length ? (
            <Title>Your Orders</Title>
          ) : (
            <Title>You Have No orders</Title>
          )}

          <Bottom>
            <Info>
              {data?.map((item) => (
                <OrderContainer>
                  <DetailSection>
                    <OrderDetails>
                      <Heading>OrderId</Heading>
                      <Text>{item._id}</Text>
                      <Heading>Amount Paid</Heading>
                      <Text>₹{item.amount}</Text>
                      <Heading>Status</Heading>
                      <Text status={item.status}>{item.status}</Text>

                      <Heading>Cancel Order</Heading>
                      <CancelButton
                        onClick={() => {
                          handleClick(item._id, item.status);
                        }}
                      >
                        Cancel Order
                      </CancelButton>
                    </OrderDetails>

                    <AddressDetails>
                      <Heading>Locality</Heading>
                      <Text>{item.address.locality || "none"}</Text>
                      <Heading>City</Heading>
                      <Text>{item.address.city || "none"}</Text>
                      <Heading>State</Heading>
                      <Text>{item.address.state || "none"}</Text>
                      <Heading>Pincode</Heading>
                      <Text>{item.address.pincode || "none"}</Text>
                      <Heading>Country</Heading>
                      <Text>{item.address.country || "none"}</Text>
                    </AddressDetails>
                  </DetailSection>
                  {item.products?.map((product) => (
                    <Product>
                      <ProductDetail>
                        <Img src={product.img} />
                        <Detail>
                          <DetailText>
                            <b>Product: </b>
                            {product.title}
                          </DetailText>
                          <DetailText>
                            <b>Id: </b>
                            {product._id}
                          </DetailText>
                          <DetailText>
                            <b>Color: </b>
                            <ProductColor color={product.color}></ProductColor>
                          </DetailText>
                          <DetailText>
                            <b>Size: </b>
                            {product.size}
                          </DetailText>
                        </Detail>
                      </ProductDetail>
                      <PriceDetail>
                        <QuantityContainer>
                          <Amount>{product.quantity}</Amount>
                        </QuantityContainer>
                        <AmountContainer>
                          <Price>₹{product.price * product.quantity}</Price>
                        </AmountContainer>
                      </PriceDetail>
                    </Product>
                  ))}
                </OrderContainer>
              ))}
            </Info>
          </Bottom>
        </Wrapper>
        <Footer />
      </div>
    </Container>
  );
};

export default Orders;
