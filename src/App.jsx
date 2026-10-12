import { useState } from "react";
import ApplicationForm from "./components/ApplicationForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplication } from "./features/applications/applicationsSlice";
import EditApplicationForm from "./components/EditApplicationForm";
import ApplicationDetails from "./components/ApplicationDetails";
import "./App.css";

function App() {
  const applications = useSelector((state) => state.applications.items);
  const totalApplications = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="career">YOUR CAREER DASHBOARD</p>
          <h1>Job Tracker</h1>
          <p>Keep track of your career opportunities.</p>
        </div>

        <button className="add-job-button" onClick={() => setShowForm(true)}>
          + Add Application
        </button>
      </header>

      {selectedApplication ? (
        <ApplicationDetails
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      ) : (
        <>
          {showForm && <ApplicationForm onClose={() => setShowForm(false)} />}

          {editingApplication && (
            <EditApplicationForm
              application={editingApplication}
              onClose={() => setEditingApplication(null)}
            />
          )}

          <section className="stats-grid">
            <article className="stat-card">
              <p>Total Applications</p>
              <h2>{totalApplications}</h2>
            </article>

            <article className="stat-card">
              <p>Interviews</p>
              <h2>{interviews}</h2>
            </article>

            <article className="stat-card">
              <p>Offers</p>
              <h2>{offers}</h2>
            </article>

            <article className="stat-card">
              <p>Rejected</p>
              <h2>{rejected}</h2>
            </article>
          </section>

          <section className="applications-section">
            <h2>Recent Applications</h2>

            <div className="application-filters">
              <input
                type="search"
                placeholder="Search company or job title..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {filteredApplications.length === 0 ? (
              <p className="empty-state">
                {applications.length === 0
                  ? "No applications yet. Add your first job to get started."
                  : "No applications match your search or filter."}
              </p>
            ) : (
              filteredApplications.map((app) => (
                <article className="application-card" key={app.id}>
                  <div>
                    <h3>{app.company}</h3>
                    <p>{app.role}</p>
                  </div>

                  <span className="status-badge">{app.status}</span>

                  <button
                    type="button"
                    onClick={() => setEditingApplication(app)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(deleteApplication(app.id))}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedApplication(app)}
                  >
                    View Details
                  </button>
                </article>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default App;
