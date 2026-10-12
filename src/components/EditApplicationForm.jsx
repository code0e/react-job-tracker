import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateApplication } from "../features/applications/applicationsSlice";

function EditApplicationForm({ application, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: application.company,
    role: application.role,
    status: application.status,
    dateApplied: application.dateApplied,
    jobUrl: application.jobUrl,
    notes: application.notes,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(
      updateApplication({
        id: application.id,
        changes: formData,
      }),
    );

    onClose();
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Edit Application</h2>

      <label>
        Company
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Job Title
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      <label>
        Date Applied
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Job Link
        <input
          type="url"
          name="jobUrl"
          value={formData.jobUrl}
          onChange={handleChange}
        />
      </label>

      <label>
        Notes
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      <div className="form-actions">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditApplicationForm;
