import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockMedicines } from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [toasts, setToasts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalState, setModalState] = useState({ open: false, type: null, data: null });

  // ─── Medicine CRUD ──────────────────────────────────────
  const addMedicine = useCallback((medicine) => {
    const newMed = { ...medicine, id: Date.now().toString(), status: 'pending' };
    setMedicines((prev) => [...prev, newMed]);
    return newMed;
  }, []);

  const updateMedicine = useCallback((id, updates) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  const deleteMedicine = useCallback((id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const markTaken = useCallback((id) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'taken' } : m)));
    addToast('Medicine marked as taken!', 'success');
  }, []);

  const snoozeMedicine = useCallback((id) => {
    addToast('Reminder snoozed for 30 minutes', 'info');
  }, []);

  // ─── Toasts ─────────────────────────────────────────────
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ─── Modal ──────────────────────────────────────────────
  const openModal = useCallback((type, data = null) => {
    setModalState({ open: true, type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ open: false, type: null, data: null });
  }, []);

  // ─── Sidebar ────────────────────────────────────────────
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <AppContext.Provider
      value={{
        medicines,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        markTaken,
        snoozeMedicine,
        toasts,
        addToast,
        removeToast,
        modalState,
        openModal,
        closeModal,
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
