import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {Map} from './map.tsx';
import {Offer} from '../../store/offers-process/offers-process.slice.ts';
describe('Component: Map', () => {
  const mockOffers = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
  const mapElementId = 'map-element';
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <Map
        city={mockOffers[0].city}
        offers={mockOffers}
        selectedOfferId={mockOffers[0].id}
        isOfferPage={false}
      />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId(mapElementId)).toBeInTheDocument();
  });
});
