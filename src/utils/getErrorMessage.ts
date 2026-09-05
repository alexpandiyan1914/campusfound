const getErrorMessage = (
  error: any,
  fallback:
    string = "Something went wrong. Please try again."
): string => {
  const data =
    error?.response?.data;

  if (
    typeof data ===
    "string"
  ) {
    return data;
  }

  if (
    typeof data?.message ===
    "string"
  ) {
    return data.message;
  }

  if (
    typeof error?.message ===
      "string" &&
    error.message !==
      "Network Error"
  ) {
    return error.message;
  }

  if (
    error?.message ===
    "Network Error"
  ) {
    return "Unable to connect. Please check your internet connection.";
  }

  return fallback;
};

export default getErrorMessage;