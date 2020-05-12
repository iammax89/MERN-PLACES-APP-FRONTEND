import React, { useEffect, useState, Fragment, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Input } from "../../common/components/FormElements/Input/Input";
import { Button } from "../../common/components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../common/util/validators";
import "./NewPlace/PlaceForm.scss";
import { useForm } from "../../common/hooks/form-hook";
import { IPlace } from "../../interfaces/place.interface";
import { useHttpClient } from "../../common/hooks/http-hook";
import { map } from "rxjs/operators";
import { EMPTY } from "rxjs";
import Spinner from "../../common/components/UIElements/Spinner/Spinner";
import ErrorModal from "../../common/components/UIElements/ErrorModal/ErrorModal";
import { AuthContext } from "../../common/context/auth-context";

const UpdatePlace: React.FC = () => {
  const { userId, token } = useContext(AuthContext);
  const placeId = useParams<any>().placeId;
  const [identifyPlace, setIdentifyPlace] = useState<IPlace>();
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
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
  const history = useHistory();
  useEffect(() => {
    sendRequest$(`${process.env.REACT_APP_API_URL}/places/${placeId}`, "GET")
      .pipe(map((data) => data.response["place"]))
      .subscribe(
        (place: IPlace) => {
          setIdentifyPlace(place);
          setFormData(
            {
              title: {
                value: place.title,
                isValid: true,
              },
              describtion: {
                value: place.describtion,
                isValid: true,
              },
            },
            true
          );
        },
        () => EMPTY
      );
  }, [sendRequest$, placeId, setFormData]);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const editedPlace = {
      title: formState.inputs.title.value,
      describtion: formState.inputs.describtion.value,
    };
    sendRequest$(
      `${process.env.REACT_APP_API_URL}/places/${placeId}`,
      "PATCH",
      JSON.stringify(editedPlace),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    )
      .pipe(map((data) => data.response["updatedPlace"]))
      .subscribe(
        () => history.push(`/${userId}/places`),
        () => EMPTY
      );
  };
  if (!identifyPlace || isLoading) {
    return (
      <div className="center">
        <Spinner asOverlay />
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
        initialValue={identifyPlace.title}
        initialValid={true}
      />
      <Input
        id="describtion"
        elememnt="textarea"
        label="Describtion"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter at list 5 symbols."
        onInput={inputHandler}
        initialValue={identifyPlace.describtion}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );

  return (
    <Fragment>
      {<ErrorModal error={error} onClear={clearError} />}
      {!isLoading && form}
    </Fragment>
  );
};
export default UpdatePlace;
