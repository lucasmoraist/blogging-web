import { ErrorMessage, Field } from 'formik';
import './input.module.scss';

interface Props {
  title: string;
  name: string;
  type: string;
}

export function Input({ title, name, type }: Props) {
  return (
    <>
      <span>{title}</span>
      <Field type={type} name={name} required />
      <ErrorMessage name={name}>
        {(msg) => (
          <div style={{ marginTop: '4px', width: '260px' }}>
            <span style={{ color: 'red' }}>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
}
