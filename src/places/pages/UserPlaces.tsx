import React, { useState, useEffect, Fragment } from "react";
import { PlaceList } from "../components/PlaceList/PlaceList";
import { IPlace } from "../../interfaces/place.interface";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../common/hooks/http-hook";
import { EMPTY } from "rxjs";
import { map } from "rxjs/operators";
import ErrorModal from "../../common/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../common/components/UIElements/Spinner/Spinner";

const UserPlaces: React.FC = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
  const userId = useParams<any>().userId;
  useEffect(() => {
    sendRequest$(
      `${process.env.REACT_APP_API_URL}/places/user/${userId}`,
      "GET"
    )
      .pipe(map((data) => data.response["userPlaces"]))
      .subscribe(
        (places: IPlace[]) => setPlaces(places),
        () => EMPTY
      );
  }, [sendRequest$, userId]);
  const deletePlaceHandler = (id: string) => {
    setPlaces((prevState) => prevState.filter((place) => place.id !== id));
  };
  return (
    <Fragment>
      {<ErrorModal error={error} onClear={clearError} />}
      {isLoading ? (
        <div className="center">
          {" "}
          <Spinner asOverlay />
        </div>
      ) : (
        <PlaceList items={places} onDeletePlace={deletePlaceHandler} />
      )}
    </Fragment>
  );
};
export default UserPlaces;
