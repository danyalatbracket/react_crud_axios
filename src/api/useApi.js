export const useApi = () => {
  const makeRequest = async (endpoint, options = {}) => {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error("Daily Quota Reached");
      }
      throw new Error(errorData?.detail || "An Error Occured");
    }

    return response.json();
  };
  return { makeRequest };
};
