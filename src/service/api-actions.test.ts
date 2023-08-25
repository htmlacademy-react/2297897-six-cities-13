import {beforeEach, describe, expect} from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './api.ts';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../hooks/use-app-selector.ts';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch} from '../mocks/app-thunk-dispatch.ts';
import {
  checkAuthAction,
  fetchChosenOfferAction,
  fetchFavoriteOffersAction, fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  fetchOffersAction, loginAction, logoutAction, postCommentAction, setFavoriteAction
} from './api-actions.ts';
import {APIPaths} from '../const.ts';
import {extractActionsTypes, mockState} from '../mocks/mock-state.ts';
import {loadUserData} from '../store/user-process/user-process.slice.ts';
import {generateMockOffer} from '../mocks/generate-mock-offer.ts';
import {
  loadChosenOffer,
  loadFavoriteOffers,
  loadNearbyOffers,
  loadOfferReviews,
  loadOffers,
  sortOffers
} from '../store/offers-process/offers-process.slice.ts';
import {generateMockReview} from '../mocks/generate-mock-review.ts';
import {redirectToRoute} from '../store/action.ts';
import * as tokenStorage from './token.ts';

describe('Async Actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  const mockOffers = Array.from({length: 3}, () => generateMockOffer(false));
  const mockChosenOffer = generateMockOffer(true);
  const mockReviews = Array.from({length: 3}, () => generateMockReview());
  const mockUserData = {login: 'same@gmail.com', password: '1sBitrix'};

  beforeEach(() => {
    store = mockStoreCreator(mockState);
  });

  describe('"checkAuthAction" action works correct', () => {
    it('should dispatch "checkAuthAction.pending", "loadUserData", "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIPaths.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        loadUserData.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuthAction.pending", "checkAuthAction.rejected" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIPaths.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('"fetchOffersAction" action works correct', () => {
    it('should dispatch "fetchOffersAction.pending", "loadOffers", "sortOffers", "fetchOffersAction.fulfilled" with thunk "fetchOffersAction"', async () => {
      const responseOffers = mockOffers;
      mockAxiosAdapter.onGet(APIPaths.Offers).reply(200, responseOffers);
      await store.dispatch(fetchOffersAction());

      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchOffersActionFulfilled = dispatchedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        loadOffers.type,
        sortOffers.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(responseOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" with thunk "fetchOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIPaths.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('"fetchChosenOfferAction" action works correct', () => {
    it('should dispatch "fetchChosenOfferAction.pending", "loadChosenOffer", "fetchChosenOffer.fulfilled" with thunk "fetchChosenOfferAction"', async () => {
      mockAxiosAdapter.onGet(`${APIPaths.Offers}/${mockChosenOffer.id}`).reply(200, mockChosenOffer);

      await store.dispatch(fetchChosenOfferAction(mockChosenOffer.id));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchChosenOfferActionFulfilled = dispatchedActions.at(1) as ReturnType<typeof fetchChosenOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchChosenOfferAction.pending.type,
        loadChosenOffer.type,
        fetchChosenOfferAction.fulfilled.type,
      ]);

      expect(fetchChosenOfferActionFulfilled.payload).toEqual(mockChosenOffer);
    });

    it('should dispatch "fetchChosenOfferAction.pending" and "fetchChosenOffer.rejected" with thunk "fetchChosenOfferAction"', async () => {
      mockAxiosAdapter.onGet(`${APIPaths.Offers}/${mockChosenOffer.id}`).reply(400);

      await store.dispatch(fetchChosenOfferAction(mockChosenOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchChosenOfferAction.pending.type,
        fetchChosenOfferAction.rejected.type,
      ]);
    });
  });

  describe('"fetchFavoriteOffersAction" action works correct', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "loadFavoriteOffers", "fetchFavoriteOffersAction.rejected" with thunk "fetchFavoriteOffersAction"', async () => {
      const responseFavoriteOffers = mockOffers;
      mockAxiosAdapter.onGet(APIPaths.Favorite).reply(200, responseFavoriteOffers);

      await store.dispatch(fetchFavoriteOffersAction());
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchFavoriteOffersActionFulfilled = dispatchedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        loadFavoriteOffers.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(responseFavoriteOffers);
    });

    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.rejected" with thunk "fetchFavoriteOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIPaths.Favorite).reply(400);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });

  describe('"fetchOfferReviewsAction" action works correct', () => {
    it('should dispatch "fetchOfferReviewsAction.pending", "loadOfferReviews", "fetchOfferReviewsAction.fulfilled" with thunk "fetchOfferReviewsAction"', async () => {
      const offerId = mockChosenOffer.id;
      const responseReviews = mockReviews;
      mockAxiosAdapter.onGet(`${APIPaths.Comments}/${offerId}`).reply(200, responseReviews);

      await store.dispatch(fetchOfferReviewsAction(offerId));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchOfferReviewsActionFulfilled = dispatchedActions.at(1) as ReturnType<typeof fetchOfferReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        loadOfferReviews.type,
        fetchOfferReviewsAction.fulfilled.type,
      ]);

      expect(fetchOfferReviewsActionFulfilled.payload).toEqual(responseReviews);
    });

    it('should dispatch "fetchOfferReviewsAction.pending" and "fetchOfferReviewsAction.rejected" with thunk "fetchOfferReviewsAction"', async () => {
      const offerId = mockChosenOffer.id;
      mockAxiosAdapter.onGet(`${APIPaths.Comments}/${offerId}`).reply(400);

      await store.dispatch(fetchOfferReviewsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.rejected.type,
      ]);
    });
  });

  describe('"fetchNearbyOffersAction" action works correct', () => {
    it('should dispatch "fetchNearbyOffersAction.pending", "loadNearbyOffers", "fetchNearbyOffersAction.fulfilled" with thunk "fetchNearbyOffersAction"', async () => {
      const offerId = mockChosenOffer.id;
      const responseNearbyOffers = mockOffers;
      mockAxiosAdapter.onGet(`${APIPaths.Offers}/${offerId}/nearby`).reply(200, responseNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(offerId));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchNearbyOffersActionFulfilled = dispatchedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        loadNearbyOffers.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);

      expect(fetchNearbyOffersActionFulfilled.payload).not.toBe(undefined);
    });

    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.rejected" with thunk "fetchNearbyOffersAction"', async () => {
      const offerId = mockChosenOffer.id;
      mockAxiosAdapter.onGet(`${APIPaths.Offers}/${offerId}/nearby`).reply(400);

      await store.dispatch(fetchNearbyOffersAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });

  describe('"setFavoriteAction" action works correct', () => {
    it('dispatches works correctly with thunk "setFavoriteAction"', async () => {
      const {id, isFavorite} = mockOffers[0];
      mockAxiosAdapter.onPost(`${APIPaths.Favorite}/${id}/${Number(!isFavorite)}`).reply(200);
      mockAxiosAdapter.onGet(APIPaths.Offers).reply(200);
      mockAxiosAdapter.onGet(APIPaths.Favorite).reply(200);

      await store.dispatch(setFavoriteAction({id, isFavorite}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        setFavoriteAction.pending.type,

        fetchFavoriteOffersAction.pending.type,
        loadFavoriteOffers.type,
        fetchFavoriteOffersAction.fulfilled.type,

        fetchOffersAction.pending.type,
        loadOffers.type,
        sortOffers.type,
        fetchOffersAction.fulfilled.type,

        setFavoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "setFavoriteAction.pending", "setFavoriteAction.rejected" with thunk "setFavoriteAction"', async () => {
      const {id, isFavorite} = mockOffers[0];
      mockAxiosAdapter.onPost(`${APIPaths.Favorite}/${id}/${Number(!isFavorite)}`).reply(400);

      await store.dispatch(setFavoriteAction({id, isFavorite}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        setFavoriteAction.pending.type,
        setFavoriteAction.rejected.type,
      ]);
    });
  });

  describe('"loginAction" actions works correct', () => {
    it('dispatches works correct with thunk "loginAction"', async () => {
      const injectedUserData = mockUserData;
      const testToken = {token: '1337'};
      mockAxiosAdapter.onPost(APIPaths.Login).reply(200, testToken);

      await store.dispatch(loginAction(injectedUserData));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        redirectToRoute.type,
        checkAuthAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with received token', async () => {
      const injectedUserData = mockUserData;
      const testToken = {token: '1337'};
      mockAxiosAdapter.onPost(APIPaths.Login).reply(200, testToken);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(injectedUserData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(testToken.token);
    });
  });

  describe('"logoutAction" action works correct', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIPaths.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIPaths.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('"postCommentAction" action works correct', () => {
    it('should dispatch "postCommentAction.pending" and "postCommentAction.fulfilled" with thunk "postCommentAction"', async () => {
      const mockComment = {rating: 3, description: 'test description', offerId: '1725fx'};
      mockAxiosAdapter.onPost(`${APIPaths.Comments}/${mockComment.offerId}`).reply(200);

      await store.dispatch(postCommentAction(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postCommentAction.pending" and "postCommentAction.rejected" with thunk "postCommentAction"', async () => {
      const mockComment = {rating: 3, description: 'test description', offerId: '1725fx'};
      mockAxiosAdapter.onPost(`${APIPaths.Comments}/${mockComment.offerId}`).reply(400);

      await store.dispatch(postCommentAction(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.rejected.type,
      ]);
    });
  });
});
