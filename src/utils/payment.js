const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const paystack = (request) => {
  const initializePayment = (body) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };
    return request.post(options.url, body, { headers: options.headers });
  };

  const verifyPayment = (ref) => {
    const url = `https://api.paystack.co/transaction/verify/${ref}`;
    return request.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  };

  return { initializePayment, verifyPayment };
};

module.exports = paystack;
