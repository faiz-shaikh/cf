import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ManualFareUpload from './components/manualfareupload/ManualFareUpload';
import CacheConfig from './components/cacheconfig/CacheConfig';
import CheapFlightsDashboardPage from './components/cheapflightsdashboard/CheapFlightsDashboardPage';
import ManageCheapFlightPage from './components/cheapflightsdashboard/ManageCheapFlightPage'; //eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="cheapflights-dashboard" component={CheapFlightsDashboardPage} />
    <Route path="cheapflight" component={ManageCheapFlightPage} />
    <Route path="cheapflight/:id" component={ManageCheapFlightPage} />
    <Route path="cache-config" component={CacheConfig} />
    <Route path="manual-fare-upload" component={ManualFareUpload} />
  </Route>
);
