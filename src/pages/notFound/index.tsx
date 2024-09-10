import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import style from './not-found.module.scss';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={style.notFound}>
            <button onClick={() => navigate(-1)}>
                <ArrowLeft />
                Voltar
            </button>
            <h1>
                Error 404: Página não encontrada
            </h1>
        </div>
    );
}