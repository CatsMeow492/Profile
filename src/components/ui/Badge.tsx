import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          {
            // Variants
            'bg-primary text-primary-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'bg-accent text-accent-foreground': variant === 'accent',
            'border border-border bg-background text-foreground': variant === 'outline',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': variant === 'error',
            // Sizes
            'px-2 py-1 text-xs': size === 'sm',
            'px-3 py-1 text-sm': size === 'md',
            'px-4 py-2 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

interface BadgeGroupProps {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const BadgeGroup = ({ children, className, spacing = 'md' }: BadgeGroupProps) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center',
        {
          'gap-1': spacing === 'sm',
          'gap-2': spacing === 'md',
          'gap-3': spacing === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

// Technology-specific badge with common tech colors
interface TechBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  technology: string;
}

const TechBadge = ({ technology, className, ...props }: TechBadgeProps) => {
  // Map common technologies to colors
  const getTechVariant = (tech: string): BadgeProps['variant'] => {
    const techLower = tech.toLowerCase();
    
    if (['react', 'next.js', 'nextjs', 'vue', 'angular', 'svelte'].includes(techLower)) {
      return 'accent';
    }
    if (['typescript', 'javascript', 'node.js', 'nodejs'].includes(techLower)) {
      return 'warning';
    }
    if (['python', 'pytorch', 'tensorflow', 'scikit-learn'].includes(techLower)) {
      return 'success';
    }
    if (['aws', 'docker', 'kubernetes', 'redis'].includes(techLower)) {
      return 'secondary';
    }
    
    return 'outline';
  };

  return (
    <Badge 
      variant={getTechVariant(technology)} 
      className={className}
      {...props}
    >
      {technology}
    </Badge>
  );
};

export { Badge, BadgeGroup, TechBadge }; 