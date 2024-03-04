"use client";

import { Debugger } from "@/components/Debugger";
import React from "react";
import { useCartStore } from "@/store/cart.store";
import {
  CartProductProps,
  FavoritProductProps,
  Productlist,
} from "@/mocks/products";

export default function Cart() {
  return (
    <div>
      <RemoveAllFromCart />
      <RemoveAllFavorite />
      <ItemsTotals />
      <section>
        {Productlist.slice(0, 3).map((data, index) => (
          <div key={index} className="flex justify-center items-center gap-2">
            <p className="font-semibold">{data.title}</p>
            <p> price:{data.price}</p>
            <AddToCart {...data} quantity={0} />
            <MinusFromCart {...data} quantity={0} />
            <RemoveFromCart {...data} quantity={0} />
            <ToggleFavorite {...data} isFavorite />
          </div>
        ))}
      </section>

      <Debugger />
    </div>
  );
}

function AddToCart(items: CartProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button className="border rounded-2xl p-2" onClick={() => addToCart(items)}>
      Add
    </button>
  );
}
function MinusFromCart(items: CartProductProps) {
  const minusFromCart = useCartStore((state) => state.minusFromCart);
  return (
    <button
      className="border rounded-2xl p-2"
      onClick={() => minusFromCart(items)}
    >
      minus
    </button>
  );
}
function RemoveFromCart(items: CartProductProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <button
      className="border rounded-2xl p-2"
      onClick={() => removeFromCart(items)}
    >
      remove
    </button>
  );
}

function RemoveAllFromCart() {
  const removeAllFromCart = useCartStore((state) => state.removeAllFromCart);
  return (
    <button className="border rounded-2xl p-2" onClick={removeAllFromCart}>
      removeAllFromCart
    </button>
  );
}

function ToggleFavorite(items: FavoritProductProps) {
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const favorites = useCartStore((state) => state.favorites);
  return (
    <button
      className="border rounded-2xl p-2"
      onClick={() => toggleFavorite(items)}
    >
      favorite
      {favorites.find((item) => item.id === items.id)?.isFavorite && "❤️"}
    </button>
  );
}
function RemoveAllFavorite() {
  const removeAllFavorite = useCartStore((state) => state.removeAllFavorite);
  return (
    <button className="border rounded-2xl p-2" onClick={removeAllFavorite}>
      removeAllFavorite
    </button>
  );
}
function ItemsTotals() {
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const totalFavorite = useCartStore((state) => state.totalFavorite());

  const data = totalPrice;
  console.log(data);
  return (
    <>
      <p className="border rounded-2xl p-2">totalPrice: {totalPrice}</p>
      <p className="border rounded-2xl p-2">totalQuantity: {totalQuantity}</p>
      <p className="border rounded-2xl p-2">totalfavorite: {totalFavorite}</p>
    </>
  );
}
