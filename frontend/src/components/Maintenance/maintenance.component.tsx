import style from "./maintenance.module.scss";
import { Button } from "@mui/material";
import { HOME_ROUTE } from "@constants/routes";
import { MaintenanceImage } from "@assets/img";

export const Maintenance = () => {
  return (
    <div className={style.container}>
      <article className={style.maintenance}>
        <img
          src={MaintenanceImage}
          alt="Carro em uma estrada com obras a frente"
        />
        <h2 className={style.title}>Página em manuntenção</h2>
        <p className={style.text}>
          Está <b>página não está disponível</b>, mas não se preocupe! Nossa
          equipe está trabalhando para traze-lá o mais rápido possível!
        </p>
        <Button variant="contained" href={HOME_ROUTE}>
          Voltar para Home
        </Button>
      </article>
    </div>
  );
};
