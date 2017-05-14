import { UIRouter, Category } from 'ui-router-core';
import { requiresAuthHook } from './global/auth.hook';
import { Visualizer } from 'ui-router-visualizer';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  requiresAuthHook(transitionService);
  router.trace.enable(Category.TRANSITION);
}
