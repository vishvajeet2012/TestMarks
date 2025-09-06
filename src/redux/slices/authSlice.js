import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadToken = createAsyncThunk("auth/loadToken", async (_, { rejectWithValue }) => {
  try {
    const savedToken = await AsyncStorage.getItem("token");
    if (!savedToken) return null;

    const res = await axios.get("https://vstoreserver.vercel.app/api/getsingleuser", {
      headers: {
        Authorization: `Bearer ${savedToken}`,
        "Content-Type": "application/json",
      },
    });

    return { token: savedToken, user: res.user };

  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post("https://vstoreserver.vercel.app/api/userFound", { email, password });

    const { token, userData } = res.data;
    await AsyncStorage.setItem("token", token);

    return { token, user: userData };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const register = createAsyncThunk("auth/register", async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
  try {
    await axios.post("https://vstoreserver.vercel.app/api/userSignup", {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
  return null;
});


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
        loading:false,
         error: null,

    },
      reducers: {},
  extraReducers: (builder) => {
        builder
        /// tokenn 
       .addCase(loadToken.pending, (state) => {
        state.loading = true;
      })

        .addCase(loadToken.fulfilled, (state,action)=>{
            state.loading= false;
            if (action.payload) {
          state.token = action.payload.token;
              state.user = action.payload.user;
        }
        }).addCase(loadToken.rejected,(state, action)=>{
            state.loading= false;
        state.error = action.payload;
        })
                    ///// ?login 
                      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.loading = false;
        state.token =action.payload.token;
        state.message = action.payload.message
      })
     .addCase(login.rejected,(state,action)=>{
          state.loading = false;
        state.error = action.payload.message;
      })

      ////signi

      .addCase(register.pending, (state) =>{
        state.loading = true;
      })
        .addCase(register.fulfilled,  (state, action) =>{
            state.loading = false;
            state.message =  action.payload.message;

        })
   .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

       .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
})

export default authSlice.reducer;