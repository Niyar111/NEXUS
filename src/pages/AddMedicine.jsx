import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AddMedicineForm from '../components/medicine/AddMedicineForm';
import { PlusCircle } from 'lucide-react';

const AddMedicine = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <PlusCircle size={20} className="text-primary" />
            <h1 className="page-title">Add Medicine</h1>
          </div>
          <p className="page-subtitle">Add a new medication to your schedule</p>
        </div>

        <div className="card p-6">
          <AddMedicineForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddMedicine;

