
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  icon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ to, children, variant = "default", icon }) => (
  <Link to={to}>
    <Button className={`w-full ${variant === "outline" ? "border-wasfah-bright-teal text-wasfah-bright-teal" : "bg-wasfah-bright-teal hover:bg-wasfah-teal"}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  </Link>
);
