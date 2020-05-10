import React, { useContext, Fragment } from "react";
import { Input } from "../../../common/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../common/util/validators";

import { Button } from "../../../common/components/FormElements/Button/Button";
import "./PlaceForm.scss";
import { useForm } from "../../../common/hooks/form-hook";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { AuthContext } from "../../../common/context/auth-context";
import { EMPTY } from "rxjs";
import Spinner from "../../../common/components/UIElements/Spinner/Spinner";
import ErrorModal from "../../../common/components/UIElements/ErrorModal/ErrorModal";
import { useHistory } from "react-router-dom";

export const NewPlace: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      describtion: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newPlace = {
      title: formState.inputs.title.value,
      describtion: formState.inputs.describtion.value,
      address: formState.inputs.address.value,
      creator: userId,
    };
    sendRequest$(
      "http://localhost:5000/api/places",
      "POST",
      JSON.stringify(newPlace),
      { "Content-Type": "application/json" }
    ).subscribe(
      () => history.push(`/${userId}/places`),
      () => EMPTY
    );
  };

  return (
    <Fragment>
      {<ErrorModal error={error} onClear={clearError} />}

      <form className="place-form" onSubmit={formSubmitHandler}>
        {isLoading && <Spinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          elememnt="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="describtion"
          label="Describtion"
          elememnt="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at list 5 symbols."
          onInput={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          elememnt="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};
