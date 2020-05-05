import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PLACES } from "./UserPlaces";
import { Input } from "../../common/components/FormElements/Input/Input";
import { Button } from "../../common/components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../common/util/validators";
import "./NewPlace/PlaceForm.scss";
import { useForm } from "../../common/hooks/form-hook";
import Card from "../../common/components/UIElements/Card/Card";

export const UpdatePlace: React.FC = () => {
  const placeId = useParams<any>().placeId;
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      describtion: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const identifyPlace = PLACES.find((place) => (place.id = placeId));

  useEffect(() => {
    if (identifyPlace) {
      setFormData(
        {
          title: {
            value: identifyPlace?.title,
            isValid: true,
          },
          describtion: {
            value: identifyPlace?.describtion,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }
  }, [identifyPlace, setFormData]);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };
  if (!identifyPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a place!</h2>
        </Card>
      </div>
    );
  }
  const form: JSX.Element = (
    <form className="place-form" onSubmit={formSubmitHandler}>
      <Input
        id="title"
        elememnt="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="describtion"
        elememnt="textarea"
        label="Describtion"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter at list 5 symbols."
        onInput={inputHandler}
        initialValue={formState.inputs.describtion.value}
        initialValid={formState.inputs.describtion.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
  const loading: JSX.Element = <div className="center">Loading...</div>;
  return !isLoading ? form : loading;
};
