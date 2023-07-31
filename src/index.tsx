import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {mockOffers} from './mocks/offers.ts';
import {mockReviews} from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={mockOffers} reviews={mockReviews}/>
  </React.StrictMode>
);
