import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {
  fetchChosenOfferAction, fetchFavoriteOffersAction,
  fetchNearbyOffersAction, fetchOfferReviewsAction,
  fetchOffersAction, postCommentAction
} from '../../service/api-actions.ts';

export type InitialLoadingState = {
  isOffersLoading: boolean;
  isChosenOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
  isOfferReviewsLoading: boolean;
  isFavoriteOffersLoading: boolean;
  isCommentPosting: boolean;
  hasError: boolean;
};

export const initialLoadingState: InitialLoadingState = {
  isOffersLoading: true,
  isChosenOfferLoading: false,
  isNearbyOffersLoading: false,
  isOfferReviewsLoading: false,
  isFavoriteOffersLoading: true,
  isCommentPosting: false,
  hasError: false,
};

export const loadingProcess = createSlice({
  name: NameSpace.Loaders,
  initialState: initialLoadingState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })

      .addCase(fetchChosenOfferAction.pending, (state) => {
        state.isChosenOfferLoading = true;
      })
      .addCase(fetchChosenOfferAction.fulfilled, (state) => {
        state.isChosenOfferLoading = false;
      })
      .addCase(fetchChosenOfferAction.rejected, (state) => {
        state.isChosenOfferLoading = false;
      })

      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state) => {
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = false;
      })

      .addCase(fetchOfferReviewsAction.pending, (state) => {
        state.isOfferReviewsLoading = true;
      })
      .addCase(fetchOfferReviewsAction.fulfilled, (state) => {
        state.isOfferReviewsLoading = false;
      })
      .addCase(fetchOfferReviewsAction.rejected, (state) => {
        state.isOfferReviewsLoading = false;
      })

      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })

      .addCase(postCommentAction.pending, (state) => {
        state.isCommentPosting = true;
      })
      .addCase(postCommentAction.fulfilled, (state) => {
        state.isCommentPosting = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentPosting = false;
      });
  }
});
