export const postFile = (formData) => {
  return fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
};

export const getFile = () => {
  return fetch("/api/image", {
    method: "GET",
  });
};

export const getDoc = () => {
  return fetch("/api/document", {
    method: "GET",
  });
};
