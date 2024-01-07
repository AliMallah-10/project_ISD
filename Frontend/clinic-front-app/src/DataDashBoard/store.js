import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import userReducer from "./UserSlice";
import alertSlice from "./alertSlice";
// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, userReducer, alertSlice);
export default configureStore({
  reducer: {
    // alerts: alertSlice.reducer,
    // user: userSlice.reducer,
    user: userReducer,
    alerts: alertSlice,
  },
});
// export const store = configureStore({
//   reducer: {
//     user: persistedReducer,
// user: userReducer,
//     alerts: alertSlice,
//     // Add other reducers here if needed
//   },
// });

// export const persistor = persistStore(store);
