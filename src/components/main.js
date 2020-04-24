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
    <Route path="/simpleactivity" component={SimpleActivity} />
    <Route path="/kratzywordtz" component={KratzyWordtz} />
    <Route path="/projects" component={Projects} />
    <Route path="/resume" component={Resume} />
  </Switch>
)

export default Main;
