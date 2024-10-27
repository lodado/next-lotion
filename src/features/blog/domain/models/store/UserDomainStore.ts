import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LANGUAGE_LIST } from "@/shared";
import { Domain } from "../core";

export type DomainState = Domain;

// 빈 초기 값 정의
export const domainInitialState: DomainState = {
  domainId: "",
  domainName: "",
  domainLocation: "",
  userId: "",
  description: "",
  createdTime: undefined,
  language: LANGUAGE_LIST[0],
  image: "",
};

// Redux Slice
export const userDomainSlice = createSlice({
  name: "userDomainSlice",
  initialState: domainInitialState,
  reducers: {
    // Create or Set Domain
    SET_USER_DOMAIN: (state, action: PayloadAction<Domain>) => {
      state = action.payload;
    },

    // Update Domain
    UPDATE_USER_DOMAIN: (state, action: PayloadAction<Partial<Domain>>) => {
      state = { ...state, ...action.payload };
    },

    // Delete Domain
    DELETE_USER_DOMAIN: (state) => {
      state = { ...domainInitialState };
    },
  },
});

export const { SET_USER_DOMAIN, UPDATE_USER_DOMAIN, DELETE_USER_DOMAIN } = userDomainSlice.actions;
