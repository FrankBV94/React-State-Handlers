import React from "react";
import { sharingInformationService } from "../services/sharingInformationService";

export default function Component1() {
  const handledClick = () => {
    sharingInformationService.setSubject("hola");
  };
  return (
    <div>
      <button onClick={handledClick}>Enviar informacion</button>
    </div>
  );
}
