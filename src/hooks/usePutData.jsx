import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const putData = createAsyncThunk(
  "data/putData",
  async ({ url, data }) => {
    console.log(data)
    try {
      const response = await axios.put(url, {data});
      return response;
    } catch (error) {
      throw error;
    }
  }
);
