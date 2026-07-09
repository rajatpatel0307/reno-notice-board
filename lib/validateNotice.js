export function validateNotice(input) {
  const values = {
    title: String(input.title || "").trim(),
    description: String(input.description || "").trim(),
    category: String(input.category || "General").trim(),
    location: String(input.location || "").trim(),
    contact: String(input.contact || "").trim(),
  };

  const errors = {};

  if (values.title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (values.description.length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (!values.location) {
    errors.location = "Location is required.";
  }

  if (!values.contact) {
    errors.contact = "Contact is required.";
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
