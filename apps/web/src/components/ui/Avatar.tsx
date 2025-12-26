import { HTMLAttributes } from 'react';
import { User } from 'lucide-react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  showLevel?: boolean;
  level?: number;
}

const sizeStyles: Record<AvatarSize, { container: string; icon: string; level: string }> = {
  sm: { container: 'w-8 h-8', icon: 'w-4 h-4', level: 'w-4 h-4 text-[10px] -bottom-1 -right-1' },
  md: { container: 'w-12 h-12', icon: 'w-6 h-6', level: 'w-5 h-5 text-xs -bottom-1 -right-1' },
  lg: { container: 'w-16 h-16', icon: 'w-8 h-8', level: 'w-6 h-6 text-sm -bottom-1 -right-1' },
  xl: { container: 'w-24 h-24', icon: 'w-12 h-12', level: 'w-8 h-8 text-base -bottom-2 -right-2' },
};

export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  showLevel = false,
  level,
  className = '',
  ...props
}: AvatarProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div
        className={`
          ${styles.container}
          rounded-full overflow-hidden
          bg-gradient-to-br from-primary-600 to-accent-500
          flex items-center justify-center
          ring-2 ring-white/10
        `}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <User className={`${styles.icon} text-white/80`} />
        )}
      </div>
      {showLevel && level !== undefined && (
        <div
          className={`
            absolute ${styles.level}
            bg-gradient-to-r from-primary-600 to-accent-500
            rounded-full flex items-center justify-center
            font-bold text-white
            ring-2 ring-dark-bg
          `}
        >
          {level}
        </div>
      )}
    </div>
  );
}
