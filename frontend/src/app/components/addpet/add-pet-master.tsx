'use client'
import { useState } from 'react';

import {API_BASE_URL, ADD_PET_TYPES} from '@/app/constants/config'
import { apiRequest } from '@/app/utils/apiClient';
// for toast notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// 


interface ChildPageProps {
  onSubmitComplete: () => void;
}

export default function PetTypeMaster({ onSubmitComplete }: ChildPageProps) {
  const [petType, setPetType] = useState('');
  const [description, setDescription] = useState('');
  



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

      try {
        const response = await apiRequest(`${API_BASE_URL}${ADD_PET_TYPES}`, {
          method: 'POST',
          body: JSON.stringify({ pet_type: petType, description: description}),
         
        });

        toast.success('Pet name add successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPetType('');
        setDescription('');
        

      } catch (error: any) {
        toast.error('Error: Pet name not update !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    console.log('Submitted:', { petType, description });
    onSubmitComplete();
    // Add your submission logic here
  };


    
      return (
        <form onSubmit={handleSubmit}>
         <div className="form-addsome">
          <label>Pet Type:</label>
          <input
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            
          />
        </div>
        <div className="dis-input">
          <label>Description:</label>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
         
        ></textarea>
        </div>
        <div className="actions">
        <button className="add-sub" type="submit">
          Save
        </button>
        <button className="cancel">Cancel</button>
      </div>
      </form>
      )
  }