"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl backdrop:bg-black/50 p-0 overflow-auto"
      onClose={onDismiss}
    >
      <div className="relative">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
}
