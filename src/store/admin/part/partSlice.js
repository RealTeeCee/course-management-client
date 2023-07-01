const { createSlice } = require("@reduxjs/toolkit");

const partSlice = createSlice({
  name: "part",
  initialState: {
    isLoading: false,
    isPostPartSuccess: false,
    isBulkDeleteSuccess: false,
    parts: [],
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onGetPartsByCourseId: (state, action) => ({
      ...state,
      isLoading: true,
      isPostPartSuccess: false,
      isBulkDeleteSuccess: false,
    }),
    onGetPartsByCourseIdSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      parts: action.payload,
    }),
    onPostPart: (state, action) => ({
      ...state,
      isLoading: true,
      isPostPartSuccess: false,
    }),
    onPostPartSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isPostPartSuccess: action.payload,
    }),
    onDeletePart: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onBulkDeletePart: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onBulkDeletePartSuccess: (state, action) => ({
      ...state,
      isBulkDeleteSuccess: action.payload,
    }),
  },
});

export const {
  onLoading,
  onGetPartsByCourseId,
  onGetPartsByCourseIdSuccess,
  onPostPart,
  onPostPartSuccess,
  onDeletePart,
  onBulkDeletePart,
  onBulkDeletePartSuccess,
} = partSlice.actions;
// authReducer
export default partSlice.reducer;
