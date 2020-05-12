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
import { ImageUpload } from "../../../common/components/FormElements/ImageUpload/ImageUpload";

const NewPlace: React.FC = () => {
  const { userId, token } = useContext(AuthContext);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      image: {
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

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("describtion", formState.inputs.describtion.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);
    console.log(formState.inputs);
    sendRequest$(`${process.env.REACT_APP_API_URL}/places`, "POST", formData, {
      Authorization: `Bearer ${token}`,
    }).subscribe(
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
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please upload the image"
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

export default NewPlace;
