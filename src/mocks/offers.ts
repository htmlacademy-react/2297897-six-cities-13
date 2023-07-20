export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
      name: string;
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      };
    };
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
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
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
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
      name: 'Brussels',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 60.35514938496378,
      longitude: 4.673877537499948,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 48.35514938496378,
      longitude: 2.673877537499948,
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
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 56.35514938496378,
      longitude: 6.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'https://i.pravatar.cc/303',
  }
];
