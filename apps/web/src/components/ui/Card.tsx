import { HTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'interactive' | 'highlighted';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-gradient-to-br from-white/10 to-white/[0.02] border-white/10',
  interactive: 'bg-gradient-to-br from-white/10 to-white/[0.02] border-white/10 hover:border-primary-500/50 hover:bg-white/[0.08] cursor-pointer',
  highlighted: 'bg-gradient-to-br from-primary-600/20 to-accent-500/10 border-primary-500/30',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={variant === 'interactive' ? { y: -4 } : undefined}
        className={`
          rounded-2xl backdrop-blur-xl border
          transition-all duration-300
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
