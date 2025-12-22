'use client'
import { useState } from 'react';

import { API_BASE_URL, ADD_PET_BOARDING_PACKAGES } from '@/app/constants/config'
import { apiRequest } from '@/app/utils/apiClient';

// for toast notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

interface ChildPageProps {
    onSubmitComplete: () => void;
}

export default function PetBoardingPackageMaster({ onSubmitComplete }: ChildPageProps) {
    const [packageCode, setPackageCode] = useState('');
    const [packageName, setPackageName] = useState('');
    const [packageCost, setPackageCost] = useState('');
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [numberOfNights, setNumberOfNights] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiRequest(`${API_BASE_URL}${ADD_PET_BOARDING_PACKAGES}`, {
                method: 'POST',
                body: JSON.stringify({
                    package_code: packageCode,
                    package_name: packageName,
                    package_cost: packageCost,
                    number_of_days: numberOfDays,
                    number_of_nights: numberOfNights
                }),
            });

            // Show success toast
            toast.success('Pet boarding package added successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Reset the form fields
            setPackageCode('');
            setPackageName('');
            setPackageCost('');
            setNumberOfDays(0);
            setNumberOfNights(0);

        } catch (error: any) {
            toast.error('Error: Pet accommodations not added!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        // Call the onSubmitComplete callback
        onSubmitComplete();
    };

    return (
        <form className="packgage" onSubmit={handleSubmit}>
      <div className="form-group" id="head-input">
                <label>Package Code:</label>
                <input
                    type="text"
                    value={packageCode}
                    onChange={(e) => setPackageCode(e.target.value)}
                  
                />
            </div>

            <div className="form-group" id="head-input">
                <label>Package Name:</label>
                <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                  
                />
            </div>

            <div className="form-group" id="head-input">
                <label>Package Cost:</label>
                <input
                    type="text"
                    value={packageCost}
                    onChange={(e) => setPackageCost(e.target.value)}
                  
                />
            </div>
<div className="pageage-inputs">             <div className="group">
                <label># of days</label>
                <input
                    type="number"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(Number(e.target.value))}
                  
                />
            </div>

             <div className="group">
                <label># of nights</label>
                <input
                    type="number"
                    value={numberOfNights}
                    onChange={(e) => setNumberOfNights(Number(e.target.value))}
                  
                />
            </div>
            </div>
            <div className="text-note">
<p>Boarding package created in this screen also appear in the inventory screen. To adjust the category, taxable items, and commissionable status of the boarding package items, please check the inventory module.</p>
  </div>
            <div className="actions">
        <button type="submit" className="save">
          Save
        </button>
        <button type="button" className="cancel">
          Cancel
        </button>
  </div>
        </form>
    );
}
