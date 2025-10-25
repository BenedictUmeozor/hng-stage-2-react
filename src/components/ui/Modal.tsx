import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the modal
    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Restore focus when modal closes
    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 id={titleId} className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
