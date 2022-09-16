import React from "react";
import { useTakContext } from "../Context/takContext";

function ComponentContext2() {
  const { takContextValue } = useTakContext();
  return <div>El valor es: {takContextValue} </div>;
}

export default ComponentContext2;
