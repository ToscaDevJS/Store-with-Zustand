"use client";
import { useStore } from "@/store/bear.store";
import React from "react";

export const Heades = () => {
  const { bears } = useStore();

  // const bears = useStore((state) => state.bears);
  console.log("render");

  return <div className="w-full border py-12">header {bears}</div>;
};
