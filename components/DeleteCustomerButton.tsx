// components/DeleteCustomerButton.tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from './ui/alert-dialog';
  import { Button } from './ui/button';
  import { supabase } from '../lib/supabase';
  import { toast } from 'sonner';
  
  export default function DeleteCustomerButton({ customerId, onDelete }: { customerId: string; onDelete: () => void }) {
    const handleDelete = async () => {
      const { error } = await supabase.from('customers').delete().eq('id', customerId);
      if (error) {
        toast.error('Failed to delete customer', { description: error.message });
      } else {
        toast.success('Customer deleted');
        onDelete();
      }
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  