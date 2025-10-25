import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Ticket } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { memo } from "react";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: {
    label: "Low",
    classes: "text-blue-700 bg-blue-50 border-blue-200",
  },
  medium: {
    label: "Medium",
    classes: "text-yellow-700 bg-yellow-50 border-yellow-200",
  },
  high: {
    label: "High",
    classes: "text-red-700 bg-red-50 border-red-200",
  },
};

function TicketCardComponent({ ticket, onEdit, onDelete }: TicketCardProps) {
  const priorityStyle = priorityConfig[ticket.priority];
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <h3 className="mr-2 flex-1 text-lg font-semibold text-gray-900">
          {ticket.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(ticket)}
            aria-label={`Edit ticket: ${ticket.title}`}
            className="text-blue-600 transition-colors hover:text-blue-800"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            aria-label={`Delete ticket: ${ticket.title}`}
            className="text-red-600 transition-colors hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-3 flex gap-2">
        <StatusBadge status={ticket.status} />
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${priorityStyle.classes}`}
        >
          {priorityStyle.label}
        </span>
      </div>

      {/* Description */}
      {ticket.description && (
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {ticket.description}
        </p>
      )}

      {/* Footer */}
      <p className="mt-auto text-xs text-gray-500">Created: {formattedDate}</p>
    </div>
  );
}

export const TicketCard = memo(TicketCardComponent);
