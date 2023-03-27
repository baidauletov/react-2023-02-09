import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectUserIds } from "../selectors";

export const loadUserIfNotExist = createAsyncThunk(
  "user",
  async(_, { getState, rejectWidthValue }) => {
    const userIds = selectUserIds(getState())

    if (userIds.length) {
      return rejectWidthValue(REQUEST_STATUSES.earlyLoaded)
    }

    const response = await fetch('http://localhost:3001/api/users/')

    return await response.json()
  }
)
