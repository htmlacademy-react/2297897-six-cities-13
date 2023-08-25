import {
  ChosenOffer,
  CityLocation,
  HostInfo,
  Offer,
  PlaceLocation
} from '../store/offers-process/offers-process.slice.ts';
import faker from 'faker';

export const generateMockOffer = (inDetails: boolean): Offer | ChosenOffer => {
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
    previewImage: faker.datatype.string()
  };

  if(inDetails){
    const hostInfo: HostInfo = {
      name: faker.name.findName(),
      avatarUrl: faker.internet.avatar(),
      isPro: faker.datatype.boolean(),
    };

    const offerDetails = {
      description: faker.lorem.paragraph(),
      bedrooms: faker.datatype.number(),
      goods: faker.lorem.words().split(' '),
      host: hostInfo,
      images: Array.from({length: 3},() => faker.datatype.string()),
      maxAdults: faker.datatype.number(10),
    };
    const chosenOffer: ChosenOffer = Object.assign(offer, offerDetails);
    return chosenOffer;
  }

  return offer;
};
