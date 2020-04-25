import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SimpleActivity from './SimpleActivity';
import KratzyWordtz from './KratzyWordtz';
import Home from './Home';


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/spielwiese-react/" component={Home} />
    <Route path="/spielwiese-react/simpleactivity/" component={SimpleActivity} />
    <Route path="/spielwiese-react/kratzywordtz/" component={KratzyWordtz} />
  </Switch>
)

export default Main;
