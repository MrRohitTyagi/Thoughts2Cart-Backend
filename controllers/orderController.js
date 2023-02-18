const Order = require('../modals/OrderModal')
const product = require('../modals/ProductModal')


exports.newOrder = async (req,res)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    const NewOrder =await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user : req.user._id


    })
    res.status(200).json({
        success:true,
        NewOrder
    })
}