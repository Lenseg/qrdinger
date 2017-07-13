import { UIRouter, Category } from '@uirouter/angular';

import { requiresAuthHook } from './_global/auth.hook';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  requiresAuthHook(transitionService);
  
  router.trace.enable(Category.TRANSITION);
}
