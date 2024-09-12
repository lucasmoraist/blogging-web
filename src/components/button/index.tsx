import style from './button.module.scss'

interface Props {
    children: React.ReactNode;
    option: 'primary' | 'secondary';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, option, onClick, type }: Props) {
    return (
        <>
            {option === 'primary' ? (
                <button className={`${style.btn} ${style.btnPrimary}`} type={type} onClick={onClick}>{children}</button>
            ) : (
                <button className={`${style.btn} ${style.btnSecondary}`} type={type} onClick={onClick}>{children}</button>
            )}
        </>
    );
}