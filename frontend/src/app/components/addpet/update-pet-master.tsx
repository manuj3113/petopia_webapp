'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL, UPDATE_PET_TYPES } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';

// for toast notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// 

interface PetTypeMasterProps {
  id?: number;
  initialPetType?: string;
  initialDescription?: string;
  onSubmitComplete: (id: number | undefined, petType: string, description: string) => void;
}

export default function PetTypeMaster({
  id: initialId,
  initialPetType = '',
  initialDescription = '',
  onSubmitComplete,
}: PetTypeMasterProps) {
  const [id, setId] = useState<number | undefined>(initialId);
  const [petType, setPetType] = useState<string>(initialPetType);
  const [description, setDescription] = useState<string>(initialDescription);

  console.log(initialId, initialDescription, initialPetType)
  useEffect(() => {
    console.log('Initial values:', { initialId, initialPetType, initialDescription });
    setId(initialId);
    setPetType(initialPetType);
    setDescription(initialDescription);
  }, [initialId, initialPetType, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiRequest(`${API_BASE_URL}${UPDATE_PET_TYPES}`, {
        method: 'POST',
        body: JSON.stringify({ id, pet_type: petType, description }),
      });
      toast.success('Pet name update successfully', {
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

    console.log('Submitted:', { id, petType, description });
    onSubmitComplete(id, petType, description);
    
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
  );
}
