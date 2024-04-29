import { HOME_ROUTE } from "@constants/routes";
import { Button } from "@mui/material";

import style from './notFound.module.scss'

export const NotFound = () => {
  return (
    <div className={style.container}>
      <article className={style.notFound}>
        <h2 className={style.title}>404</h2>
        <p className={style.text}>Desculpe, <b>nós não encontramos essa página</b>. Mas não se preocupe! você pode encontrar muito mais em nossa homepage!</p>
        <Button variant="contained" href={HOME_ROUTE} >Voltar para Home</Button>
      </article>
    </div>
  );
}

export default NotFound;
