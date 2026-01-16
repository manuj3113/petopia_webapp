"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, UPDATE_PET_COLOR } from "@/app/constants/config";
import { apiRequest } from "@/app/utils/apiClient";

// for toast notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
//

interface PetColorMasterProps {
  id?: number;
  initialPetColor?: string;
  initialDescription?: string;
  onSubmitComplete: (
    id: number | undefined,
    petColor: string,
    description: string
  ) => void;
}

export default function PetTypeMaster({
  id: initialId,
  initialPetColor = "",
  initialDescription = "",
  onSubmitComplete,
}: PetColorMasterProps) {
  const [id, setId] = useState<number | undefined>(initialId);
  const [petColor, setPetColor] = useState<string>(initialPetColor);
  const [description, setDescription] = useState<string>(initialDescription);

  console.log(initialId, initialDescription, initialPetColor);
  useEffect(() => {
    console.log("Initial values:", {
      initialId,
      initialPetColor,
      initialDescription,
    });
    setId(initialId);
    setPetColor(initialPetColor);
    setDescription(initialDescription);
  }, [initialId, initialPetColor, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiRequest(`${API_BASE_URL}${UPDATE_PET_COLOR}`, {
        method: "POST",
        body: JSON.stringify({ id, color_name: petColor, description }),
      });
      toast.success("Color name update successfully", {
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
      toast.error("Error: Color name not update!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log("Submitted:", { id, petColor, description });
    onSubmitComplete(id, petColor, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-addsome">
        <label>Pet Color:</label>
        <input
          type="text"
          value={petColor}
          onChange={(e) => setPetColor(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
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
