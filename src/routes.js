import Layout from 'containers/Layout';
import Home from 'containers/Home';

const routes = [
  {
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
      {
        path: 'profile',
        getComponent(nextState, cb) {
          import('containers/Profile').then(module => {
            cb(null, module.default);
          });
        }
      },
      {
        path: 'repositories',
        getComponent(nextState, cb) {
          import('containers/Repositories').then(module => {
            cb(null, module.default);
          });
        }
      }
    ]
  }
];

export default routes;
