
import App from 'containers/App';
import Home from 'containers/Home';

export default [
  {
    path: '/',
    component: App,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      {
        path: 'profile',
        getIndexRoute(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, {
              component: require('containers/Profile').default
            });
          });
        }
      }
    ]
  }
];
