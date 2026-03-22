'use client';

interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${className}`}
    >
      {text}
    </span>
  );
}
