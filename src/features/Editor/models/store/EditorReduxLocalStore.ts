import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch as _useDisPatch, useSelector as _useSelector } from "react-redux";
import dropdownSlice from "../../ui/components/Dropdown/model";
import dragButtonSlice from "../../ui/components/DragButton/model";

export const EditorReduxLocalStore = configureStore({
  reducer: {
    dropdown: dropdownSlice.reducer,
    dragButton: dragButtonSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({ thunk: false });

    if (process.env.NODE_ENV === "development") {
      middlewares.concat(logger);
    }

    return middlewares;
  },
});

export type EditorRootState = ReturnType<typeof EditorReduxLocalStore.getState>;
export type EditorDispatch = typeof EditorReduxLocalStore.dispatch;

export const useEditorDispatch = _useDisPatch.withTypes<EditorDispatch>();
export const useEditorSelector = _useSelector.withTypes<EditorRootState>();

 