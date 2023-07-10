import {MainPage} from '../../pages/main/main-page.tsx';
import {Preferences} from '../../const.ts';

export const App = (): JSX.Element => (
  <div>
    <MainPage placesCount={Preferences.PlacesCount} />
  </div>
);


