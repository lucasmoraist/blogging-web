import style from './button.module.scss'

interface Props {
    children: React.ReactNode;
    option: 'primary' | 'secondary';
    onClick?: () => void;
}

export function Button({ children, option, onClick }: Props) {
    return (
        <>
            {option === 'primary' ? (
                <button className={`${style.btn} ${style.btnPrimary}`} onClick={onClick}>{children}</button>
            ) : (
                <button className={`${style.btn} ${style.btnSecondary}`} onClick={onClick}>{children}</button>
            )}
        </>
    );
}