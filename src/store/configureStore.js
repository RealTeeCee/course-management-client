import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootSaga from "./rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(logger, sagaMiddleware),
});
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
// });

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
