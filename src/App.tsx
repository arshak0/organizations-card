import React from "react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/App.scss';
import OrganizationsPage from "./components/OrganizationsPage";

function App() {
  return (
      <Provider store={store}>
        <OrganizationsPage />
      </Provider>
  );
}

export default App;
