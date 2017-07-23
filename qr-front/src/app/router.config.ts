import { UIRouter, Category } from '@uirouter/angular';
import { AuthService } from './_services/index';
// import { requiresAuthHook } from './_global/auth.hook';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  // requiresAuthHook(transitionService);

  let criteriaAuth = { entering: (state) => {
      return state.protected
  } };
  router.transitionService.onStart(criteriaAuth, requireAuthentication);
  let criteriaNewCode = { entering: (state) => {
      return state.name === 'edit' && state.params.id !== 'new';
  } };
  router.transitionService.onStart(criteriaNewCode, requireAuthentication);
  router.trace.enable(Category.TRANSITION);
};
function requireAuthentication(transition) {
  let $state = transition.router.stateService;
  let authService = transition.injector().get(AuthService);
  if(!authService.checkAuthenticated())
    return $state.target('login',{},{});
}
