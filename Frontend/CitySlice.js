import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAllCities = createAsyncThunk("cities/get", async function () {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/cities");
    if (!res.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err) {
    throw new Error(err.message || 'An unknown error occurred');
  }
});

const getCity = createAsyncThunk("city/get", async function (id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/cities/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch city with id ${id}`);
    }
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err) {
    throw new Error(err.message || 'An unknown error occurred');
  }
});

const postCity = createAsyncThunk("city/post", async function (cityobj) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityobj),
    });
    if (!res.ok) {
      throw new Error('Failed to post city');
    }
  } catch (err) {
    throw new Error(err.message || 'An unknown error occurred');
  }
});

const deleteCity = createAsyncThunk("city/delete", async function (id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/cities/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete city with id ${id}`);
    }
    return id
  } catch (err) {
    throw new Error(err.message || 'An unknown error occurred');
  }
});

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const CitySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCities.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCity = action.payload;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(postCity.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(postCity.fulfilled, (state) => {
        console.log("posted");
        state.isLoading = false;
      })
      .addCase(postCity.rejected, (state, action) => {
        state.error = action.error.message;
        state.cities.push(action.payload)
      })
      .addCase(deleteCity.pending, (state) => {
        console.log("deleting");
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteCity.fulfilled, (state,action) => {
        console.log("deleted");
        state.isLoading = false;
        state.cities = state.cities.filter(city => city.id !== action.payload);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getAllCities, getCity, postCity, deleteCity };
export default CitySlice.reducer;