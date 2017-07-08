import { UIRouter, Category } from 'ui-router-ng2';

import { requiresAuthHook } from './_global/auth.hook';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  requiresAuthHook(transitionService);
  
  router.trace.enable(Category.TRANSITION);
}
