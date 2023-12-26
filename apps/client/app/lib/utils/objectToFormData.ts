export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(`${key}[]`, item.toString());
      });
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};
