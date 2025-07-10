import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

const TimelineItem = ({ children, className, active = false }: TimelineItemProps) => {
  return (
    <div className={cn('relative pl-10', className)}>
      {/* Timeline dot */}
      <div 
        className={cn(
          'absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 bg-background',
          {
            'border-primary bg-primary': active,
            'border-border': !active,
          }
        )}
      />
      {children}
    </div>
  );
};

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
}

const TimelineContent = ({ children, className }: TimelineContentProps) => {
  return (
    <div className={cn('pb-8', className)}>
      {children}
    </div>
  );
};

interface TimelineHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  className?: string;
}

const TimelineHeader = ({ title, subtitle, date, className }: TimelineHeaderProps) => {
  return (
    <div className={cn('mb-2', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {date && (
          <time className="text-sm text-muted-foreground whitespace-nowrap">
            {date}
          </time>
        )}
      </div>
    </div>
  );
};

interface TimelineDescriptionProps {
  children: ReactNode;
  className?: string;
}

const TimelineDescription = ({ children, className }: TimelineDescriptionProps) => {
  return (
    <div className={cn('text-sm text-muted-foreground space-y-2', className)}>
      {children}
    </div>
  );
};

export { 
  Timeline, 
  TimelineItem, 
  TimelineContent, 
  TimelineHeader, 
  TimelineDescription 
}; 