const { createSlice } = require("@reduxjs/toolkit");

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    isLoading: false,
    isPostAnswerSuccess: false,
    isBulkDeleteSuccess: false,
    questions: [],
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onGetAnswersByPartId: (state, action) => ({
      ...state,
      isLoading: true,
      isPostAnswerSuccess: false,
    }),
    onGetAnswersByPartIdSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isBulkDeleteSuccess: false,
      questions: action.payload,
    }),
    onPostAnswer: (state, action) => ({
      ...state,
      isLoading: true,
      isPostAnswerSuccess: false,
    }),
    onPostAnswerSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isPostAnswerSuccess: action.payload,
    }),
    onDeleteAnswer: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onBulkDeleteAnswer: (state, action) => ({
      ...state,
      isLoading: true,
      isBulkDeleteSuccess: false,
    }),
    onBulkDeleteAnswerSuccess: (state, action) => ({
      ...state,
      isBulkDeleteSuccess: action.payload,
    }),
  },
});

export const {
  onLoading,
  onGetAnswersByPartId,
  onGetAnswersByPartIdSuccess,
  onPostAnswer,
  onPostAnswerSuccess,
  onDeleteAnswer,
  onBulkDeleteAnswer,
  onBulkDeleteAnswerSuccess,
} = answerSlice.actions;
// reducer
export default answerSlice.reducer;
