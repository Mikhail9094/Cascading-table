import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./instance";
import { ReportState } from "./types";
import { CreatingRowOnServer, UpdateRow } from "../../Components/Table/types";
import { reportItems } from "./constants";

export const getReport = createAsyncThunk(
  "report/getReport",
  async (route: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(route);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewRowAtReport = createAsyncThunk(
  "report/createNewRowAtReport",
  async (item: { route: string; body: CreatingRowOnServer }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post(item.route, item.body);
      dispatch(getReport(reportItems.CMP.GET_ROWS));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReport = createAsyncThunk(
  "report/updateReport",
  async (item: { route: string; rID: number; body: UpdateRow }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post(`${item.route}/${item.rID}/update`, item.body);
      dispatch(getReport(reportItems.CMP.GET_ROWS));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRowAtReport = createAsyncThunk(
  "report/deleteRowAtReport",
  async (item: { route: string; rID: number }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`${item.route}/${item.rID}/delete`);
      dispatch(getReport(reportItems.CMP.GET_ROWS));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ReportState<Response[]> = {
  dataReport: [],
  status: null,
  error: null,
};

export const reportState = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.status = "resolved";
        state.dataReport = action.payload;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
    builder
      .addCase(createNewRowAtReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createNewRowAtReport.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
    builder
      .addCase(updateReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
    builder
      .addCase(deleteRowAtReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRowAtReport.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default reportState.reducer;
