export const postFile = (formData) => {
  return fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
};
