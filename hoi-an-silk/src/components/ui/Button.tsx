"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm";

    const variants = {
      primary: "bg-[var(--gold-primary)] text-[var(--brown-dark)] hover:bg-[var(--gold-dark)] hover:shadow-lg hover:scale-105",
      secondary: "bg-[var(--brown-primary)] text-[var(--ivory-primary)] hover:bg-[var(--brown-dark)] hover:shadow-lg",
      outline: "border-2 border-[var(--gold-primary)] text-[var(--gold-dark)] hover:bg-[var(--gold-primary)] hover:text-[var(--brown-dark)]",
      ghost: "text-[var(--brown-primary)] hover:bg-[var(--ivory-dark)] hover:text-[var(--brown-dark)]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
