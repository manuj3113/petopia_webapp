'use client';
import { useState } from 'react';
import { API_BASE_URL_DEMO, UPDATE_MEDICATION_CARE_MENU } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface MedicationData {
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

interface UpdateMedicationCareMenuProps {
  medications?: MedicationData;
  onSubmitComplete: (medications: MedicationData | undefined) => void;
  onBack: () => void;
}

export default function UpdateMedicationCareMenu({ medications, onSubmitComplete, onBack }: UpdateMedicationCareMenuProps) {
  const [medName, setMedName] = useState(medications?.med_name || '');
  const [medReason, setMedReason] = useState(medications?.med_reason || '');
  const [startDate, setStartDate] = useState(medications?.start_date || '');
  const [endDate, setEndDate] = useState(medications?.end_date || '');
  const [amDosage, setAmDosage] = useState(medications?.am_dosage || '');
  const [midDosage, setMidDosage] = useState(medications?.mid_dosage || '');
  const [pmDosage, setPmDosage] = useState(medications?.pm_dosage || '');
  const [amDosageUnit, setAmDosageUnit] = useState(medications?.am_unit || '');
  const [midDosageUnit, setMidDosageUnit] = useState(medications?.mid_unit || '');
  const [pmDosageUnit, setPmDosageUnit] = useState(medications?.pm_unit || '');
  const [everyDay, setEveryDay] = useState(medications?.every_day || false);
  const [everyOtherDay, setEveryOtherDay] = useState(medications?.every_other_day || false);
  const [everyAfterDays, setEveryAfterDays] = useState(medications?.every_after_days || 1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      userId: medications?.user_id || 0,
      medicationData: [
        {
          id: medications?.id || null,
          cat_id: medications?.cat_id || 0,
          med_name: medName,
          med_reason: medReason,
          am_unit: amDosageUnit,
          am_dosage: amDosage,
          mid_unit: midDosageUnit,
          mid_dosage: midDosage,
          pm_unit: pmDosageUnit,
          pm_dosage: pmDosage,
          start_date: startDate,
          end_date: endDate,
          every_day: everyDay,
          every_other_day: everyOtherDay,
          every_after_days: everyAfterDays,
        }
      ]
    };

    try {
      await apiRequest(`${API_BASE_URL_DEMO}${UPDATE_MEDICATION_CARE_MENU}`, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      toast.success('Medication logs updated successfully!');
      onSubmitComplete(medications);
    } catch (error) {
      toast.error('Error updating medication logs!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medication-box">
      <h2>Update Medication</h2>
      <form onSubmit={handleSubmit}>
        <div className="medication-details">
          <div className='madname'>
            <div className='madinpus'>
              <div className="mb-3">
                <label className="form-label">Med Name</label>
                <input type="text" className="form-control" value={medName} onChange={(e) => setMedName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Med Reason</label>
                <input type="text" className="form-control" value={medReason} onChange={(e) => setMedReason(e.target.value)} />
              </div>
            </div>

            <div className="d-flex mb-3">
              {['AM', 'Mid', 'PM'].map((time, index) => {
                const dosage = [amDosage, midDosage, pmDosage][index];
                const setDosage = [setAmDosage, setMidDosage, setPmDosage][index];
                const dosageUnit = [amDosageUnit, midDosageUnit, pmDosageUnit][index];
                const setDosageUnit = [setAmDosageUnit, setMidDosageUnit, setPmDosageUnit][index];

                return (
                  <div className="time-column" key={time}>
                    <label className="form-label">{time}</label>
                    <select className="form-select form-select-sm" value={dosage} onChange={(e) => setDosage(e.target.value)}>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <select className="form-select form-select-sm" value={dosageUnit} onChange={(e) => setDosageUnit(e.target.value)}>
                      <option value="pills">pills</option>
                      <option value="ml">ml</option>
                      <option value="mg">mg</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='madeverydays'>
            <div className='timeallshow'>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                {/* <input type="date" className="form-control" value={startDate || ''} onChange={(e) => setStartDate(e.target.value)} /> */}
                <DatePicker
                selected={startDate ? new Date(startDate) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    setStartDate(date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                {/* <input type="date" className="form-control" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} /> */}
                <DatePicker
                selected={endDate ? new Date(endDate) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    setEndDate(date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
              </div>
            </div>

            <div className="frequency-group">
              <div className="frequency-option">
                <input className='form-check-input' type="checkbox" id="everyday" checked={everyDay} onChange={() => setEveryDay(!everyDay)} />
                <label htmlFor="everyday">Every day</label>
              </div>
              <div className="frequency-option">
                <input className='form-check-input' type="checkbox" id="everyother" checked={everyOtherDay} onChange={() => setEveryOtherDay(!everyOtherDay)} />
                <label htmlFor="everyother">Every other day</label>
              </div>
              <div className="frequency-option">
                <input className='form-check-input' type="checkbox" id="everyn" checked={everyAfterDays > 1} onChange={() => setEveryAfterDays(everyAfterDays > 1 ? 1 : 2)} />
                <label htmlFor="everyn">Every</label>
                <select
                    className="form-check-input days-input"
                    value={everyAfterDays}
                    onChange={(e) => setEveryAfterDays(Number(e.target.value))}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                {/* <input type="number" className="form-check-input days-input" min="1" value={everyAfterDays} onChange={(e) => setEveryAfterDays(Number(e.target.value))} /> */}
                <label htmlFor="everyn">Days</label>
              </div>
            </div>
          </div>
        </div>

        <div className="res-btn">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Update'}
          </button>
          <button className="btn btn-secondary" onClick={onBack}>Back</button>
        </div>
      </form>
    </div>
  );
}
