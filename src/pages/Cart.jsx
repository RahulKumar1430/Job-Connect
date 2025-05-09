import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
        Your Cart
      </h1>
      <hr className="border-t border-gray-600" />
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          <p>Your cart is empty 🛒</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
                {/* Image and Info */}
                <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-1 text-base">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <Minus className="w-5 h-5 text-gray-700" />
                    </Button>
                    <span className="text-lg text-gray-800">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => increaseQuantity(item.id)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <Plus className="w-5 h-5 text-gray-700" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <hr className="border-t border-gray-200" />
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-5 rounded-lg flex flex-col items-center sm:items-end">
            <div className="flex text-gray-700 mb-4">
              <span className="pr-1">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white text-lg">
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
