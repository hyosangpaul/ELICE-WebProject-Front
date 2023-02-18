import Order from "../db/models/orderModel";

// 관리자페이지 (필요없을듯)
export const getAdmin = async (req, res) => {
  res.send("admin page");
};
//주문관리 (총 주문건 조회)
export const handleOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
    return orders;
  } catch (error) {
    res.status(400).error(error);
  }
};
//주문 상태관리
export const handleChange = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const user = await Order.findOne({ orderId });
    await user.updateOne({ orderStatus });

    res.status(200).json("1");
  } catch (error) {
    res.status(400).error(error);
  }
};
//주문취소

export const handleDelete = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.deleteOne({ orderId });
    res.status(200).json("삭제완료");
  } catch (error) {
    res.status(400).error(error);
  }
};
