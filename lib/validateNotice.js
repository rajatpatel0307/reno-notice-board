const allowedCategories = ["Exam", "Event", "General"];
const allowedPriorities = ["Normal", "Urgent"];

export function validateNotice(input = {}) {
  const publishDate = input.publishDate ? new Date(input.publishDate) : null;

  const values = {
    title: String(input.title || "").trim(),
    body: String(input.body || "").trim(),
    category: String(input.category || "").trim(),
    priority: String(input.priority || "").trim(),
    publishDate,
    imageUrl: input.imageUrl ? String(input.imageUrl).trim() : null,
  };

  const errors = {};

  if (!values.title) {
    errors.title = "Title is required.";
  }

  if (!values.body) {
    errors.body = "Body is required.";
  }

  if (!allowedCategories.includes(values.category)) {
    errors.category = "Category must be Exam, Event, or General.";
  }

  if (!allowedPriorities.includes(values.priority)) {
    errors.priority = "Priority must be Normal or Urgent.";
  }

  if (!values.publishDate || Number.isNaN(values.publishDate.getTime())) {
    errors.publishDate = "Publish date must be a valid date.";
  }

  if (values.imageUrl) {
    try {
      new URL(values.imageUrl);
    } catch (error) {
      errors.imageUrl = "Image URL must be a valid URL.";
    }
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
