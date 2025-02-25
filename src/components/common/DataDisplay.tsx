
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Search, ArrowUpDown } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataDisplayProps<T> {
  data: T[];
  columns: Column[];
  viewType?: 'table' | 'card';
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataDisplay<T extends { id: string | number }>({
  data,
  columns,
  viewType: initialViewType = 'table',
  onEdit,
  onDelete,
}: DataDisplayProps<T>) {
  const [viewType, setViewType] = useState(initialViewType);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null
  );

  const handleSort = (key: string) => {
    setSortConfig(
      sortConfig?.key === key && sortConfig.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    );
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('table')}
            className={`p-2 rounded-md ${
              viewType === 'table' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewType('card')}
            className={`p-2 rounded-md ${
              viewType === 'card' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewType === 'table' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                ))}
                {(onEdit || onDelete) && <th className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {(item as any)[column.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-primary hover:text-primary/80 mr-4"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedData.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {columns.map((column) => (
                <div key={column.key} className="mb-2">
                  <span className="font-medium">{column.label}: </span>
                  <span>{(item as any)[column.key]}</span>
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="mt-4 flex justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 text-sm text-primary hover:text-primary/80"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
