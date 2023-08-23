import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchOffersAction} from '../../service/api-actions.ts';

export const ServerErrorPage = () => {
  const dispatch = useAppDispatch();
  const handleReloadClick = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <>
      <p className="error__text">Server is not available</p>
      <button
        onClick={handleReloadClick}
        className="replay replay--error"
        type="button"
      >
        Try again
      </button>
    </>
  );
};
