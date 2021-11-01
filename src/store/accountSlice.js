import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getLoggedInUser = createAsyncThunk('account/login', async({username, password}) => {
    const response = null; // get okta user ger user from fhir set logged in user in extra reducers
    return response
});


export const slice = createSlice({
  name: "account",
  initialState: {
    auth: false,
    user: null,
    loading: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      //todo 
      // state.user = action.payload.user
      state.loading = false;
    });
    builder.addCase(getLoggedInUser.rejected, (state) => {
      state.loading = false;
    });
  }
});

const reducer = slice.reducer;
export default reducer;
export const { setUserData, logout} = slice.actions;

// Use this slice to manage logged in user
