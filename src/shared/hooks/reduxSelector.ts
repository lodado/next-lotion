"use client";

import { useDispatch as _useDisPatch, useSelector as _useSelector } from "react-redux";

import { Dispatch, RootState } from "../interfaces";

export const useDispatch = _useDisPatch.withTypes<Dispatch>();
export const useSelector = _useSelector.withTypes<RootState>();
