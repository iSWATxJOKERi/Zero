import React from 'react';
import { Route } from 'react-router-dom';

import MainContainer from './main/main_container';

const App = () => (
    <section className="application">
        <Route exact path="/" component={ MainContainer }/>
    </section>
);

export default App;