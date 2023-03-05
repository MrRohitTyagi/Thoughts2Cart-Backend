const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  try {
    const { response } = req.body;
    console.log(response);
    let h = "";
    let sum = 0;
    response.orderItems.map((ele) => {
      sum = sum + parseInt(ele.price) * parseInt(ele.quantity);
      h =
        h +
        `\t\n• ${ele.name.slice(0, 15)}... | Quantity: ${
          ele.quantity
        } | Price: ₹${ele.price}\t\n`;
    });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rt2tyagi4366@gmail.com", // generated ethereal user
        pass: "zxgwqvztssxfjlmu", // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: "Thoughts2Cart.com", // sender address
      to: response.user_email, // list of receivers
      subject: `Order #${response._id} Confirmed`, // Subject line
      // subject: `Order #${Math.floor(Math.random() * 100)} Confirmed`, // Subject line
      text: `Thanks for shopping with us, Your has been confirmed and will be delivered by ${dateNDaysAhead(
        response.deliveredAt
      )}\t\n
      • Order Status :${response.orderStatus}\t\n
      • Payment Status :${response.paymentInfo.status}\t\n
      • Invoice Number :${response.paymentInfo.id}\t\n
      • Total amount :₹${sum}\t\n
      • Order items :\t\n
      ${h}

      `,
    });

    res.send(info);
  } catch (error) {
    console.log(error);
    res.status(400).send("ni gya");
  }
};
function dateNDaysAhead(n) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + n);

  const month = months[futureDate.getMonth()];
  const day = futureDate.getDate().toString().padStart(2, "0");
  const weekday = weekdays[futureDate.getDay()];

  return `${weekday} ${day}, ${month}`;
}
