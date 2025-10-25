import { Button } from "@/components/forms/Button";
import { Modal } from "@/components/ui/Modal";

interface DeleteConfirmationProps {
  isOpen: boolean;
  ticketTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({
  isOpen,
  ticketTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm Deletion">
      <p className="mb-6 text-gray-700">
        Are you sure you want to delete <strong>"{ticketTitle}"</strong>? This
        action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Ticket
        </Button>
      </div>
    </Modal>
  );
}
