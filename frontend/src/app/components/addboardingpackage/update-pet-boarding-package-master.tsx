'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL, UPDATE_PET_BOARDING_PACKAGES } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';

// for toast notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// 

interface PetAccomodationProps {
    id?: number;
    initialPackageCode?: string;
    initialPackageName?: string;
    initialPackageCost?: string;
    initialNumberOfDays?: number;
    initialNumberOfNights?: number;

    onSubmitComplete: (
        id: number | undefined,
        packageCode: string,
        packageName: string,
        packageCost: string,
        numberOfDays: number,
        numberOfNights: number,
    ) => void;
}

export default function PetBoardingPackageMaster({
    id: initialId,
    initialPackageCode = '',
    initialPackageName = '',
    initialPackageCost = '',
    initialNumberOfDays = 0,
    initialNumberOfNights = 0,
    onSubmitComplete,
}: PetAccomodationProps) {
    const [id, setId] = useState<number | undefined>(initialId);
    const [packageCode, setPackageCode] = useState('');
    const [packageName, setPackageName] = useState('');
    const [packageCost, setPackageCost] = useState('');
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [numberOfNights, setNumberOfNights] = useState(0);


    useEffect(() => {
        setId(initialId);
        setPackageCode(initialPackageCode);
        setPackageName(initialPackageName);
        setPackageCost(initialPackageCost);
        setNumberOfDays(initialNumberOfDays);
        setNumberOfNights(initialNumberOfNights);
    }, [
        initialId,
        initialPackageCode,
        initialPackageName,
        initialPackageCost,
        initialNumberOfDays,
        initialNumberOfNights,
    ]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiRequest(`${API_BASE_URL}${UPDATE_PET_BOARDING_PACKAGES}`, {
                method: 'POST',
                body: JSON.stringify({ 
                    id,
                    package_code: packageCode,
                    package_name: packageName,
                    package_cost: packageCost,
                    number_of_days: numberOfDays,
                    number_of_nights: numberOfNights
                 }),
            });
            toast.success('Pet boarding package update successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setPackageCode('');
            setPackageName('');
            setPackageCost('');
            setNumberOfDays(0);
            setNumberOfNights(0);
        } catch (error: any) {
            toast.error('Error: Pet boarding package not update !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        onSubmitComplete(
            id, packageCode, packageName, packageCost, numberOfDays, numberOfNights
        );
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

