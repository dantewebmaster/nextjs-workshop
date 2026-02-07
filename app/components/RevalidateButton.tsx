'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

type RevalidateButtonProps = {
  action: () => Promise<{ success: boolean; message: string }>;
  label: string;
  className?: string;
};

export function RevalidateButton({ action, label, className = '' }: RevalidateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${className} ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isPending ? '🔄 Revalidando...' : label}
    </button>
  );
}
