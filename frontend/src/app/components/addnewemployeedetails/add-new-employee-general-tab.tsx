import { useState, useEffect } from "react";
import { API_BASE_URL_DEMO, ADD_GENERAL_EMPLOYEE, GET_EMPLOYEE_BY_ID } from "@/app/constants/config";
import { apiRequest } from "@/app/utils/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface EmployeeDataItem {
  id: any;
  first_name: string;
  last_name: string;
  job_title: string;
  inactive: boolean;
  emp_initial: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  worker_type: string;
  departments: string;
  personal_email: string;
  work_email: string;
  facility: string;
  send_offer_letter: boolean;
  start_date: string; // ISO date string
  employee_type: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


interface AddGeneralEmployeeTabProps {
  onSuccess: (id: string | number) => void; // The function accepts a string or number (id) and returns nothing
}

export default function AddGeneralEmployeeTab({
  onSuccess,
}: AddGeneralEmployeeTabProps) {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [inactive, setInactive] = useState(false);
  const [empInitial, setEmpInitial] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");  
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [workerType, setWorkerType] = useState("");
  const [departments, setDepartments] = useState<string>("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [sendOfferLetter, setSendOfferLetter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [employeeData, setEmployeeData] = useState<Partial<EmployeeDataItem>>({});
  const urlParams = new URLSearchParams(window.location.search);
  const employeeType = urlParams.get("employee_type") ;
  const employeeId = urlParams.get("id")?.trim() || localStorage.getItem('employee_add_id')?.trim() || "";
  const [loading, setLoading] = useState<boolean>(false);
  console.log(employeeType, "employeeType");

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Make the API request
      if (departments.length === 0) {
        toast.error("Please select at least one department.");
        return;
      }
      if (workerType.length === 0) {
        toast.error("Please select at least one worker type.");
        return;
      }

      
    
      const response = await apiRequest(
        `${API_BASE_URL_DEMO}${ADD_GENERAL_EMPLOYEE}`,
        {
          method: "POST",
          body: JSON.stringify({
            id:employeeId,
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            inactive,
            emp_initial: empInitial,
            address,
            city,
            state,
            zip,
            phone,
            worker_type: workerType,
            departments,
            personal_email: personalEmail,
            work_email: workEmail,
            facility,
            send_offer_letter: sendOfferLetter,
            start_date: startDate,
            employee_type: employeeType,
          }),
        }
      );
      console.log("Respsone", response);
      localStorage.setItem("employee_add_id", response.id);
      toast.success("General employee details add successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // // Clear form after successful submission
      // setFirstName('');
      // setLastName('');
      // setJobTitle('');
      // setInactive(false);
      // setEmpInitial('');
      // setAddress('');
      // setCity('');
      // setState('');
      // setZip('');
      // setPhone('');
      // setWorkerType('');
      // setDepartments('');
      // setPersonalEmail('');
      // setWorkEmail('');
      // setFacility('');
      // setSendOfferLetter(false);
      // setStartDate('');
      onSuccess(response?.id );
    } catch (error) {
      toast.error("Error: General employee details  not add !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getEmployeeDataById = async (employeeId:any) => {
    setLoading(true)
    try {
        const response = await apiRequest(`${API_BASE_URL_DEMO}${GET_EMPLOYEE_BY_ID}`, {
            method: 'POST',
            body: JSON.stringify({ id: employeeId})
        });
        setEmployeeData(response);
        console.log("Response", response);
    } catch (error: any) {
        console.error("Error fetching data:", error);

    } finally {
      setLoading(false)
    }
};

  useEffect(() => {
    if (employeeId || employeeId !== null) {
      getEmployeeDataById(employeeId);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeData && Object.keys(employeeData).length > 0) {
      setId(employeeData.id || "")
      setFirstName(employeeData.first_name || "");
      setLastName(employeeData.last_name || "");
      setJobTitle(employeeData.job_title || "");
      setInactive(employeeData.inactive || false);
      setEmpInitial(employeeData.emp_initial || "");
      setAddress(employeeData.address || "");
      setCity(employeeData.city || "");
      setState(employeeData.state || "");
      setZip(employeeData.zip || "");
      setPhone(employeeData.phone || "");
      setWorkerType(employeeData.worker_type || "");
      setDepartments(employeeData.departments || "");
      setPersonalEmail(employeeData.personal_email || "");
      setWorkEmail(employeeData.work_email || "");
      setFacility(employeeData.facility || "");
      setSendOfferLetter(employeeData.send_offer_letter || false);
      setStartDate(employeeData.start_date || "");
    } else {
      // Reset to empty values if no employee data is available
      setFirstName("");
      setLastName("");
      setJobTitle("");
      setInactive(false);
      setEmpInitial("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setPhone("");
      setWorkerType("");
      setDepartments("");
      setPersonalEmail("");
      setWorkEmail("");
      setFacility("");
      setSendOfferLetter(false);
      setStartDate("");
    }
  }, [employeeData]);




  return (
    <div className="general">
     {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
      <form onSubmit={handleSubmit}>
        <div className="formhub">
          <div className="contact-side">
            <h2>General</h2>
            <div className="form-group">
              <div className="half-width">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="half-width">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="half-width">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="half-width" id="half-chackbox">
                <label>
                  <input
                    type="checkbox"
                    id="inactive"
                    checked={inactive}
                    onChange={(e) => setInactive(e.target.checked)}
                  />
                  Inactive
                </label>
              </div>
              <div className="half-width">
                <label htmlFor="emp-initial">Emp. Initial</label>
                <input
                  type="text"
                  id="emp-initial"
                  value={empInitial}
                  onChange={(e) => setEmpInitial(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="contact-side">
            <h2>Contact Details</h2>
            <div className="form-group">
              <div className="full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="city-code">
                <div className="half-width">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select</option>
                  </select>
                </div>
                <div className="half-width">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select</option>
                  </select>
                </div>
                <div className="half-width">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    id="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
              <div className="full-width">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="formhub">
          <div className="contact-side">
            <h3>Worker Type</h3>
            <div className="form-group worker-type radio-group">
              <div className="comm-radioo">
                <input
                  className="form-check-input"
                  type="radio"
                  name="worker-type"
                  value="hourly"
                  checked={workerType === "hourly"}
                  onChange={(e) => setWorkerType(e.target.value)}
                />
                <label>
                  Hourly Employee
                  <br />
                  <span>
                    Non Exempt worker paid an hourly with rights and benefits
                    received through employment.
                  </span>
                </label>
              </div>
              <div className="comm-radioo">
                <input
                  className="form-check-input"
                  type="radio"
                  name="worker-type"
                  value="exempt"
                  checked={workerType === "exempt"}
                  onChange={(e) => setWorkerType(e.target.value)}
                />
                <label>
                  Exempt Employee
                  <br />
                  <span>
                    Worker paid salaried wage with rights and benefits received
                    through employment.
                  </span>
                </label>
              </div>
              <div className="comm-radioo">
                <input
                  className="form-check-input"
                  type="radio"
                  name="worker-type"
                  value="individual"
                  checked={workerType === "individual"}
                  onChange={(e) => setWorkerType(e.target.value)}
                />
                <label>
                  Individual Contractor
                  <br />
                  <span>
                    Independent professional engaged under contract for a
                    specific project or projects, usually on a short term basis.
                  </span>
                </label>
              </div>
              <div className="comm-radioo">
                <input
                  className="form-check-input"
                  type="radio"
                  name="worker-type"
                  value="business"
                  checked={workerType === "business"}
                  onChange={(e) => setWorkerType(e.target.value)}
                />
                <label>
                  Business Contractor
                  <br />
                  <span>
                    Independent professional working on behalf of a business.
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="contact-side">
            <h3>Departments</h3>
            <div className="form-group departments checkbox-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="groomer"
                  checked={departments === "groomer"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "groomer" : "")
                  } // Set "groomer" or "" based on checked state
                />
                Groomer
              </label>
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="front-office"
                  checked={departments === "front-office"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "front-office" : "")
                  } // Set "front-office" or "" based on checked state
                />
                Front Office
              </label>
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="Kennel Assitant"
                  checked={departments === "Kennel Assitant"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "Kennel Assitant" : "")
                  } // Set "groomer" or "" based on checked state
                />
                Kennel Assitant
              </label>
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="Pet-sitter"
                  checked={departments === "Pet-sitter"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "Pet-sitter" : "")
                  } // Set "front-office" or "" based on checked state
                />
                Front Office
              </label>
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="Lead"
                  checked={departments === "Lead"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "Lead" : "")
                  } // Set "groomer" or "" based on checked state
                />
                Lead
              </label>
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="department"
                  value="Manager"
                  checked={departments === "Manager"}
                  onChange={(e) =>
                    setDepartments(e.target.checked ? "Manager" : "")
                  } // Set "front-office" or "" based on checked state
                />
                Manager
              </label>
              {/* Add other departments similarly */}
            </div>
          </div>
        </div>
        <div className="formhub">
        <div className="contact-side" id="contactids">
          <div className="form-group">
            <div className="half-width">
              <h3 >Personal Email</h3>
              <input
                type="email"
                id="personal-email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                required
              />
            </div>
            <div className="half-width">
              <h3 >Work Email</h3>
              <input
                type="email"
                id="work-email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                required
              />
            </div>
            <div className="half-width">
              <h3 >Select Facility</h3>
              <select
                id="facility"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              >
                <option value="">Select</option>
              </select>
            </div>
          </div>
          </div>
          <div className="contact-side" id="contactids">
          <div className="half-width">
          <h3 >Hiring options (optional)</h3>
            <label>
              <input className="form-check-input"
                type="checkbox"
                id="offer-letter"
                checked={sendOfferLetter}
                onChange={(e) => setSendOfferLetter(e.target.checked)}
              />
              Send an offer letter
            </label>
          </div>
          <div className="half-width">
            <h3 >Start Date</h3>
            {/* <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            /> */}

            <DatePicker
                selected={startDate ? new Date(startDate) : null}
                onChange={(date:Date |null) => {
                  if(date)
                    setStartDate(date.toLocaleDateString("en-US"))}}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
          </div>
          </div>
        </div>

        <div className="action-buttons">
          <button type="submit" className="save">
            Save
          </button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </form>
                )}   
      <ToastContainer />
    </div>
  );
}
