import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchOffersAction} from '../../service/api-actions.ts';

export const ServerErrorPage = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <p className="error__text">Не удалось загрузить вопросы</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
};
