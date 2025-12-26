import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'xp';
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantStyles = {
  primary: 'from-primary-600 to-primary-400',
  secondary: 'from-secondary-500 to-secondary-400',
  success: 'from-success-500 to-success-400',
  xp: 'from-primary-600 via-accent-500 to-secondary-500',
};

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  label,
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">{label}</span>
          {showLabel && (
            <span className="text-sm font-medium text-white">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeStyles[size]} bg-white/10 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${variantStyles[variant]} rounded-full`}
        />
      </div>
    </div>
  );
}
