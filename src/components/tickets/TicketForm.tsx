import { Button } from "@/components/forms/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { useForm } from "@/hooks/useForm";
import { validateTicketForm, type TicketFormData } from "@/lib/validation";
import type { Ticket } from "@/types";

interface TicketFormProps {
  initialData?: Ticket;
  onSubmit: (data: Omit<Ticket, "id" | "createdAt">) => Promise<void>;
  onCancel: () => void;
  mode: "create" | "edit";
}

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "closed", label: "Closed" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function TicketForm({
  initialData,
  onSubmit,
  onCancel,
  mode,
}: TicketFormProps) {
  const initialValues: Record<string, string> = initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
      }
    : {
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues,
    validate: (values) =>
      validateTicketForm(values as unknown as TicketFormData),
    onSubmit: async (values) => {
      const ticketData = values as unknown as TicketFormData;
      await onSubmit({
        title: ticketData.title,
        description: ticketData.description,
        status: ticketData.status as Ticket["status"],
        priority: ticketData.priority as Ticket["priority"],
      });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        type="text"
        label="Title"
        value={values.title}
        onChange={(e) => handleChange("title", e.target.value)}
        onBlur={() => handleBlur("title")}
        error={touched.title ? errors.title : undefined}
        required
      />

      <Textarea
        id="description"
        label="Description"
        rows={4}
        value={values.description}
        onChange={(e) => handleChange("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        error={touched.description ? errors.description : undefined}
      />

      <Select
        id="status"
        label="Status"
        options={statusOptions}
        value={values.status}
        onChange={(e) => handleChange("status", e.target.value)}
        onBlur={() => handleBlur("status")}
        error={touched.status ? errors.status : undefined}
        required
      />

      <Select
        id="priority"
        label="Priority"
        options={priorityOptions}
        value={values.priority}
        onChange={(e) => handleChange("priority", e.target.value)}
        onBlur={() => handleBlur("priority")}
        error={touched.priority ? errors.priority : undefined}
        required
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {mode === "create" ? "Create Ticket" : "Update Ticket"}
        </Button>
      </div>
    </form>
  );
}
