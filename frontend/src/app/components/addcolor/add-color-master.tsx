"use client";
import { useState } from "react";

import { API_BASE_URL, ADD_PET_COLOR } from "@/app/constants/config";
import { apiRequest } from "@/app/utils/apiClient";
// for toast notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
//

interface ChildPageProps {
  onSubmitComplete: () => void;
}

export default function PetColorMaster({ onSubmitComplete }: ChildPageProps) {
  const [petColor, setPetColor] = useState("");
  const [description, setDescription] = useState("");
  const notify = () => toast("Wow so easy!");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiRequest(`${API_BASE_URL}${ADD_PET_COLOR}`, {
        method: "POST",
        body: JSON.stringify({
          color_name: petColor,
          description: description,
        }),
      });
      console.log("Respsone", response);

      // if (!response || !response.token) {
      //   alert('Invalid Details');
      //   return;
      // }

      // alert("Record save")
      toast.success("Color name add successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPetColor("");
      setDescription("");
    } catch (error: any) {
      toast.error("Error: Color name not add !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log("Submitted:", { petColor, description });
    onSubmitComplete();
    // Add your submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-addsome">
        <label>Pet Color:</label>
        <input
          type="text"
          value={petColor}
          onChange={(e) => setPetColor(e.target.value)}
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
