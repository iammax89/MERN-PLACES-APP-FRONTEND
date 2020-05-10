import React, { useState, Fragment, useContext } from "react";
import "./PlaceItem.scss";
import Card from "../../../common/components/UIElements/Card/Card";
import { Button } from "../../../common/components/FormElements/Button/Button";
import { Modal } from "../../../common/components/UIElements/Modal/Modal";
import { Map } from "../../../common/components/UIElements/Map/Map";
import { AuthContext } from "../../../common/context/auth-context";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { EMPTY } from "rxjs";
import ErrorModal from "../../../common/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../common/components/UIElements/Spinner/Spinner";

interface PlaceItemProps {
  key: string;
  id: string;
  image: string;
  title: string;
  describtion: string;
  address: string;
  creatorId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  onDelete: (id: string) => void;
}
export const PlaceItem: React.FC<PlaceItemProps> = ({
  id,
  image,
  title,
  address,
  describtion,
  coordinates,
  creatorId,
  onDelete,
}) => {
  const [showGoogleMap, setShowGoogleMap] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
  const confirmDeleteHandler = () => {
    setShowConfirm(false);
    sendRequest$(`http://localhost:5000/api/places/${id}`, "DELETE").subscribe(
      () => onDelete(id),
      () => EMPTY
    );
  };
  const { userId } = useContext(AuthContext);
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showGoogleMap}
        onCancel={() => setShowGoogleMap(false)}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => setShowGoogleMap(false)}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        header="Confirm Action"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={() => setShowConfirm(false)}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              CONFIRM
            </Button>
          </Fragment>
        }
      >
        <p>Are you sure you want to proceed and delete the place ?</p>
      </Modal>
      <li className="list-item">
        <Card className="place-item__content">
          {isLoading && <Spinner asOverlay />}
          <div className="place-item__image">
            <img src={`${image}`} alt={`${title}`} />
          </div>
          <div className="place-item__info">
            {title}
            {address}
            {describtion}
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => setShowGoogleMap(true)}>
              VIEW ON MAP
            </Button>
            {creatorId === userId && (
              <Fragment>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={() => setShowConfirm(true)}>
                  DELETE
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};
