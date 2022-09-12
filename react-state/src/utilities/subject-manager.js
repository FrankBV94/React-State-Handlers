import { Subject } from "rxjs";

/**
 * Para compartir eventos entre componentes pequeños
 */

/**
 * Los "Subject" pueden enviar y recibir informacion porque son "Observables" y "Observers' al mismo tiempo
 */
export class SubjectManager {
  subject$ = new Subject();
  /**
   * Devuelve el subject como un simple observable para no romper el encapsulamiento
   * Si se devuelve "subject" se puede ejecutar subject.next(data) para enviar informacion fuera de los
   * metodos definidos por la clase(encapsulamiento)
   * Solo lee informacion
   *
   */
  getSubject() {
    return this.subject$.asObservable();
  }

  /**
   * Solo envia informacion
   */
  setSubject(value) {
    this.subject$.next(value);
  }
}
