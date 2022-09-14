import { sharingInformationService } from "../../services/sharingInformationService.js";

function Component1() {
  const handleClick = () => {
    sharingInformationService.setSubject(true);
  };

  const handleClickNo = () => {
    sharingInformationService.setSubject(false);
  };
  return (
    <div>
      <button onClick={handleClick}>Enviar information</button>
      <button onClick={handleClickNo}>NO Enviar information</button>
    </div>
  );
}
export default Component1;
