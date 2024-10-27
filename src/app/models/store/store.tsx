import { configureStore, createStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./PublisherSubscriber/rootSaga";
import { authReducer } from "@/entities";
import { loginDialogReducer } from "@/features";

import markTooltipSlice from "@/features/Editor/ui/components/MarkTooltip/model";
import { userDomainSlice } from "@/features/blog/domain/models";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loginDialog: loginDialogReducer,
    userDomain: userDomainSlice.reducer,
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


