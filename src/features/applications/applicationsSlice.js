import { createSlice, nanoid } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    items: [],
  },
  reducers: {
    addApplication: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (application) => ({
        payload: {
          id: nanoid(),
          company: application.company,
          role: application.role,
          status: application.status || "Applied",
          dateApplied:
            application.dateApplied || new Date().toISOString().slice(0, 10),
          jobUrl: application.jobUrl || "",
          notes: application.notes || "",
        },
      }),
    },

    updateApplication: (state, action) => {
      const { id, changes } = action.payload;
      const application = state.items.find((item) => item.id === id);

      if (application) {
        Object.assign(application, changes);
      }
    },

    deleteApplication: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addApplication, updateApplication, deleteApplication } =
  applicationsSlice.actions;

export default applicationsSlice.reducer;
