import {createSlice} from '@reduxjs/toolkit';
import {CITIES, MAX_REVIEWS_ON_PAGE, NameSpace} from '../../const.ts';
import {allowedSortMethods, SortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';

export type PlaceLocation = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type UserInfo = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
};

export type Review = {
    id: string;
    date: string;
    user: UserInfo;
    comment: string;
    rating: number;
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

export type City = typeof CITIES[number];

export type OfferInfo = {
    offerDetails: ChosenOffer | null;
    offerReviews: Review[];
    nearbyOffers: Offer[];
};

export type InitialOffersState = {
    offersCity: City;
    offers: Offer[];
    savedOrderOffers: Offer[];
    favoriteOffers: Offer[];
    sortMethod: allowedSortMethods;
    chosenOffer: OfferInfo;
}

export const initialOffersState: InitialOffersState = {
  offersCity: 'Paris',
  offers: [],
  savedOrderOffers: [],
  favoriteOffers: [],
  sortMethod: 'Popular',
  chosenOffer: {
    offerDetails: null,
    offerReviews: [],
    nearbyOffers: [],
  }
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState: initialOffersState,
  reducers: {
    loadOffers: (state, action: { payload: Offer[] }) => {
      state.offers = action.payload;
      state.savedOrderOffers = action.payload;
    },
    loadNearbyOffers: (state, action: { payload: Offer[] }) => {
      state.chosenOffer.nearbyOffers = action.payload;
    },
    loadChosenOffer: (state, action: { payload: ChosenOffer }) => {
      state.chosenOffer.offerDetails = action.payload;
    },
    loadOfferReviews: (state, action: { payload: Review[] }) => {
      state.chosenOffer.offerReviews = action.payload.slice(-MAX_REVIEWS_ON_PAGE).reverse();
    },
    loadFavoriteOffers: (state, action: { payload: Offer[] }) => {
      state.favoriteOffers = action.payload;
    },
    changeOffersCity: (state, action: { payload: City }) => {
      state.offersCity = action.payload;
    },
    sortOffers: (state, action: { payload: allowedSortMethods }) => {
      if(state.sortMethod !== action.payload){
        state.sortMethod = action.payload;
      }

      switch (state.sortMethod) {
        case SortMethods.ByPopularity:
          state.offers = state.savedOrderOffers;
          break;
        case SortMethods.ByPriceIncrease:
          state.offers = state.offers.sort((a, b) => a.price - b.price);
          break;
        case SortMethods.ByPriceDecrease:
          state.offers = state.offers.sort((a, b) => b.price - a.price);
          break;
        case SortMethods.ByRating:
          state.offers = state.offers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.sortMethod = SortMethods.ByPopularity;
          state.offers = state.savedOrderOffers;
      }
    }
  },
});

export const {
  loadOffers,
  loadNearbyOffers,
  loadChosenOffer,
  loadOfferReviews,
  sortOffers,
  changeOffersCity,
  loadFavoriteOffers
} = offersProcess.actions;
