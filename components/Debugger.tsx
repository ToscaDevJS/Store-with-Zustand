"use client";
import { useCartStore } from "@/store/cart.store";

export const Debugger = () => {
  const cart = useCartStore((state) => state.cart);
  const favorites = useCartStore((state) => state.favorites);

  return (
    <div className="bg-gray-700 rounded-2xl p-5 overflow-hidden">
      DEBUGGER
      <p className="font-bold">Cart:</p>
      {JSON.stringify(cart, null, 2)}
      <p className="font-bold">Favorite:</p>
      {JSON.stringify(favorites, null, 2)}
    </div>
  );
};
