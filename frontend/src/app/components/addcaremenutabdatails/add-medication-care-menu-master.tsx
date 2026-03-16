'use client'

import { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_DEMO, UPDATE_MEDICATION_CARE_MENU, GET_MEDICATION_CARE_MENU } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface MedDataItem {
  id: any;
  cat_id: number;
  user_id: number;
  med_name: string;
  med_reason: string;
  am_unit: string;
  am_dosage: string;
  mid_unit: string;
  mid_dosage: string;
  pm_unit: string;
  pm_dosage: string;
  start_date: string | null;
  end_date: string | null;
  every_day: boolean;
  every_other_day: boolean;
  every_after_days: number;
}

export default function AddMedicationLogComponent({ onBack }: { onBack: () => void }) {
  const petId = localStorage.getItem('petid');
  const [medData, setMedData] = useState<MedDataItem[]>([]);
  const [originalMedData, setOriginalMedData] = useState<MedDataItem[]>([]);
  // Independent state for each column (field) of the form
  const [medNames, setMedNames] = useState<string[]>(['']);
  const [medReasons, setMedReasons] = useState<string[]>(['']);
  const [startDates, setStartDates] = useState<string[]>(['']);
  const [endDates, setEndDates] = useState<string[]>(['']);
  const [amDosages, setAmDosages] = useState<string[]>(['']);
  const [midDosages, setMidDosages] = useState<string[]>(['']);
  const [pmDosages, setPmDosages] = useState<string[]>(['']);
  const [frequencies, setFrequencies] = useState<{ every_day: boolean; every_other_day: boolean; every_after_days: number }[]>([]);
  const [everyXDays, setEveryXDays] = useState<number[]>([1]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (medData.length === 0) {
      setMedData([
        {
          id: '', // Unique ID
          cat_id: Number(petId),
          user_id: 0,
          med_name: '',
          med_reason: '',
          am_unit: '',
          am_dosage: '',
          mid_unit: '',
          mid_dosage: '',
          pm_unit: '',
          pm_dosage: '',
          start_date: null,
          end_date: null,
          every_day: false,
          every_other_day: false,
          every_after_days: 0,
        },
      ]);
    }
  }, [medData]);
  // Handle form changes for each field in the specific medication log
  const handleFieldChange = (index: number, field: keyof MedDataItem, value: any) => {
    setMedData((prevMedData) => {
      const updatedMedData = [...prevMedData];
      updatedMedData[index] = { ...updatedMedData[index], [field]: value };
      return updatedMedData;
    });
  };



  const getAll = async () => {
    try {
      const response = await apiRequest(`${API_BASE_URL_DEMO}${GET_MEDICATION_CARE_MENU}`, {
        method: 'POST',
        body: JSON.stringify({ pet_id: petId }),
      });
      console.log(response, 'Response of get all');
      setMedData(response);
      setOriginalMedData(response);
    } catch (error: any) {
      toast.error('Error fetching data');
    }
  };

  // Handle adding a new medication log form
  const handleAddLog = () => {
    setMedData((prev) => [
      {
        id: '', // Unique ID
        cat_id: Number(petId),
        user_id: 0,
        med_name: '',
        med_reason: '',
        am_unit: '',
        am_dosage: '',
        mid_unit: '',
        mid_dosage: '',
        pm_unit: '',
        pm_dosage: '',
        start_date: null,
        end_date: null,
        every_day: false,
        every_other_day: false,
        every_after_days: 0,
      },
      ...prev, // Add new entry at the beginning
    ]);
  };
  





  // Handle removing a medication log
  const handleRemoveLog = () => {
    setMedData((prev) => prev.slice(1)); // Removes the first (latest added) log
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Find modified or new entries
    const changedMedications = medData.filter((med) => {
      const original = originalMedData.find((item) => item.id === med.id);

      // If it's a new medication (id === 0), include it
      if (!original) return true;

      // If any field is changed, include it
      return JSON.stringify(original) !== JSON.stringify(med);
    });

    // Construct the request payload
    const requestBody = {
      userId: 35058, // Replace with dynamic user ID if needed
      medicationData: changedMedications,
    };

    try {
      const response = await apiRequest(`${API_BASE_URL_DEMO}${UPDATE_MEDICATION_CARE_MENU}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });


      toast.success('Meciation details updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getAll();
      onBack();
    } catch (error: any) {
      toast.error('Error updating feeding care menu', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false); // Stop loading after request is done
    }
  };






  return (
    <div className="medication-box">
      <h2 id='headmam'>Add Medication</h2>

      {/* Medication Log Forms */}
      <form onSubmit={handleSubmit}>

        {/* Action Buttons */}
        <div className="action-buttons mb-3 d-flex justify-content-between">
  <button type="button" onClick={handleAddLog} className="btn btn-primary another">
    + Add Another Log
  </button>

  {medData.length > 1 && (
    <button type="button" onClick={handleRemoveLog} className="btn btn-danger another">
      Remove
    </button>
  )}
</div>

        {medData?.map((medName, index) => (
          <div key={index} className="medication-details">
            {/* Close button */}
            {/* <button
              type="button"
              onClick={() => handleRemoveLog(index)}
              className="btn-close btn-close-white"
              aria-label="Close"
            /> */}
            <div className='madname'>
              <div className='madinpus'>
                <div className="mb-3">
                  <label htmlFor={`medName-${index}`} className="form-label">Med Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`medName-${index}`}
                    value={medData[index].med_name || ''}
                    onChange={(e) => handleFieldChange(index, 'med_name', e.target.value)}
                    placeholder="Enter Medication Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor={`medReason-${index}`} className="form-label">Med Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`medReason-${index}`}
                    value={medData[index].med_reason || ''}
                    onChange={(e) => handleFieldChange(index, 'med_reason', e.target.value)}
                    placeholder="Enter Medication Reason"
                  />
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="time-column">
                  <label htmlFor={`amAmount-${index}`} className="form-label">AM</label>
                  <select
                    className="form-select form-select-sm"
                    id={`amAmount-${index}`}
                    value={amDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'am_dosage', e.target.value)}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select form-select-sm"
                    value={amDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'am_dosage', e.target.value)}
                  >
                    <option value="pills">pills</option>
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                  </select>
                </div>

                <div className="time-column">
                  <label htmlFor={`midAmount-${index}`} className="form-label">Mid</label>
                  <select
                    className="form-select form-select-sm"
                    id={`midAmount-${index}`}
                    value={midDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'mid_dosage', e.target.value)}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select form-select-sm"
                    value={midDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'mid_dosage', e.target.value)}
                  >
                    <option value="pills">pills</option>
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                  </select>
                </div>

                <div className="time-column">
                  <label htmlFor={`pmAmount-${index}`} className="form-label">PM</label>
                  <select
                    className="form-select form-select-sm"
                    id={`pmAmount-${index}`}
                    value={pmDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'pm_dosage', e.target.value)}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select form-select-sm"
                    value={pmDosages[index]}
                    onChange={(e) => handleFieldChange(index, 'pm_dosage', e.target.value)}
                  >
                    <option value="pills">pills</option>
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='madeverydays'>
              <div className='timeallshow'>
                <div className="mb-3">
                  <label htmlFor={`startDate-${index}`} className="form-label">Start Date</label>
                  {/* <input
                    type="date"
                    className="form-control"
                    id={`startDate-${index}`}
                    value={startDates[index]}
                    onChange={(e) => handleFieldChange(index, 'start_date', e.target.value)}
                  /> */}
                   <DatePicker
                selected={startDates[index] ? new Date(startDates[index]) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    handleFieldChange(index, 'start_date', date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
                </div>

                <div className="mb-3">
                  <label htmlFor={`endDate-${index}`} className="form-label">End Date</label>
                  {/* <input
                    type="date"
                    className="form-control"
                    id={`endDate-${index}`}
                    value={endDates[index]}
                    onChange={(e) => handleFieldChange(index, 'end_date', e.target.value)}
                  /> */}
         <DatePicker
                selected={endDates[index] ? new Date(endDates[index]) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    handleFieldChange(index, 'end_date', date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
                  
                </div>
              </div>
              {/* Dosage Information */}
              <div className="frequency-group">
                <div className="frequency-option">
                  <input
                  className='form-check-input'
                    type="checkbox"
                    id={`everyday-${index}`}
                    name="everyday"
                    checked={medData[index].every_day}
                    onChange={(e) => handleFieldChange(index, 'every_day', e.target.checked)}
                  />
                  <label htmlFor={`everyday-${index}`}>Every day</label>
                </div>

                <div className="frequency-option">
                  <input
                  className='form-check-input'
                    type="checkbox"
                    id={`everyother-${index}`}
                    name="everyother"
                    checked={medData[index].every_other_day}
                    onChange={(e) => handleFieldChange(index, 'every_other_day', e.target.checked)}
                  />
                  <label htmlFor={`everyother-${index}`}>Every other day</label>
                </div>

                <div className="frequency-option">
                  <div className='htmlForm-check htmlForm-check-inline'>
                  <input
                  className='form-check-input'
                    type="checkbox"
                    id={`everyn-${index}`}
                    name="everyn"
                    checked={medData[index].every_after_days > 0}
                    onChange={(e) => handleFieldChange(index, 'every_after_days', e.target.checked ? 1 : 0)}
                  />
                  </div>
                  <label htmlFor={`everyn-${index}`}>Every</label>
                  <select
                    className="form-check-input days-input"
                    value={medData[index].every_after_days}
                    onChange={(e) => handleFieldChange(index, 'every_after_days', Number(e.target.value))}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <label htmlFor={`everyn-${index}`}>Days</label>
                </div>
              </div>

            </div>
          </div>
        ))}

        
        {/* Submit Button */}
        <br />
        <div className="res-btn">
          {/* <button type="submit" className="btn btn-success">
            Save
          </button>  */}
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Save'}
          </button>

          <br />
          <br />
          <button className="btn btn-secondary" onClick={onBack}>Back</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
