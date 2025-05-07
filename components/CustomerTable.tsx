import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import CreateCustomerForm from './CreateCustomerForm';
import DeleteCustomerButton from './DeleteCustomerButton';
import EditCustomerForm from './EditCustomerForm';
import DashboardStats from './DashboardStats';
import LogoutButton from './LogoutButton';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext'; // make sure this is correctly imported

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
  user_id: string;
};

type SortOption = 'name-asc' | 'name-desc' | 'latest';

export default function CustomerTable() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const itemsPerPage = 5;

  const fetchCustomers = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from('customers')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .range(from, to);

    if (sortBy === 'name-asc') {
      query = query.order('name', { ascending: true });
    } else if (sortBy === 'name-desc') {
      query = query.order('name', { ascending: false });
    } else if (sortBy === 'latest') {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query;

    if (error) {
      toast.error('Error fetching customers', { description: error.message });
    } else {
      setCustomers(data || []);
      if (count) setTotalPages(Math.ceil(count / itemsPerPage));
    }

    setLoading(false);
  }, [currentPage, sortBy, user]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch = !trimmedSearch
        ? true
        : [customer.name, customer.email, customer.phone].some((field) =>
            field.toLowerCase().startsWith(trimmedSearch)
          );

      const createdAt = new Date(customer.created_at);
      const start = filterStartDate ? new Date(filterStartDate) : null;
      const end = filterEndDate ? new Date(filterEndDate) : null;

      const inDateRange =
        (!start || createdAt >= start) && (!end || createdAt <= end);

      return matchesSearch && inDateRange;
    });
  }, [customers, searchTerm, filterStartDate, filterEndDate]);

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <LogoutButton />
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">🔍 Search</label>
          <Input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">🔤 Sort</label>
          <select
            className="border border-gray-300 p-2 rounded w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="name-asc">A–Z</option>
            <option value="name-desc">Z–A</option>
            <option value="latest">🕒 Latest</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">📅 Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      <CreateCustomerForm onCustomerAdded={fetchCustomers} />

      {loading ? (
        <p className="text-center">Loading customers...</p>
      ) : filteredCustomers.length === 0 ? (
        <p className="text-center text-gray-500">No matching customers found.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg shadow mt-2">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{customer.name}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">{customer.notes}</td>
                    <td className="p-4 text-gray-500">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <EditCustomerForm
                        customer={customer}
                        onCustomerUpdated={fetchCustomers}
                      />
                      <DeleteCustomerButton
                        customerId={customer.id}
                        onDelete={fetchCustomers}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
