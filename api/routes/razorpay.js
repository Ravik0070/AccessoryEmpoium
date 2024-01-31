const router = require("express").Router();
require("dotenv").config();
const YOUR_DOMAIN = "http://localhost:3000";
const jsSHA = require("jssha");
const razorpay = require("razorpay");
const Order = require("../models/Order");
const instance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post("/payment", async (req, res) => {
  const cartItems = req.body.cartItems;
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_`,
    };
    const order = await instance.orders.create(options);
    const newOrder = await Order({
      userId: req.body.userId,
      orderId: order.id,
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        name: item.title,
      })),
      amount: order.amount,
      address: req.body.userAddress,
      status: order.status,
    });
    newOrder.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/paymentverification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  try {
    const signatureBody = razorpay_order_id + "|" + razorpay_payment_id;
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(process.env.KEY_SECRET.toString(), "TEXT");
    shaObj.update(signatureBody.toString());
    const expected_SignatureBody_HexHash = shaObj.getHMAC("HEX");
    const isVerifiedPayment =
      expected_SignatureBody_HexHash === razorpay_signature;

    if (isVerifiedPayment) {
      const updateOrder = await Order.updateOne(
        { orderId: razorpay_order_id },
        { $set: { status: "completed" } },
        { new: true }
      );
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(500).json({ success: "false" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
