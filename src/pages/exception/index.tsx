import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import style from "./exception.module.scss";

interface Props {
  statusCode?: 500 | 404;
}

export function Exceptions({ statusCode }: Props) {
  const navigate = useNavigate();

  const response = (statusCode?: number) => {
    switch (statusCode) {
      case 404:
        return (
          <>
            <button onClick={() => navigate(-1)}>
              <ArrowLeft />
              Voltar
            </button>
            <h1>Error 404: Página não encontrada</h1>
          </>
        );
      case 500:
        return (
          <>
            <h1>Error 500: Internal Server Error</h1>
          </>
        );
      default:
        return (
          <>
            <h1>Error {statusCode}</h1>
          </>
        );
    }
  };

  return <div className={style.container}>{response(statusCode)}</div>;
}
