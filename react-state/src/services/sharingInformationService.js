import { SubjectManager } from "../utilities/subject-manager";

/**
 * Cualquiera que utilice el "sharingInformationService" va a acceder al mismo canal de comunicacion
 * 
 */
export default sharingInformationService = new SubjectManager();
