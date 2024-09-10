import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";

interface Props {
    isLogged: boolean;
}

export function PageDefault({ isLogged }: Props) {
    return (
        <>
            <Header isLogged={isLogged}/>

            <Outlet />

            <Footer />
        </>
    )
}