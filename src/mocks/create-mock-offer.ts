import {CityLocation, Offer, PlaceLocation} from '../store/offers-process/offers-process.slice.ts';
import faker from 'faker';

export const generateMockOffer = (): Offer => {
  const placeLocation: PlaceLocation = {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number(),
  };

  const cityLocation: CityLocation = {
    name: faker.address.city(),
    location: placeLocation
  };

  const offer: Offer = {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(3),
    type: faker.random.word(),
    price: faker.datatype.number(),
    city: cityLocation,
    location: placeLocation,
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.number(),
    previewImage: faker.image.imageUrl()
  };

  return offer;
};
