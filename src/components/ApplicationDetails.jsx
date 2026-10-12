function ApplicationDetails({ application, onClose }) {
  return (
    <section className="application-details">
      <button type="button" onClick={onClose}>
        ← Back to applications
      </button>

      <h2>{application.company}</h2>
      <p>{application.role}</p>

      <div className="details-row">
        <span>Status</span>
        <strong>{application.status}</strong>
      </div>

      <div className="details-row">
        <span>Date Applied</span>
        <strong>{application.dateApplied}</strong>
      </div>

      <div className="details-row">
        <span>Job Link</span>
        {application.jobUrl ? (
          <a href={application.jobUrl} target="_blank" rel="noreferrer">
            View Job Posting
          </a>
        ) : (
          <span>No job link added</span>
        )}
      </div>

      <div className="details-row">
        <span>Notes</span>
        <p>{application.notes || "No notes added"}</p>
      </div>
    </section>
  );
}

export default ApplicationDetails;
