export type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityLocation = {
  name: string;
  location: PlaceLocation;
};

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

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'https://i.pravatar.cc/300',
  },
  {
    id: 'offer-2',
    title: 'Dangerous studio in dangerous location',
    type: 'apartment',
    price: 10,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 1,
    previewImage: 'https://i.pravatar.cc/301',
  },
  {
    id: 'offer-3',
    title: 'Luxury Garage with VAZ-1337',
    type: 'apartment',
    price: 500,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: 'https://i.pravatar.cc/302',
  },
  {
    id: 'offer-4',
    title: 'Normal apartments',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'https://i.pravatar.cc/303',
  }
];
