const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  errorMessage: null,
};
const sectionSlice = createSlice({
  name: "section",
  initialState: { ...initialState },
  reducers: {
    onSectionLoading: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onSectionSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
      isLoading: false,
      data: action.payload,
    }),

    onSectionFailed: (state, action) => ({
      ...state,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    }),
  },
});

export const { onSectionLoading, onSectionSuccess, onSectionFailed } =
  sectionSlice.actions;
// sectionReducer
export default sectionSlice.reducer;
