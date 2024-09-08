import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataObject = createAsyncThunk(
  "data/getData",
  async ({ url, data }) => {      
    console.log(data);
    try {
      const response = await axios.get(url,{data});
      return response; 
    } catch (error) {
      throw error;
    }
  }
);
