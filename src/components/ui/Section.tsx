import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  fullWidth?: boolean;
  wide?: boolean;
  noPadding?: boolean;
}

export const Section = ({
  id,
  title,
  description,
  children,
  className,
  containerClassName,
  headerClassName,
  fullWidth = false,
  wide = false,
  noPadding = false
}: SectionProps) => {
  // Determine container class based on props
  const getContainerClass = () => {
    if (fullWidth) {
      return "w-full px-4 sm:px-6 lg:px-8";
    }
    if (wide) {
      return "container-wide mx-auto";
    }
    return "container mx-auto";
  };

  return (
    <section 
      id={id}
      className={cn(
        !noPadding && "py-16 lg:py-20",
        className
      )}
    >
      <div className={cn(
        getContainerClass(),
        containerClassName
      )}>
        {(title || description) && (
          <div className={cn(
            "mb-12 text-center",
            headerClassName
          )}>
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}; 