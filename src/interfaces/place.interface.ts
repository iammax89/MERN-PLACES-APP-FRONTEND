export interface IPlace {
  id: string;
  imageUrl: string;
  title: string;
  describtion: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}
