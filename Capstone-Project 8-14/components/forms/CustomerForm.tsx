"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, type CustomerFormValues } from "@/lib/validators/customer.schema";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CustomerFormProps {
  onSubmit: (values: CustomerFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function CustomerForm({
  onSubmit,
  onCancel,
  submitLabel = "Add customer",
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", phone: "", openingBalance: 0, notes: "" },
  });

  const submit = (values: CustomerFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <Input
        label="Customer name"
        placeholder="e.g. Ahmed Traders"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Phone number"
        placeholder="e.g. 0300-1234567"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Input
        label="Opening balance (Rs)"
        type="number"
        step="1"
        placeholder="0"
        hint="Positive = they owe you. Negative = you owe them."
        error={errors.openingBalance?.message}
        {...register("openingBalance")}
      />
      <Textarea
        label="Notes (optional)"
        placeholder="Anything worth remembering about this customer"
        error={errors.notes?.message}
        {...register("notes")}
      />

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
