"use client";
import { store } from "@/redux/store";
import React, { ReactNode, useState,useEffect } from "react";

import { Provider } from "react-redux";


interface ProviderProps {
  children: ReactNode;
}
export function ReduxProvider({ children }: ProviderProps) {
  return <Provider store={store}> {children}</Provider>;
}
