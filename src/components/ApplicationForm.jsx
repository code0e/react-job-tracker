import { useState } from "react";
import { useDispatch } from "react-redux";
import { addApplication } from "../features/applications/applicationsSlice";

function ApplicationForm({ onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    dateApplied: new Date().toISOString().slice(0, 10),
    jobUrl: "",
    notes: "",
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

    dispatch(addApplication(formData));
    onClose();
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Add Job Application</h2>

      <label>
        Company
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Google"
          required
        />
      </label>

      <label>
        Job Title
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
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
          placeholder="https://example.com/job"
        />
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add interview details or notes..."
        />
      </label>

      <div className="form-actions">
        <button type="submit">Save Application</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
