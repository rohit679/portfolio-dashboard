import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import About from './components/About';
import Banner from './components/Banner';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Project from './components/Projects';
import Achievement from './components/Achievements';
import Contact from './components/Contact';
import SignIn from './components/Signin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/banner' exact component={Banner}/>
        <Route path='/about' exact component={About}/>
        <Route path='/skills' exact component={Skills}/>
        <Route path='/experience' exact component={Experience}/>
        <Route path='/education' exact component={Education}/>
        <Route path='/project' exact component={Project}/>
        <Route path='/achievement' exact component={Achievement}/>
        <Route path='/contact' exact component={Contact}/>
        <Route path='/logout' exact component={SignIn}/>
        <Route path='/' exact component={SignIn}/> 
        <Redirect path='/' exact/>
      </Switch>
    </Router>
  );
}

export default App;
