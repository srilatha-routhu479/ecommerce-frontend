export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = "", color = "" } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, quantity, size, color }],
      });
    } else {
      // ✅ check safely, convert ObjectId to string before comparing
      const existingItem = cart.items.find(
        item =>
          item.productId &&
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, size, color });
      }
    }

    await cart.save();

    res.json({ message: "Item added to cart" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
