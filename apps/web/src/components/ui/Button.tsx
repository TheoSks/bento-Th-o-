import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-glow-primary hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]',
  secondary: 'bg-transparent border-2 border-primary-500 text-white hover:bg-primary-500/10 hover:border-primary-400',
  ghost: 'bg-transparent text-white hover:bg-white/5',
  danger: 'bg-gradient-to-r from-error-600 to-error-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  xl: 'px-10 py-5 text-xl rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    className = '',
    ...props
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        disabled={disabled || isLoading}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          font-semibold transition-all duration-200
          inline-flex items-center justify-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
