import { FormRegister } from './formRegister';
import style from './register.module.scss';

export function Register() {
  return (
    <section className={style.sectionWrapper}>
      <h2>Crie sua conta</h2>
      <FormRegister />
    </section>
  );
}
