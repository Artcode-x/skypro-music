import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "./reducers/reducers";

const store = configureStore({
  reducer: {
    tracks: tracksReducer,
  },
});

export default store;
 