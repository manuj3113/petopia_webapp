'use client'

import { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_DEMO, ADD_FEEDING_CARE_MENU, GET_FEEDING_MED_CARE_MENU, DRY_FOOD, WET_FOOD, WET_FOOD_QUANTITY, DRY_FOOD_QUANTITY } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface MedicationInstruction {
  medicationName: string;
  medicationDosage: string;
}

interface DataItem {
  food_type: string;
  food: string | null;
  brand: string;
  amount: string;
  water: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

interface DataIntake {
  id: number;
  pet_id: number;
  reservation_id: string;
  run: string;
  food_instructions_first: string;
  food_instructions_second: string;
  client_medication: string;
  daily_health_log_date: string;
  daily_run: string;
  medication_instructions: MedicationInstruction[];
  daily_food_intake: DataItem[];
  poo: boolean;
  pee: boolean;
  other: string;
  health_check: string;
  action: string;
  mid_litter_check: string;
  initials: string;
  day: string;
  comments: string;
  createdAt: string;
  updatedAt: string;
}


interface MedDataItem {
  id: any;
  medicationName: string;
  medicationDosage: string;
}



interface DryDataItem {
  id: any,
  sub_service_name: string,
}

interface WetDataItem {
  id: any,
  sub_service_name: string,
}

interface DryQuantityDataItem {
  id: any,
  sub_service_name: string,
}

interface WetQuantityDataItem {
  id: any,
  sub_service_name: string,
}



export default function AddFeedingCareMenu({ onBack }: { onBack: () => void }) {
  const petId = localStorage.getItem('petid');
  const [foodData, setFoodData] = useState<DataItem[]>([]);
  const [medData, setMedData] = useState<MedDataItem[]>([]);
  const [dryFoodData, setDryFoodData] = useState<DryDataItem[]>([]);
  const [wetFoodData, setWetFoodData] = useState<WetDataItem[]>([]);
  const [dryFoodQuantityData, setDryFoodQuantityData] = useState<DryQuantityDataItem[]>([]);
  const [wetFoodQuantityData, setWetFoodQuantityData] = useState<WetQuantityDataItem[]>([]);

  // Individual States for each column
  const [run, setRun] = useState('');
  const [foodInstructionsFirst, setFoodInstructionsFirst] = useState('');
  const [foodInstructionsSecond, setFoodInstructionsSecond] = useState('');
  const [clientMedication, setClientMedication] = useState('');
  const [dailyHealthLogDate, setDailyHealthLogDate] = useState('');
  const [dailyRun, setDailyRun] = useState('');
  const [poo, setPoo] = useState(false);
  const [pee, setPee] = useState(false);
  const [other, setOther] = useState('');
  const [healthCheck, setHealthCheck] = useState('');
  const [action, setAction] = useState('');
  const [midLitterCheck, setMidLitterCheck] = useState('');
  const [day, setDay] = useState('');
  const [initials, setInitials] = useState('');
  const [comments, setComments] = useState('');
  const [reservationId, setReservationId] = useState('');
  const [id, setId] = useState<number | ''>('');

  // Medication and Dose States
  const [medications, setMedications] = useState([ { id: 0, medicationName: "", medicationDosage: "" },]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAll();
    getAllFoodTypeAndQuantity();
  }, []);

  useEffect(() => {
    if (medData.length === 0) {
      setMedData([
        {
          id: Date.now(),
          medicationName: '',
          medicationDosage: '',
        },
      ]);
    }
  }, [medData]);

  useEffect(() => {
    if (foodData.length === 0) {
      setFoodData([
        {
          food_type: '',
          food: '',
          brand: '',
          amount: '',
          water: '',
          morning: false,
          afternoon: false,
          evening: false,
        },
      ]);
    }
  }, [foodData]);
  
  
  const getAll = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`${API_BASE_URL_DEMO}${GET_FEEDING_MED_CARE_MENU}`, {
        method: 'POST',
        body: JSON.stringify({ pet_id: petId }),
      });
      console.log(response, 'Response of get all');
      setFoodData(response.daily_food_intake);
      setMedData(response?.medication_instructions);
      setReservationId(response?.reservation_id)
      setId(response?.id)
    } catch (error: any) {
      // toast.error('Error fetching data');
    }finally {
      setLoading(false);
    }
  };

  


  const getAllFoodTypeAndQuantity = async () => {
    try {
      const dryFoodResponse = await apiRequest(`${API_BASE_URL_DEMO}${DRY_FOOD}`, {
        method: 'POST',
        // body: JSON.stringify({ pet_id: petId }),
      });
      setDryFoodData(dryFoodResponse);

      const wetDataResponse = await apiRequest(`${API_BASE_URL_DEMO}${WET_FOOD}`, {
        method: 'POST',
        // body: JSON.stringify({ pet_id: petId }),
      });
      setWetFoodData(wetDataResponse);
      const wetQuantityDataResponse = await apiRequest(`${API_BASE_URL_DEMO}${WET_FOOD_QUANTITY}`, {
        method: 'POST',
        // body: JSON.stringify({ pet_id: petId }),
      });
      setWetFoodQuantityData(wetQuantityDataResponse);
      const dryQuantityDataResponse = await apiRequest(`${API_BASE_URL_DEMO}${DRY_FOOD_QUANTITY}`, {
        method: 'POST',
        // body: JSON.stringify({ pet_id: petId }),
      });
      setDryFoodQuantityData(dryQuantityDataResponse);
    } catch (error: any) {
      toast.error('Error fetching data');
    }
  };



  // Function to handle medication change for each row
  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedData = [...medData];
    updatedMedData[index] = {
      ...updatedMedData[index],
      [field]: value,
    };
    setMedData(updatedMedData);
  };

  // Function to remove a medication row
  const removeMedication = (index: number) => {
    const updatedMedData = medData.filter((_, i) => i !== index);
    setMedData(updatedMedData);
  };

  // Function to add a new medication row with default values
  const addMedication = () => {
    const newRow: MedDataItem = {
      id: '',
      medicationName: '',
      medicationDosage: '',
    };

    setMedData([...medData, newRow]);
  };

  



  const handleFoodChange = (index: number, field: string, value: string | boolean) => {
    setFoodData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [field]: value, // Ensure the selected value is correctly updated
      };
  
      console.log("Updated foodData:", updatedData); // Debugging log
  
      return updatedData;
    });
  };
  
  

  // Function to remove a food intake row
  const removeFoodIntake = (index: number) => {
    const updatedData = foodData.filter((_, i) => i !== index);
    setFoodData(updatedData);
  };

  // Function to add a new food intake row with default values
const addFoodIntake = () => {
  const newRow: DataItem = {
    food_type: '',
    food: null,
    brand: '',
    amount: '',
    water: '',
    morning: false,
    afternoon: false,
    evening: false,
  };

  setFoodData([...foodData, newRow]);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    const requestData = {
      id: id || '',  // If updating, include the ID
      pet_id: petId,
      reservation_id: reservationId || "", // Ensure a fallback if undefined
      run,
      food_instructions_first: foodInstructionsFirst || "",
      food_instructions_second: foodInstructionsSecond || "",
      client_medication: clientMedication || "",
      daily_health_log_date: dailyHealthLogDate || "",
      daily_run: dailyRun || "",
      medication_instructions: medData || [], // Ensure it's always an array
      daily_food_intake: foodData || [],
      poo: poo ?? false, // Ensure boolean values
      pee: pee ?? false,
      other: other || "",
      health_check: healthCheck || "",
      action: action || "",
      mid_litter_check: midLitterCheck || "",
      initials: initials || "",
      day: day || "",
      comments: comments || "",
    };
    

    try {
      const response = await apiRequest(`${API_BASE_URL_DEMO}${ADD_FEEDING_CARE_MENU}`, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      toast.success('Feeding added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onBack();
    } catch (error: any) {
      toast.error('Error: Feeding not added!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



   

  return (
    <div className="feeding-box">
      <h2>Client Instructions</h2>
      <div className="f1" id="fcenter">
        <div className="f1-left">
          <div className="mb-3">
            <label htmlFor="run" className="form-label">
              Run 
            </label>
            <input
              type="text"
              className="form-control"
              id="run"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              placeholder="A11/15"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foodInstructionsFirst" className="form-label">
              Food Instructions
            </label>
            <div className="f11">
              <input
                type="text"
                className="form-control"
                id="foodInstructionsFirst"
                value={foodInstructionsFirst}
                onChange={(e) => setFoodInstructionsFirst(e.target.value)}
                placeholder="Wet Food ; Brand Name - 1/4 Can,"
              />
              <input
                type="text"
                className="form-control"
                id="foodInstructionsSecond"
                value={foodInstructionsSecond}
                onChange={(e) => setFoodInstructionsSecond(e.target.value)}
                placeholder="Dry Food ; Brand Name - 1/4"
              />
            </div>
          </div>
        </div>
        <div className="f2">
          <div className="mb-3">
            <label htmlFor="medicationInstructions" className="form-label">
              Medication Instructions
            </label>
            <input
              type="text"
              className="form-control"
              id="medicationInstructions"
              value={clientMedication}
              onChange={(e) => setClientMedication(e.target.value)}
              placeholder="Medication instructions"
            />
          </div>
        </div>
      </div>

      <h2 className="mt-3 mb-3 health-logg">
        Daily Health Log <img style={{width:"11px", height:"11px"}} src="/exclamation.png" alt="" />
      </h2>
      <div className="f2" id='datepickarea'>
        <div className="mb-3">
          <label htmlFor="dailyHealthLogDate" className="form-label">
            Date
          </label>


<DatePicker
                selected={dailyHealthLogDate ? new Date(dailyHealthLogDate) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    setDailyHealthLogDate(date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
        </div>
        <div className="mb-3">
          <label htmlFor="dailyRun" className="form-label">
            Run
          </label>
          <select
            className="form-select form-select-sm"
            value={dailyRun}
            onChange={(e) => setDailyRun(e.target.value)}
          >
            <option value="1/2">1/2</option>
            <option value="1">One</option>
            <option value="2">Two</option> 
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <div className="f2" id="marginsetcenter1">
      {loading ? (
      <p></p>
    ) :medData?.length > 0 ? (
  medData?.map((med, index) => (
    <div key={index} className="f2" id="marginsetcenter">
      <div className="f100">
              <div className="enterhere">
                <label htmlFor="clientMedication" className="form-label">
                  Medication
                </label>
                <input
                  type="text"
                  className="form-control madicationinput"
                  placeholder="Name of medication"
                  value={med.medicationName}
                  onChange={(e) => handleMedicationChange(index, "medicationName", e.target.value)}
                />
              </div>
              <div className="enterhere">
                <label htmlFor="clientMedication" className="form-label">
                  Doses
                </label>

                <input
                  type="text"
                  className="form-control doseinput"
                  placeholder="Dose"
                  value={med.medicationDosage}
                  onChange={(e) => handleMedicationChange(index, "medicationDosage", e.target.value)}
                />
              </div>
              {index > 0 && (
                <button type="button" onClick={() => removeMedication(index)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13H5C4.4 13 4 12.6 4 12C4 11.4 4.4 11 5 11H19C19.6 11 20 11.4 20 12C20 12.6 19.6 13 19 13Z"
                      fill="#1eaff8"
                      stroke="#1eaff8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

          </div>
        ))
      ): (
          <p></p>
        )}
        <button className='plusplus' type="button" onClick={addMedication}>
          <img style={{ width: "18px" }} src="/circle.png" alt="" />
        </button>
      </div>
      <div className="feeding-box" id="feedtake">
        <h3>Daily Food Intake</h3>
        {/* for wet food */}
        <div className="f2" id="coloumfeed1">
          <div className="f2" id="coloumfeed">
          {loading ? (
      <p></p>
    ) :foodData?.length > 0 ? (
            foodData.map((food, index) => (
           
              <div key={index} className="food-intake-section f2">
                <div className='testingclass'>
                  
                {food.food_type === "wet" ? (  
                <div className='testingclasss'>
                <div className="mb-3">
                <select
                className="form-select form-select-sm"
                value={food.food_type}
                onChange={(e) =>
                  handleFoodChange(index, "food_type", e.target.value)
                }
              >

                <option value="wet">Wet Food</option>
                <option value="dry">Dry Food</option>
              </select>
                </div>
                <div className="mb-3">
                              <select
                className="form-select form-select-sm"
                value={food?.brand || ''} // Ensure first option is selected by default
                onChange={(e) => handleFoodChange(index, "brand", e.target.value)}
              >
                {wetFoodData.map((item) => (
                  <option key={item.id} value={item.sub_service_name}>
                    {item.sub_service_name}
                  </option>
                ))}
              </select>

                </div>
                <div className="mb-3">
                <select
                  className="form-select form-select-sm"
                  value={food?.amount || ''} // Default to first option if empty
                  onChange={(e) =>
                    handleFoodChange(index, "amount", e.target.value)
                  }
                >
                  {wetFoodQuantityData.map((item) => (
                    <option key={item.id} value={item.sub_service_name}>
                      {item.sub_service_name}
                    </option>
                  ))}
                </select>

                </div>

                <div className="intakedata">
                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`morning-${index}`}
                      checked={food?.food_type === "wet" ? food?.morning || false : false}
                onChange={(e) =>
                  handleFoodChange(index, "morning", e.target.checked)
                }
                    />
                    <label className="form-check-label" htmlFor={`morning-${index}`}>
                      Morning
                    </label>
                  </div>

                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`afternoon-${index}`}
                      checked={food?.food_type === "wet" ? food?.afternoon || false : false}
                onChange={(e) =>
                  handleFoodChange(index, "afternoon", e.target.checked)
                }
                    />
                    <label className="form-check-label" htmlFor={`afternoon-${index}`}>
                      Afternoon
                    </label>
                  </div>

                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`evening-${index}`}
                      checked={food?.food_type === "wet" ? food?.evening || false : false}
                onChange={(e) =>
                  handleFoodChange(index, "evening", e.target.checked)
                }
                    />
                    <label className="form-check-label" htmlFor={`evening-${index}`}>
                      Evening
                    </label>
                  </div>
                </div>
                <div className="mb-3" id="waterhere">
                  <label className="form-label">Water</label>
                  <select
                    className="form-select form-select-sm"
                    value={''}
                    onChange={(e) =>
                      handleFoodChange(index, "water", e.target.value)
                    }
                  >
                    <option value="">Water Amount</option>
                    <option value="1/2">1/2</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                {foodData.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFoodIntake(index)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 13H5C4.4 13 4 12.6 4 12C4 11.4 4.4 11 5 11H19C19.6 11 20 11.4 20 12C20 12.6 19.6 13 19 13Z"
                        fill="#1eaff8"
                        stroke="#1eaff8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
</div>
         ) : (
                <div className='testingclasss'>
                <div className="mb-3">
                <select
                className="form-select form-select-sm"
                value={food.food_type}
                onChange={(e) =>
                  handleFoodChange(index, "food_type", e.target.value)
                }
              >
                                 <option value="" disabled>Select Food</option>
                <option value="wet">Wet Food</option>
                <option value="dry">Dry Food</option>
              </select>
                </div>
                <div className="mb-3">
                <select
                className="form-select form-select-sm"
                value={food?.brand || ''} // Default to first option if empty
                onChange={(e) =>
                  handleFoodChange(index, "brand", e.target.value) // Corrected field name
                }
              >
                {dryFoodData.map((item) => (
                  <option key={item.id} value={item.sub_service_name}>
                    {item.sub_service_name}
                  </option>
                ))}
              </select>

                </div>
                <div className="mb-3">
                <select
                      className="form-select form-select-sm"
                      value={food?.amount || ''} // Default to first option if empty
                      onChange={(e) =>
                        handleFoodChange(index, "amount", e.target.value) // Corrected field name
                      }
                    >
                      {dryFoodQuantityData.map((item) => (
                        <option key={item.id} value={item.sub_service_name}>
                          {item.sub_service_name}
                        </option>
                      ))}
                    </select>

                </div>

                <div className="intakedata">
                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`morning-${index}`}
                      checked={food?.food_type === "dry" ? food?.morning || false : false}
                      onChange={(e) =>
                        handleFoodChange(index, "morning", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor={`morning-${index}`}>
                      Morning
                    </label>
                  </div>

                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`afternoon-${index}`}
                      checked={food?.food_type === "dry" ? food?.afternoon || false : false}
                    onChange={(e) =>
                      handleFoodChange(index, "afternoon", e.target.checked)
                    }
                      
                    />
                    <label className="form-check-label" htmlFor={`afternoon-${index}`}>
                      Afternoon
                    </label>
                  </div>

                  <div className="k2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`evening-${index}`}
                      checked={food?.food_type === "dry" ? food?.evening || false : false}
                    onChange={(e) =>
                      handleFoodChange(index, "evening", e.target.checked)
                    }
                    />
                    <label className="form-check-label" htmlFor={`evening-${index}`}>
                      Evening
                    </label>
                  </div>
                </div>
                <div className="mb-3" id="waterhere">
                  <label className="form-label">Water</label>
                  <select
                    className="form-select form-select-sm"
                    value={''}
                    onChange={(e) =>
                      handleFoodChange(index, "water", e.target.value)
                    }
                  >
                    <option value="">Water Amount</option>
                    <option value="1/2">1/2</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                {foodData.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFoodIntake(index)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 13H5C4.4 13 4 12.6 4 12C4 11.4 4.4 11 5 11H19C19.6 11 20 11.4 20 12C20 12.6 19.6 13 19 13Z"
                        fill="#1eaff8"
                        stroke="#1eaff8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
                </div>

              )}
              </div>
              </div>  
            ))): (
              <p></p>
            )}

            {/* Add button should always be present */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addFoodIntake}
            >
              <img className='bttt' style={{width:"18px"}} src="/circle.png" alt="" />
            </button>
          </div>

        </div>
      </div>

      <div className="f2" id='bootminside'>
        <div className="mb-3">
          <label htmlFor="poo" className="form-label">
            Poo
          </label>
          <select
            className="form-select form-select-sm"
            value={poo ? "true" : "false"} // Convert boolean to string for select
            onChange={(e) => setPoo(e.target.value === "true")} // Convert back to boolean
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

        </div>
        <div className="mb-3">
          <label htmlFor="pee" className="form-label">
            Pee
          </label>
          <select
          className="form-select form-select-sm"
          value={pee ? "true" : "false"} // Convert boolean to string for select
          onChange={(e) => setPee(e.target.value === "true")} // Convert back to boolean
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
</select>

        </div>
        <div className="mb-3">
          <label htmlFor="other" className="form-label">
            Other
          </label>
          <select
            className="form-select form-select-sm"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          >
            <option value="1/2">1/2</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="healthCheck" className="form-label">
            Health Check
          </label>
          <select
            className="form-select form-select-sm"
            value={healthCheck}
            onChange={(e) => setHealthCheck(e.target.value)}
          >
            <option value="1/2">1/2</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Action
          </label>
          <input
            type="text"
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </div>

      <div className="f2" id='bootminside'>
        <div className="mb-3">
          <label htmlFor="midLitterCheck" className="form-label">
            Mid-Litter Check
          </label>
          <select
            className="form-select form-select-sm"
            value={midLitterCheck}
            onChange={(e) => setMidLitterCheck(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="None">None</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="initials" className="form-label">
            Initials
          </label>
          <select
            className="form-select form-select-sm"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          >
            <option value="No">No</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="initials" className="form-label"></label>
          <select
            className="form-select form-select-sm"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="No">No</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Comments
          </label>
          <input
            type="text"
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 print-box f13">
        <button className="print" onClick={handleSubmit}>
          Save
        </button>
        <button className="print" onClick={onBack}>
          Back
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
