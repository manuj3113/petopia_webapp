// utils/apiClient.ts
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  console.log("End Point", endpoint, options);
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  // Set up headers, including the Authorization header if a token exists
  console.log("Token", token);
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Configure the request options, merging with any provided options
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    // Handle potential errors (Bad Request, Unauthorized, etc.)
    if (response.status === 400) {
      const errorData = await response.json();
      console.log(errorData.message, "message");
      // alert(errorData.message);
      // throw new Error(`${errorData.message || 'Invalid input'}`);
    }

    if (response.status === 401) {
      // Handle token expiration, e.g., redirect to login
      console.error("Unauthorized - Token may have expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check the Content-Type of the response to determine if it's a PDF
    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/pdf")) {
      // If the response is a PDF, return it as a Blob
      
      return await response.blob();
    }

    // For JSON responses (default case)
    return await response.json();
  } catch (error) {
    console.log("API request failed:", error);
    throw error;
  }
}
