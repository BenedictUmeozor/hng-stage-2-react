import { Button } from "@/components/forms/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DeleteConfirmation } from "@/components/tickets/DeleteConfirmation";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketForm } from "@/components/tickets/TicketForm";
import { Modal } from "@/components/ui/Modal";
import { useTickets } from "@/hooks/useTickets";
import { useToast } from "@/hooks/useToast";
import type { Ticket } from "@/types";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

export default function TicketsPage() {
  const { tickets, addTicket, updateTicket, deleteTicket } = useTickets();
  const { showToast } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);

  // Create handlers
  const handleCreateTicket = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmitCreate = useCallback(
    async (data: Omit<Ticket, "id" | "createdAt">) => {
      try {
        addTicket(data);
        showToast("success", "Ticket created successfully");
        setIsCreateModalOpen(false);
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to create ticket",
        );
      }
    },
    [addTicket, showToast],
  );

  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
  };

  // Edit handlers
  const handleEditTicket = useCallback((ticket: Ticket) => {
    setEditingTicket(ticket);
  }, []);

  const handleSubmitEdit = useCallback(
    async (data: Omit<Ticket, "id" | "createdAt">) => {
      if (!editingTicket) return;

      try {
        updateTicket({
          ...data,
          id: editingTicket.id,
          createdAt: editingTicket.createdAt,
        });
        showToast("success", "Ticket updated successfully");
        setEditingTicket(null);
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to update ticket",
        );
      }
    },
    [editingTicket, updateTicket, showToast],
  );

  const handleCancelEdit = () => {
    setEditingTicket(null);
  };

  // Delete handlers
  const handleDeleteClick = useCallback((id: string) => {
    setDeletingTicketId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingTicketId) return;

    try {
      deleteTicket(deletingTicketId);
      showToast("success", "Ticket deleted successfully");
      setDeletingTicketId(null);
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to delete ticket",
      );
    }
  }, [deletingTicketId, deleteTicket, showToast]);

  const handleCancelDelete = () => {
    setDeletingTicketId(null);
  };

  // Sort tickets by newest first
  const sortedTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Find deleting ticket for confirmation
  const deletingTicket = tickets.find((t) => t.id === deletingTicketId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Ticket Management
            </h1>
            <Button onClick={handleCreateTicket}>
              <Plus size={20} className="mr-2 inline" />
              Create Ticket
            </Button>
          </div>

          {/* Tickets Grid */}
          {sortedTickets.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No tickets yet. Create your first ticket!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={handleEditTicket}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}

          {/* Create Modal */}
          <Modal
            isOpen={isCreateModalOpen}
            onClose={handleCancelCreate}
            title="Create New Ticket"
          >
            <TicketForm
              mode="create"
              onSubmit={handleSubmitCreate}
              onCancel={handleCancelCreate}
            />
          </Modal>

          {/* Edit Modal */}
          {editingTicket && (
            <Modal isOpen={true} onClose={handleCancelEdit} title="Edit Ticket">
              <TicketForm
                mode="edit"
                initialData={editingTicket}
                onSubmit={handleSubmitEdit}
                onCancel={handleCancelEdit}
              />
            </Modal>
          )}

          {/* Delete Confirmation */}
          {deletingTicket && (
            <DeleteConfirmation
              isOpen={true}
              ticketTitle={deletingTicket.title}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
