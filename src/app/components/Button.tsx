import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2
        transition-colors 
        duration-300
        `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        
        // Secondary button (gray text)
        secondary
          ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          
          // Danger button (red theme)
          : danger
          ? "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600 dark:bg-red-700 dark:hover:bg-red-800"
          
          // Default button (blue theme)
          : "bg-blue-500 hover:bg-blue-600 focus-visible:outline-blue-600 dark:bg-red-500 dark:hover:bg-red-600 text-white"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
