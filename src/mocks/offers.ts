export type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityLocation = {
  name: string;
  location: PlaceLocation;
};

export type HostInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityLocation;
  location: PlaceLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type ChosenOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostInfo;
  images: string[];
  maxAdults: number;
};
