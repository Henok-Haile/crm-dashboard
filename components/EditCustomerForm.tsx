import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
};

interface EditCustomerFormProps {
  customer: Customer;
  onCustomerUpdated: () => void;
}

export default function EditCustomerForm({
  customer,
  onCustomerUpdated,
}: EditCustomerFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Customer>({ ...customer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("customers")
      .update({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
      })
      .eq("id", customer.id);

    if (error) {
      toast.error("Failed to update customer", { description: error.message });
    } else {
      toast.success("Customer updated");
      setOpen(false);
      onCustomerUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white shadow-lg rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Customer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {(["name", "email", "phone", "notes"] as Array<keyof Customer>).map(
            (field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  name={field}
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
          <Button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
