import React, { lazy, Suspense } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const SampleContainer = lazy(() => import('../pages/Sample'));
const SampleContainer2 = lazy(() => import('../pages/Sample2'));

const history = createBrowserHistory();

const AppRouter = (
    <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={SampleContainer} />
                <Route path="/sample" component={SampleContainer2} />
            </Switch>
        </Suspense>
    </Router>
);

export { AppRouter, history };
