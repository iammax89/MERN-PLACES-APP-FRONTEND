import React from "react";
import { PlaceList } from "../components/PlaceList/PlaceList";
import { IPlace } from "../../interfaces/place.interface";
import { useParams } from "react-router-dom";

export const PLACES: IPlace[] = [
  {
    id: "p1",
    imageUrl:
      "https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/master/pass/BrandenburgGate_2018_GettyImages-549093677.jpg",
    title: "Brandenburg Gate",
    describtion:
      "An 18th-century neoclassical monument in Berlin, built on the orders of Prussian king Frederick William II after the temporary restoration of order during the Batavian Revolution.",
    address: "Pariser Platz, 10117 Berlin, Germany",
    creator: "u1",
    location: {
      lat: 52.5162746,
      lng: 13.3755154,
    },
  },
];

export const UserPlaces: React.FC = () => {
  const userId = useParams<any>().userId;
  const loadedPlaces: IPlace[] = PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={loadedPlaces} />;
};
