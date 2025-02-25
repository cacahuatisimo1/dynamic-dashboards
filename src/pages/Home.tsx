
import { useState } from 'react';
import { DynamicForm } from '@/components/common/DynamicForm';
import { DataDisplay } from '@/components/common/DataDisplay';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
}

const formFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text' as const,
    validation: Yup.string().required('Name is required'),
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    validation: Yup.string().email('Invalid email').required('Email is required'),
  },
  {
    name: 'birthDate',
    label: 'Birth Date',
    type: 'date' as const,
    validation: Yup.date().required('Birth date is required'),
  },
];

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'birthDate', label: 'Birth Date', sortable: true },
];

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const handleSubmit = (values: Omit<User, 'id'>) => {
    setUsers([...users, { ...values, id: Date.now() }]);
  };

  const handleEdit = (user: User) => {
    // Implementation for edit
    console.log('Edit user:', user);
  };

  const handleDelete = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8"
      >
        <section>
          <h1 className="text-4xl font-bold mb-8">User Management</h1>
          <DynamicForm
            fields={formFields}
            initialValues={{ name: '', email: '', birthDate: '' }}
            onSubmit={handleSubmit}
            title="Add New User"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <DataDisplay
            data={users}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </motion.div>
    </div>
  );
}
