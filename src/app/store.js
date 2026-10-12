import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "../features/applications/applicationsSlice";

const STORAGE_KEY = "codee-job-tracker-applications";

function loadApplications() {
  try {
    const savedApplications = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return {
      items: Array.isArray(savedApplications) ? savedApplications : [],
    };
  } catch {
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },

  preloadedState: {
    applications: loadApplications(),
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().applications.items),
    );
  } catch (error) {
    console.error("Could not save applications:", error);
  }
});
