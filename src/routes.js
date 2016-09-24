
import App from 'containers/App';
import Home from 'containers/Home';

export default [
  {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: [
      {
        path: 'profile',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('containers/Profile').default);
          });
        }
      }
    ]
  }
];
