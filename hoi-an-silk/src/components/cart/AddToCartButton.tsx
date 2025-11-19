"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  size = "md",
  variant = "primary",
  className = "",
}: AddToCartButtonProps) {
  const { addToCart, openCart, cart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Cập nhật số lượng sau khi thêm (cart.itemCount + quantity)
    setCartCount(cart.itemCount + quantity);
    setShowToast(true);
  };

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={handleAddToCart}
        className={className}
      >
        <ShoppingCart size={20} className="mr-2" />
        <span>Thêm Vào Giỏ</span>
      </Button>

      <Toast
        productName={product.name}
        cartItemCount={cartCount}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={10000}
      />
    </>
  );
}
