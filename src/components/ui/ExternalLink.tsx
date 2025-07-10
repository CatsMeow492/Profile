import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  showIcon?: boolean;
  variant?: 'default' | 'subtle' | 'button' | 'card';
  className?: string;
}

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ 
    href, 
    children, 
    showIcon = true, 
    variant = 'default', 
    className, 
    target = '_blank',
    rel = 'noopener noreferrer',
    ...props 
  }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={cn(
          'inline-flex items-center gap-1 transition-colors',
          {
            'text-primary hover:text-primary/80 underline underline-offset-4': variant === 'default',
            'text-muted-foreground hover:text-foreground': variant === 'subtle',
            'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium': variant === 'button',
            'p-4 border rounded-lg hover:shadow-md transition-shadow': variant === 'card',
          },
          className
        )}
        {...props}
      >
        {children}
        {showIcon && (
          <ExternalLinkIcon 
            className={cn(
              'flex-shrink-0',
              {
                'w-3 h-3': variant === 'default' || variant === 'subtle',
                'w-4 h-4': variant === 'button' || variant === 'card',
              }
            )} 
          />
        )}
      </a>
    );
  }
);

ExternalLink.displayName = 'ExternalLink';

// Simple external link icon component
interface ExternalLinkIconProps {
  className?: string;
}

const ExternalLinkIcon = ({ className }: ExternalLinkIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

// Social link component for specific platforms
interface SocialLinkProps extends Omit<ExternalLinkProps, 'showIcon'> {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'scholar' | 'orcid';
}

const SocialLink = ({ platform, className, ...props }: SocialLinkProps) => {
  const getSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5";
    
    switch (platform) {
      case 'github':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
        );
      case 'email':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'scholar':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
          </svg>
        );
      case 'orcid':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.947-.422-.947-.947 0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.816 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.85-1.303 3.85-3.722 0-2.431-1.303-3.722-3.85-3.722h-2.297z"/>
          </svg>
        );
      default:
        return <ExternalLinkIcon className={iconClass} />;
    }
  };

  return (
    <ExternalLink
      showIcon={false}
      className={cn('hover:text-primary transition-colors', className)}
      {...props}
    >
      {getSocialIcon(platform)}
    </ExternalLink>
  );
};

export { ExternalLink, SocialLink }; 