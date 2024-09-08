import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk(
  "data/getData",
  async ({ url }) => {       
    console.log(url)
    try {
      const response = await axios.get(url);
      return response; 
    } catch (error) {
      throw error;
    }
  }
);
