import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingpage';
import AboutMe from './aboutme';
import Contact from './contact';
import Projects from './projects';
import Resume from './resume';
import SimpleActivity from './SimpleActivity';
import KratzyWordtz from './KratzyWordtz';
import Home from './Home';


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/spielwiese-react/" component={Home} />
    <Route exact path="/spielwiese-react/landingpage/" component={LandingPage} />
    <Route path="/spielwiese-react/simpleactivity/" component={SimpleActivity} />
    <Route path="/spielwiese-react/kratzywordtz/" component={KratzyWordtz} />
    <Route path="/spielwiese-react/projects/" component={Projects} />
    <Route path="/spielwiese-react/resume/" component={Resume} />
  </Switch>
)

export default Main;
