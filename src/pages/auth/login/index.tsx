import { useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import { Form, Formik, FormikValues } from "formik";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button";
import { authService } from "@/hooks/useAuth";
import * as Yup from "yup";
import apiService from "@/utils/apiService";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [error] = useState("");

  const initialValues = {
    username: "",
    password: "",
  }

  const schema = Yup.object().shape({
    username: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = (values: FormikValues) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    apiService.login(user).then((response) => {
      if (response?.data.token === undefined) throw new Error();

      if (response?.status === 200) {
        authService.login({ token: response?.data.token });
        navigate("/");
      }
    })
  };

  return (
    <section className={style.sectionWrapper}>
      <h2>Entre com sua conta</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <fieldset className={style.container}>
                <label>
                  <Input title="Nome de usuário" name="username" type="text" />
                </label>

                <label>
                  <Input title="Senha" name="password" type="password" />
                </label>
              </fieldset>

              {error && (
                <p style={{ color: "red" }}>Email ou senha incorretos!</p>
              )}

              <div className={style.buttons}>
                <Button
                  option="secondary"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Voltar
                </Button>
                <Button option="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
