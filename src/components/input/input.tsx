import { ErrorMessage, Field } from "formik";
import style from "./input.module.scss";

interface Props {
  title: string;
  name: string;
  type: string;
  placeholder?: string;
}

export function Input({ title, name, type, placeholder }: Props): JSX.Element {
  return (
    <div className={style.inputComponent}>
      <span>{title}</span>
      <Field type={type} name={name} placeholder={placeholder} required />
      <ErrorMessage name={name}>
        {(msg) => (
          <div style={{ marginTop: "4px", width: "260px" }}>
            <span style={{ color: "red" }}>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
}
