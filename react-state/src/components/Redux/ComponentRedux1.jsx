import React from "react";
import { useDispatch } from "react-redux";
import { createUser, modifyUser, resetUser } from "../../redux/states/user";

function ComponentRedux1() {
  /**
   * useDispatch() - recive las acciones, las manda al store donde se reciven en el reducer y este determina que reducer en especifico se va a hacer cargo de la accion
   */
  const dispatcher = useDispatch();
  const handleClickCreate = () => {
    dispatcher(createUser({ name: "Frank", email: "frank@gmail.com" }));
  };
  const handleClickModify = () => {
    dispatcher(modifyUser({ name: "Tak", email: "frank@gmail.com" }));
  };
  const handleClickReset = () => {
    dispatcher(resetUser());
  };
  return (
    <div>
      <button onClick={handleClickCreate}>
        Enviar informacion Redux, createUser
      </button>
      <button onClick={handleClickModify}>
        Enviar informacion Redux, modifyUser
      </button>
      <button onClick={handleClickReset}>
        Enviar informacion Redux, resetUser
      </button>
    </div>
  );
}

export default ComponentRedux1;
