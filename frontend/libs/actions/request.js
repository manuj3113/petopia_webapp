// import api from "@/lib/axios";

import api from "../axios";

export const postData = async (endpoint, data) => {
    try {
      const response = await api(endpoint, {
        method: "POST",
        data,
      });
      console.log(response ,"post response")
      return response.data;
    } catch (error) {
        console.log(error)
        throw error
      return error?.response?.data ?? {};
    }
  };
  

  export const postDataMulti = async (endpoint, data) => {
    try {
      console.log(data, "data from multi")
      const response = await api(endpoint, {
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response, "post response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const postDataMultiBase = async (endpoint, data) => {
    try {
      console.log(endpoint, data,"here be set")
      // Helper function to convert file to base64
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };
  
      // Convert files in the data object to base64 if necessary
      const processDataToBase64 = async (dataObj) => {
        let processedData = { ...dataObj };
  
        // Convert image to base64 if exists
        if (dataObj.image && dataObj.image instanceof File) {
          processedData.image = await getBase64(dataObj.image);
        }
  
        // Convert document to base64 if exists
        if (dataObj.uploadDocumentPath && dataObj.uploadDocumentPath instanceof File) {
          processedData.uploadDocumentPath = await getBase64(dataObj.uploadDocumentPath);
        }
  
        return processedData;
      };
  
      console.log(data)
      // Process the data object to convert any files to base64
      const processedData = await processDataToBase64(data);
  
      console.log(processedData, "data after base64 conversion");
  
      // Now send the processed (base64 encoded) data as JSON to the API
      const response = await api(endpoint, {
        method: "POST",
        data: processedData, // Use the processed data with base64-encoded fields
        headers: {
          "Content-Type": "application/json", // Change the content-type to JSON if sending base64
        },
      });
  
      console.log(response, "post response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const postDataMultiPdf = async (endpoint, data) => {
    console.log(data)
    try {
      const response = await api(endpoint, {
        method: "POST",
        data,
   responseType: 'blob'
      });
  
      console.log(response, "post response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };