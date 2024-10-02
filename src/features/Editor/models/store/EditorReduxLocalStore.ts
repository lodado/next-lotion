import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch as _useDisPatch, useSelector as _useSelector } from "react-redux";
import dropdownSlice from "../../ui/components/Dropdown/model";
import dragButtonSlice from "../../ui/components/DragButton/model";
import  blockCreateButtonSlice   from "../../ui/components/BlockCreateButton/model";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const createEditorReduxLocalStore = () => {
  const store = configureStore({
    reducer: {
      dropdown: dropdownSlice.reducer,
      dragButton: dragButtonSlice.reducer,
      blockCreateButton: blockCreateButtonSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);

      if (process.env.NODE_ENV === "development") {
        middlewares.concat(logger);
      }

      return middlewares;
    },
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const EditorReduxStore = createEditorReduxLocalStore();
