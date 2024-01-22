import { configureStore } from "@reduxjs/toolkit";

import report from "./reportTable";

export const store = configureStore({
  reducer: {
    report,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
