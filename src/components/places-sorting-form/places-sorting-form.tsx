import {memo, useState} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {sortOffers} from '../../store/offers-process/offers-process.slice.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getSortMethod} from '../../store/offers-process/offers-process.selectors.ts';

export const SortMethods = {
  ByPopularity: 'Popular',
  ByPriceIncrease: 'Price: low to high',
  ByPriceDecrease: 'Price: high to low',
  ByRating: 'Top rated first',
} as const;

export type allowedSortMethods = typeof SortMethods[keyof typeof SortMethods];

export const PlacesSortingForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentSortMethod = useAppSelector(getSortMethod);
  const [currentSort, setCurrentSort] = useState<allowedSortMethods>(currentSortMethod);
  const dispatch = useAppDispatch();

  const handleSortFormClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSortMethodClick = (sortMethod: allowedSortMethods) => {
    setCurrentSort(sortMethod);
    dispatch(sortOffers(sortMethod));
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      data-testid="places-sorting-form-element"
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        <span data-testid="current-sort-element">{currentSort}</span>
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          onClick={handleSortFormClick}
          data-testid="places-sorting-arrow-element"
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
              onClick={() => handleSortMethodClick(sortMethod)}
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
