import React, { useState, useContext, Fragment } from "react";
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
import { map } from "rxjs/operators";
import Spinner from "../../../common/components/UIElements/Spinner/Spinner";
import ErrorModal from "../../../common/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { EMPTY } from "rxjs";
import { ImageUpload } from "../../../common/components/FormElements/ImageUpload/ImageUpload";
export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
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
    if (isLogin) {
      const existedUser = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      sendRequest$(
        `${process.env.REACT_APP_API_URL}/users/login`,
        "POST",
        JSON.stringify(existedUser),
        { "Content-Type": "application/json" }
      )
        .pipe(map((data) => data.response))
        .subscribe(
          (res) => login(res.userId, res.token),
          () => EMPTY
        );
    } else {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      sendRequest$(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        "POST",
        formData
      )
        .pipe(map((data) => data.response))
        .subscribe(
          (res) => login(res.userId, res.token),
          (err) => console.log(err)
        );
    }
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
          image: {
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
          image: {
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
    <Fragment>
      {<ErrorModal error={error} onClear={clearError} />}
      <Card className="authentication">
        {isLoading && <Spinner asOverlay />}
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
          {!isLogin && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please upload the image"
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
    </Fragment>
  );
};
