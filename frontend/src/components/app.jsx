import React from 'react';
import { Route } from 'react-router-dom';

import MainContainer from './main/main_container';

const App = () => (
    <Route exact path="/" component={ MainContainer }/>
);

export default App;