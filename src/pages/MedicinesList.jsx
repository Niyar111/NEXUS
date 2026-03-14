import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AddMedicineForm from '../components/medicine/AddMedicineForm';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { formatTime, formatFrequency } from '../utils/helpers';
import { Pill, Trash2, Pencil, Search, Filter } from 'lucide-react';

const MedicinesList = () => {
  const { medicines, deleteMedicine, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editMedicine, setEditMedicine] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.dosage.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    deleteMedicine(id);
    addToast('Medicine deleted', 'info');
    setDeleteId(null);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">All Medicines</h1>
          <p className="page-subtitle">{medicines.length} medicine{medicines.length !== 1 ? 's' : ''} in your list</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 bg-card border border-card-border rounded-xl px-3 py-2 flex-1 transition-colors">
          <Search size={15} className="text-text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or dosage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none w-full"
            aria-label="Search medicines"
          />
        </div>
        <div className="flex items-center gap-2 bg-card border border-card-border rounded-xl px-3 py-2 transition-colors">
          <Filter size={15} className="text-text-secondary" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent text-sm text-text-primary outline-none"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="taken">Taken</option>
            <option value="pending">Pending</option>
            <option value="missed">Missed</option>
          </select>
        </div>
      </div>

      {/* Table / List */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Pill size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="font-medium text-text-primary mb-1">No medicines found</p>
          <p className="text-sm text-text-secondary">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" aria-label="Medicines table">
              <thead>
                <tr className="border-b border-card-border bg-slate-50/50 dark:bg-slate-800/50">
                  {['Medicine', 'Dosage', 'Time', 'Frequency', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {filtered.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                          <Pill size={14} className="text-primary dark:text-primary-light" />
                        </div>
                        <span className="text-sm font-medium text-text-primary">{med.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{med.dosage}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{formatTime(med.time)}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{formatFrequency(med.frequency)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={med.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditMedicine(med)}
                          className="p-1.5 rounded-lg text-text-secondary hover:bg-primary-light dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary-light transition-colors"
                          aria-label={`Edit ${med.name}`}
                          id={`edit-${med.id}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(med.id)}
                          className="p-1.5 rounded-lg text-text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-status-missed dark:hover:text-red-400 transition-colors"
                          aria-label={`Delete ${med.name}`}
                          id={`delete-${med.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-card-border">
            {filtered.map((med) => (
              <div key={med.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-text-primary text-sm">{med.name}</p>
                    <p className="text-xs text-text-secondary">{med.dosage} · {formatTime(med.time)}</p>
                  </div>
                  <StatusBadge status={med.status} />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-text-secondary">{formatFrequency(med.frequency)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditMedicine(med)} className="p-1.5 rounded-lg text-text-secondary hover:bg-primary-light dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary-light transition-colors" aria-label={`Edit ${med.name}`}>
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteId(med.id)} className="p-1.5 rounded-lg text-text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-status-missed dark:hover:text-red-400 transition-colors" aria-label={`Delete ${med.name}`}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={!!editMedicine} onClose={() => setEditMedicine(null)} title="Edit Medicine" size="lg">
        {editMedicine && (
          <AddMedicineForm initial={editMedicine} onSuccess={() => setEditMedicine(null)} />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Medicine" size="sm">
        <p className="text-sm text-text-secondary mb-5">
          Are you sure you want to delete this medicine? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="btn-danger flex-1">Delete</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default MedicinesList;

