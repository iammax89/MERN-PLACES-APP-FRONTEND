import React from "react";
import { Input } from "../../../common/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../common/util/validators";

import { Button } from "../../../common/components/FormElements/Button/Button";
import "./PlaceForm.scss";
import { useForm } from "../../../common/hooks/form-hook";

export const NewPlace: React.FC = () => {
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

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs); // send to the server;
  };

  return (
    <form className="place-form" onSubmit={formSubmitHandler}>
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
  );
};
