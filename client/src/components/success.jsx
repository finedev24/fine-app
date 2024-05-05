import React from "react";
import { useRegFormContext } from "../providers/RegFormProvider";
import { FcApproval } from "react-icons/fc";
import style from "../styles/Success.module.css";

function Success() {
  const [order] = useRegFormContext();

  const handleNavigate = () => {
    window.location.href = "https://finemyauto.com";
  };
  return (
    <div className={style["success-container"]}>
      <FcApproval className={style["icon"]} />
      <h1 className={style["text-main"]}>
        Tu servicio se ha agendado con éxito
      </h1>
      <p>Revisa tu bandeja de correo electrónico</p>
      <div className={style["actionPrice-button"]}>
        <button onClick={handleNavigate}>VOLVER AL SITIO WEB</button>
      </div>
    </div>
  );
}

export default Success;
