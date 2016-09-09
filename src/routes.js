
import App from 'containers/App';
import Home from 'containers/Home';

export default [
  {
    path: '/',
    component: App,
    childRoutes: [
      {
        path: '',
        getIndexRoute(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, {
              component: require('containers/Home').default
            });
          });
        }
      },
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
