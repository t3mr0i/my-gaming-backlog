export const getMetacriticColor = (score) => {
  if (score >= 90) {
    return "bg-blue-600";
  } else if (score >= 75) {
    return "bg-green-600";
  } else if (score >= 50) {
    return "bg-yellow-600";
  } else {
    return "bg-red-600";
  }
};
