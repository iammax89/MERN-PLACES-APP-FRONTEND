import React, { useState, useContext } from "react";
import { Input } from "../../../common/components/FormElements/Input/Input";
import { Button } from "../../../common/components/FormElements/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../common/util/validators";
import { useForm } from "../../../common/hooks/form-hook";
import Card from "../../../common/components/UIElements/Card/Card";
import "./AuthForm.scss";
import { AuthContext } from "../../../common/context/auth-context";
export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { login, logout } = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs); // send to the server;
    login();
  };
  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: null,
            isValid: null,
          },
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      logout();
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevState) => !prevState);
  };
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={formSubmitHandler}>
        {!isLogin && (
          <Input
            elememnt="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          elememnt="input"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          elememnt="input"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Password should be at least 6 characters long"
          onInput={inputHandler}
        />
        <Button
          onClick={() => formSubmitHandler}
          type="submit"
          disabled={!formState.isValid}
        >
          {isLogin ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLogin ? "SIGN UP" : "SIGN IN"}
      </Button>
    </Card>
  );
};
