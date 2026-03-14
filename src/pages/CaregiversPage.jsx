import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CaregiverList from '../components/caregiver/CaregiverList';
import AddCaregiverModal from '../components/caregiver/AddCaregiverModal';
import { caregiverService } from '../services/api';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';
import { gsap } from 'gsap';

const CaregiversPage = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useApp();
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);
      const res = await caregiverService.getAll();
      setCaregivers(res.data?.caregivers || res.data || []);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
      // Fallback for demo purposes if backend isn't actually running
      const local = localStorage.getItem('nexus_caregivers_mock');
      if (local) {
        setCaregivers(JSON.parse(local));
      } else {
        addToast('Failed to load caregivers from server. Using offline mode.', 'warning');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCaregiver = async (data) => {
    try {
      const res = await caregiverService.create(data);
      const newCaregiver = res.data?.caregiver || res.data || { ...data, id: Date.now().toString() };
      const updated = [...caregivers, newCaregiver];
      setCaregivers(updated);
      localStorage.setItem('nexus_caregivers_mock', JSON.stringify(updated));
      addToast('Caregiver added successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      // Fallback local operation
      const newCaregiver = { ...data, id: Date.now().toString() };
      const updated = [...caregivers, newCaregiver];
      setCaregivers(updated);
      localStorage.setItem('nexus_caregivers_mock', JSON.stringify(updated));
      addToast('Caregiver added locally (Server unreachable)', 'info');
      setIsModalOpen(false);
    }
  };

  const handleDeleteCaregiver = async (id) => {
    try {
      await caregiverService.delete(id);
      const updated = caregivers.filter(c => c.id !== id && c._id !== id);
      setCaregivers(updated);
      localStorage.setItem('nexus_caregivers_mock', JSON.stringify(updated));
      addToast('Caregiver removed', 'info');
    } catch (error) {
      console.error(error);
      const updated = caregivers.filter(c => c.id !== id && c._id !== id);
      setCaregivers(updated);
      localStorage.setItem('nexus_caregivers_mock', JSON.stringify(updated));
      addToast('Caregiver removed locally', 'info');
    }
  };

  return (
    <DashboardLayout>
      <div ref={headerRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Caregivers</h1>
          <p className="page-subtitle">Manage who receives alerts and monitors your adherence</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          <span>Add Caregiver</span>
        </button>
      </div>

      <CaregiverList
        caregivers={caregivers}
        loading={loading}
        onDelete={handleDeleteCaregiver}
      />

      <AddCaregiverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCaregiver}
      />
    </DashboardLayout>
  );
};

export default CaregiversPage;
