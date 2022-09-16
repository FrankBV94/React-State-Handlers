import React from "react";
import ComponentContext1 from "./Components/ComponentContext1";
import ComponentContext2 from "./Components/ComponentContext2";
import { TakProvider } from "./Context/takContext";

function Tak() {
  return (
    <div>
      <TakProvider>
        <ComponentContext1 />
        <ComponentContext2 />
      </TakProvider>
    </div>
  );
}

export default Tak;
