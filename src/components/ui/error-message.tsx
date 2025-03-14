import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <AlertTriangle className="w-5 h-5 mr-2" />
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-auto text-red-700 hover:text-red-500 focus:outline-none cursor-pointer"
        aria-label="Fechar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
