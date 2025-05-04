
export const apiRequest = async (url: string, method: string = "GET", body: any = null) => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      throw new Error("No token found!");
    }
  
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
  
    if (response.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("authToken");
      window.location.href = "/login";  // Redirect to login page
      throw new Error("Session expired. Please log in again.");
    }
  
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
  
    return await response.text();
  };
  