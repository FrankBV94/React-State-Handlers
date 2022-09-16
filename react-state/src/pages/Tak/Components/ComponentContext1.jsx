import React from "react";
import { useTakContext } from "../Context/takContext";

function ComponentContext1() {
  const { setTakContextValue } = useTakContext();

  const handleClick = () => {
    setTakContextValue("Hola mi ciela");
  };
  return (
    <div>
      <button onClick={handleClick}>Enviar informacion por un context.</button>
    </div>
  );
}

export default ComponentContext1;
