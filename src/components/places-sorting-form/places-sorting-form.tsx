import {memo, useState} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {sortOffers} from '../../store/offers-process/offers-process.slice.ts';

export const SortMethods = {
  ByPopularity: 'Popular',
  ByPriceIncrease: 'Price: low to high',
  ByPriceDecrease: 'Price: high to low',
  ByRating: 'Top rated first',
} as const;

export type allowedSortMethods = typeof SortMethods[keyof typeof SortMethods];

const PlacesSortingForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<allowedSortMethods>(SortMethods.ByPopularity);
  const dispatch = useAppDispatch();

  const onSortFormClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const onSortMethodClick = (sortMethod: allowedSortMethods) => {
    setCurrentSort(sortMethod);
    dispatch(sortOffers(sortMethod));
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        <span>{currentSort}</span>
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          onClick={onSortFormClick}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortMethods).map((sortMethod) =>
          (
            <li
              className={`places__option ${currentSort === sortMethod ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={sortMethod}
              onClick={() => onSortMethodClick(sortMethod)}
            >
              {sortMethod}
            </li>
          )
        )}
      </ul>
    </form>
  );
};

export const MemoizedPlacesSortingForm = memo(PlacesSortingForm);
