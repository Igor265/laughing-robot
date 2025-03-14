"use client";

import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
      <CheckCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-auto text-green-700 hover:text-green-500 focus:outline-none cursor-pointer"
        aria-label="Fechar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
