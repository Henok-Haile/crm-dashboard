// components/CreateCustomerForm.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext'; // make sure the path is correct

export default function CreateCustomerForm({
  onCustomerAdded,
}: {
  onCustomerAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const { user } = useAuth(); // get logged-in user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to add a customer.');
      return;
    }

    const { error } = await supabase.from('customers').insert([
      {
        ...formData,
        user_id: user.id,
      },
    ]);

    if (error) {
      toast.error('Failed to add customer', { description: error.message });
    } else {
      toast.success('Customer added successfully');
      setOpen(false);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      onCustomerAdded();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          + Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white shadow-lg rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add a New Customer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {['name', 'email', 'phone', 'notes'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                name={field}
                id={field}
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
