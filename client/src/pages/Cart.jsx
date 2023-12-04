import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { DeleteForever } from "@mui/icons-material";
import { removeProduct } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 3;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  ${mobile({ width: "160px" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 25px;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductCompany = styled.div``;
const ProductType = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 20px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const ProductRemove = styled.button`
  border: none;
  border-radius: 6px;
  background-color: red;
  padding: 1px 10px;
  font-size: 40px;
  font-weight: 200;
  color: white;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "20px" })};
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleRemoveItem = (product) => {
    dispatch(removeProduct(product));
  };
  const makeRequest = async (e) => {
    e.preventDefault();
    const {
      data: { key },
    } = await userRequest.get("/auth/getkey");
    const { data } = await userRequest.post("/checkout/payment", {
      amount: cart.total,
      cartItems: cart.products,
      userId: user._id,
      userAddress: user.address
    });
    var options = {
      key: key,
      amount: data.amount,
      currency: "INR",
      name: "Accessory Emporium",
      description: "Buy the best accessories",
      image:
        "https://cdn.vectorstock.com/i/1000x1000/70/83/shop-store-icon-vector-30737083.webp",
      order_id: data.id,
      callback_url: "http://localhost:5000/api/checkout/paymentverification",
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    <ProductCompany>
                      <b>model:</b>
                      {product.model}
                    </ProductCompany>
                    <ProductType>
                      <b>Type:</b>
                      {product.categories[0]}
                    </ProductType>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductRemove onClick={() => handleRemoveItem(product)}>
                    <DeleteForever />
                  </ProductRemove>
                  <ProductAmountContainer>
                    <ProductAmount>Quantity : {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    &#8377; {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          {cart.products.length > 0 && (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>&#8377; {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>&#8377; 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>&#8377; -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={makeRequest} disabled={user ? false : true}>
                {!user ? `LOGIN TO CHECKOUT` : "CHECKOUT BUTTON"}
              </Button>
            </Summary>
          )}
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
