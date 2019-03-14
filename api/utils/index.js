'use strict';

exports.applyMiddleware = (middlewareWrapper, router) => {
  for (const wrapper of middlewareWrapper) {
    wrapper(router);
  }
};

// NOTE: More advanced boilerplate pattern
//
// exports.appleRoutes = (routes, router) => {
//   for (const route of routes) {
//     const { method, path, handler } = route;
//     router[method](path, handler);
//   }
// };
