import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import ConnectionSlice from "./connectionSlice";
import RequestsSlice from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: ConnectionSlice,
    requests: RequestsSlice,
  },
});

export default appStore;
