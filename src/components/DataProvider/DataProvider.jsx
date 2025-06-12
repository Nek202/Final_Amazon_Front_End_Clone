import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../../Utility/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Type } from "../../Utility/action.type";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: Type.SET_USER,
        user: user,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
