import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {
  fetchChosenOfferAction,
  fetchNearbyOffersAction, fetchOfferReviewsAction,
  fetchOffersAction, postCommentAction
} from '../../service/api-actions.ts';

type InitialLoadingState = {
  isOffersLoading : boolean;
  isChosenOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
  isOfferReviewsLoading: boolean;
  isCommentPosting: boolean;
};

const initialLoadingState: InitialLoadingState = {
  isOffersLoading: false,
  isChosenOfferLoading: false,
  isNearbyOffersLoading: false,
  isOfferReviewsLoading: false,
  isCommentPosting: false,
};

export const loadingProcess = createSlice({
  name: NameSpace.Loaders,
  initialState: initialLoadingState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase((fetchOffersAction.fulfilled || fetchOffersAction.rejected), (state) => {
        state.isOffersLoading = false;
      })

      .addCase(fetchChosenOfferAction.pending, (state) => {
        state.isChosenOfferLoading = true;
      })
      .addCase((fetchChosenOfferAction.fulfilled || fetchChosenOfferAction.rejected), (state) => {
        state.isChosenOfferLoading = false;
      })

      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase((fetchNearbyOffersAction.fulfilled || fetchNearbyOffersAction.rejected), (state) => {
        state.isNearbyOffersLoading = false;
      })

      .addCase(fetchOfferReviewsAction.pending, (state) => {
        state.isOfferReviewsLoading = true;
      })
      .addCase((fetchOfferReviewsAction.fulfilled || fetchOfferReviewsAction.rejected), (state) => {
        state.isOfferReviewsLoading = false;
      })

      .addCase(postCommentAction.pending, (state) => {
        state.isCommentPosting = true;
      })
      .addCase(postCommentAction.fulfilled || postCommentAction.rejected, (state) => {
        state.isCommentPosting = false;
      });
  }
});
