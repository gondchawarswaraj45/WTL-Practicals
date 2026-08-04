import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn, getStarRating } from '@/lib/utils';

// ============================================================
// Shared UI Components
// ============================================================

// ── Star Rating ──────────────────────────────────────────────
interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  showValue = true,
  reviewCount,
}) => {
  const stars = getStarRating(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => {
          if (star === 'full')
            return <Star key={i} size={size} className="fill-accent-500 text-accent-500" />;
          if (star === 'half')
            return <StarHalf key={i} size={size} className="fill-accent-500 text-accent-500" />;
          return <Star key={i} size={size} className="text-gray-300" />;
        })}
      </div>
      {showValue && <span className="text-sm font-semibold text-gray-700">{rating}</span>}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-400">({reviewCount})</span>
      )}
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const variantClasses: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    gold: 'bg-accent-100 text-accent-800',
    default: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// ── Avatar ───────────────────────────────────────────────────
interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['bg-primary-500', 'bg-accent-500', 'bg-emerald-500', 'bg-blue-500', 'bg-rose-500', 'bg-violet-500'];
  const colorIdx = name.length % colors.length;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover border-2 border-white shadow-sm',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center text-white font-semibold border-2 border-white shadow-sm',
        sizeClasses[size],
        colors[colorIdx],
        className
      )}
    >
      {initials}
    </div>
  );
};

// ── Stat Card ────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down';
  icon: React.ReactNode;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changeType,
  icon,
  iconBg = 'bg-primary-100',
}) => (
  <div className="glass-card-solid p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-glass group">
    <div
      className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110',
        iconBg
      )}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      {change && (
        <p
          className={cn(
            'text-xs font-medium mt-1',
            changeType === 'up' ? 'text-emerald-600' : 'text-red-500'
          )}
        >
          {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  </div>
);

// ── Empty State ──────────────────────────────────────────────
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 max-w-md mb-6">{description}</p>
    {action}
  </div>
);

// ── Section Header ───────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  centered = false,
}) => (
  <div
    className={cn(
      'flex flex-col gap-2 mb-8',
      centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'
    )}
  >
    <div>
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-subheading mt-2">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

// ── Glass Card ───────────────────────────────────────────────
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  onClick,
}) => (
  <div
    className={cn(
      hover ? 'glass-card-hover cursor-pointer' : 'glass-card-solid',
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

// ── Progress Bar ─────────────────────────────────────────────
interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md';
  color?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'bg-primary-500',
  showLabel = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex-1 bg-gray-100 rounded-full overflow-hidden',
          size === 'sm' ? 'h-1.5' : 'h-2.5'
        )}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-gray-600 min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

// ── Search Input ─────────────────────────────────────────────
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className,
}) => (
  <div className={cn('relative', className)}>
    <svg
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:bg-white"
    />
  </div>
);

// ── Tabs ─────────────────────────────────────────────────────
interface Tab {
  label: string;
  value: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => (
  <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200',
          activeTab === tab.value
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        {tab.label}
        {tab.count !== undefined && (
          <span
            className={cn(
              'ml-1.5 px-1.5 py-0.5 text-xs rounded-full',
              activeTab === tab.value
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-200 text-gray-500'
            )}
          >
            {tab.count}
          </span>
        )}
      </button>
    ))}
  </div>
);

// ── Modal ────────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-xl animate-scale-in',
          sizeClasses[size]
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ── Accordion ────────────────────────────────────────────────
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => (
  <div className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left"
    >
      <span className="font-semibold text-gray-900 pr-4">{question}</span>
      <span
        className={cn(
          'shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-transform duration-300',
          isOpen && 'rotate-45'
        )}
      >
        +
      </span>
    </button>
    <div
      className={cn(
        'grid transition-all duration-300',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className="overflow-hidden">
        <p className="px-5 pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  </div>
);
