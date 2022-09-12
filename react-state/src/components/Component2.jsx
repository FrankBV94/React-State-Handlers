import React, { useEffect } from "react";
import { sharingInformationService } from "../services/sharingInformationService";

/**
 * Componente 2 escucha(subscribe) lo que pasa(data) a travez de del canal de comunicacion(sharingInformationService)
 */
export default function Component2() {
  const subscription$ = sharingInformationService.getSubject();
  useEffect(() => {
    subscription$.subscribe((data) => {
      console.log(data);
    });
  }, []);

  return <div>Component2</div>;
}
