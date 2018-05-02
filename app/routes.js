import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Welcome from './containers/WelcomeContainer';
import SuperQuiniela from './containers/SuperQuinielasContainer';
import MyQuinielas from './containers/MyQuinielasContainer';
import AllQuinielas from './containers/AllQuinielasContainer';
import CreateQuiniela from './containers/CreateQuinielasContainer';
import Quiniela from './containers/QuinielaContainer';
import Information from './components/ComponentInformation';
import Rules from './components/ComponentRules';
import Welcome from './containers/WelcomeContainer';

export default (
	<Switch>
		<Route exact path="/" component={()=>(<Welcome/>)} /> // Until I upload the Welcome
        <Route path="/quinielas" component={()=>(<AllQuinielas/>)} />
        <Route path="/mis-quinielas" component={()=>(<MyQuinielas/>)} />
        <Route path="/super" component={()=>(<SuperQuiniela/>)} />
        <Route path="/create" component={()=>(<CreateQuiniela/>)} />
        <Route path="/quiniela/:quinielaId" component={Quiniela} />
        <Route path="/info" component={Information} />
        <Route path="/rules" component={Rules} />
	</Switch>
);
