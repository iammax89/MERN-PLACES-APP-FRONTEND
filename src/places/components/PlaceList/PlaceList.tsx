import React from "react";
import "./PlaceList.scss";
import { PlaceItem } from "../PlaceItem/PlaceItem";
import Card from "../../../common/components/UIElements/Card/Card";
import { IPlace } from "../../../interfaces/place.interface";
import { Button } from "../../../common/components/FormElements/Button/Button";

interface PlaceListProps {
  items: IPlace[];
  onDeletePlace: (id: string) => void;
}
export const PlaceList: React.FC<PlaceListProps> = ({
  items,
  onDeletePlace,
}) => {
  const places = items.map((place: IPlace) => (
    <PlaceItem
      key={place.id}
      id={place.id}
      image={place.imageUrl}
      title={place.title}
      describtion={place.describtion}
      address={place.address}
      creatorId={place.creator}
      coordinates={place.location}
      onDelete={onDeletePlace}
    />
  ));
  if (!items.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe add one ?</h2>
          <Button to="/places/new">SHARE PLACE</Button>
        </Card>
      </div>
    );
  }
  return <ul className="place-list">{places}</ul>;
};
