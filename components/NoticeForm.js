import { useState } from "react";

const emptyNotice = {
  title: "",
  description: "",
  category: "General",
  location: "",
  contact: "",
};

export default function NoticeForm({ initialValues = emptyNotice, onSubmit, submitLabel }) {
  const [form, setForm] = useState({ ...emptyNotice, ...initialValues });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      await onSubmit(form);
    } catch (error) {
      setErrors(error.details || { form: error.message || "Unable to save notice." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="notice-form" onSubmit={handleSubmit}>
      {errors.form ? <p className="form-error">{errors.form}</p> : null}

      <label>
        Title
        <input name="title" value={form.title} onChange={updateField} />
        {errors.title ? <span>{errors.title}</span> : null}
      </label>

      <label>
        Description
        <textarea name="description" rows="6" value={form.description} onChange={updateField} />
        {errors.description ? <span>{errors.description}</span> : null}
      </label>

      <div className="form-row">
        <label>
          Category
          <select name="category" value={form.category} onChange={updateField}>
            <option>General</option>
            <option>Event</option>
            <option>Lost and Found</option>
            <option>Maintenance</option>
            <option>Urgent</option>
          </select>
        </label>

        <label>
          Location
          <input name="location" value={form.location} onChange={updateField} />
          {errors.location ? <span>{errors.location}</span> : null}
        </label>
      </div>

      <label>
        Contact
        <input name="contact" value={form.contact} onChange={updateField} />
        {errors.contact ? <span>{errors.contact}</span> : null}
      </label>

      <button type="submit" className="button" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
