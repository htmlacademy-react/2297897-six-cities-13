import {describe, expect} from 'vitest';
import {InitialLoadingState, loadingProcess} from './loading-process.slice.ts';
import {
  fetchChosenOfferAction, fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  fetchOffersAction, postCommentAction
} from '../../service/api-actions.ts';

const initialLoadingState: InitialLoadingState = {
  isOffersLoading: true,
  isChosenOfferLoading: false,
  isNearbyOffersLoading: false,
  isOfferReviewsLoading: false,
  isFavoriteOffersLoading: true,
  isCommentPosting: false,
  hasError: false,
};

describe('loadingProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const initialState = initialLoadingState;
    const expectedState = initialState;

    const result = loadingProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialLoadingState;

    const result = loadingProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('"fetchOffersAction" action works correctly', () => {
    it('should return initial state with isOfferLoading and without hasError with "fetchOffersAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = initialState;

      const result = loadingProcess.reducer(initialState, fetchOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isOfferLoading and without hasError with "fetchOffersAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isOffersLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchOffersAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isOfferLoading and with hasError with "fetchOffersAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isOffersLoading: false,
        hasError: true,
      };

      const result = loadingProcess.reducer(initialState, fetchOffersAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"fetchChosenOfferAction" action works correctly', () => {
    it('should return initial state with isChosenOfferLoading with "fetchChosenOfferAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isChosenOfferLoading: true,
      };

      const result = loadingProcess.reducer(initialState, fetchChosenOfferAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isChosenOfferLoading with "fetchChosenOffersAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isChosenOfferLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchChosenOfferAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isChosenOfferLoading with "fetchChosenOffersAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isChosenOfferLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchChosenOfferAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"fetchNearbyOffersAction" action works correctly', () => {
    it('should return initial state with isNearbyOffersLoading with "fetchNearbyOffersAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isNearbyOffersLoading: true,
      };

      const result = loadingProcess.reducer(initialState, fetchNearbyOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isNearbyOffersLoading with "fetchNearbyOffersAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isNearbyOffersLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchNearbyOffersAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isNearbyOffersLoading with "fetchNearbyOffersAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isNearbyOffersLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchNearbyOffersAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"fetchOfferReviewsAction" action works correctly', () => {
    it('should return initial state with isOfferReviewsLoading with "fetchOfferReviewsAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isOfferReviewsLoading: true,
      };

      const result = loadingProcess.reducer(initialState, fetchOfferReviewsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isOfferReviewsLoading with "fetchOfferReviewsAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isOfferReviewsLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchOfferReviewsAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isOfferReviewsLoading with "fetchOfferReviewsAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isOfferReviewsLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchOfferReviewsAction.rejected);

      expect(result).toEqual(expectedState);
    });

  });
  describe('"fetchFavoriteOffersAction" action works correctly', () => {
    it('should return initial state with isFavoriteOffersLoading with "fetchFavoriteOffersAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isFavoriteOffersLoading: true,
      };

      const result = loadingProcess.reducer(initialState, fetchFavoriteOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isFavoriteOffersLoading with "fetchFavoriteOffersAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isFavoriteOffersLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchFavoriteOffersAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isFavoriteOffersLoading with "fetchFavoriteOffersAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isFavoriteOffersLoading: false,
      };

      const result = loadingProcess.reducer(initialState, fetchFavoriteOffersAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"postCommentAction" action works correctly', () => {
    it('should return initial state with isCommentPosting with "postCommentAction.pending" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isCommentPosting: true,
      };

      const result = loadingProcess.reducer(initialState, postCommentAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isCommentPosting with "postCommentAction.fulfilled" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isCommentPosting: false,
      };

      const result = loadingProcess.reducer(initialState, postCommentAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should return initial state without isCommentPosting with "postCommentAction.rejected" action', () => {
      const initialState = initialLoadingState;
      const expectedState = {
        ...initialState,
        isCommentPosting: false,
      };

      const result = loadingProcess.reducer(initialState, postCommentAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });
});
