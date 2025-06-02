import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../../Utility/firebase"; // adjust path as needed
import { onAuthStateChanged } from "firebase/auth";
import { Type } from "../../Utility/action.type"; // adjust path as needed

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. Current user:", user);
      dispatch({
        type: Type.SET_USER,
        user: user,
      });
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
