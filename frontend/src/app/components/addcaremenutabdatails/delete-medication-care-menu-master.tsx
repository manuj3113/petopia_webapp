'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL_DEMO , DELETE_MEDICATION_CARE_MENU_BY_ID} from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';

interface DeleteMedicineCheckListProps {
  id: number;
  onHide: () => void;
  getData: () => void;
}

export default function DeleteMedicineCheckList({ id, onHide, getData }: DeleteMedicineCheckListProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiRequest(`${API_BASE_URL_DEMO}${DELETE_MEDICATION_CARE_MENU_BY_ID}`, {
        method: 'POST',
        body: JSON.stringify({ id: id }),
      });
      toast.success("Medicine details delete successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getData(); // Refresh the checklist
      onHide(); // Close modal
    } catch (error) {
        toast.error("Error: Medicine details not delete!z", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" id="modalss">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this checklist item?</p>
        <div className="modal-actions">
          <button onClick={onHide} className="cancel-btn">Cancel</button>
          <button onClick={handleDelete} className="delete-btn" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
