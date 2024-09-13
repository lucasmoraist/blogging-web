import { FormLogin } from './formLogin';
import style from './login.module.scss';

export function Login() {
  return (
    <section className={style.sectionWrapper}>
      <h2>Entre com sua conta</h2>
      <FormLogin />
    </section>
  );
}
