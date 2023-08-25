import {screen, render} from '@testing-library/react';
import {useMap} from './use-map.ts';
import {MutableRefObject} from 'react';
import {generateMockOffer} from '../mocks/generate-mock-offer.ts';
import {Offer} from '../store/offers-process/offers-process.slice.ts';

describe('Hook: useMap', () => {
  const mockOffer = generateMockOffer(false) as Offer;

  it('returns a Map instance when called', () => {
    const expectedResult = 'works correct';
    const mapRef = {
      current: document.createElement('div'),
    } as MutableRefObject<HTMLElement | null>;

    const MockRefComponent = () => {
      const city = mockOffer.city;
      const map = useMap({mapRef, city});
      return (
        <div data-testid="map-element">{map ? 'works correct' : 'works incorrect'}</div>
      );
    };

    render(<MockRefComponent />);
    const mapElement = screen.getByTestId('map-element');

    expect(mapElement.textContent).toBe(expectedResult);
  });
});
