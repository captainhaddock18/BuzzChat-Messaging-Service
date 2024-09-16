import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        px-4 
        py-2 
        text-sm 
        font-medium
        transition-colors 
        duration-300 
        shadow-sm 
        ring-1 
        ring-inset 
        focus:outline-offset-0
        text-white
        
        // Light mode (white background with blue text)
        bg-blue-500 
        hover:bg-blue-600 
        ring-blue-300 
        
        // Dark mode (red background with white text)
        dark:bg-red-500 
        dark:hover:bg-red-600 
        dark:ring-red-300
      "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
