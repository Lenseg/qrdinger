import { UIRouter, Category } from '@uirouter/angular';
import { AuthService } from './_services/index';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  let criteriaAuth = { entering: (state) => {
      return state.protected
  } };
  router.transitionService.onStart(criteriaAuth, requireAuthentication);
  let criteriaNewCode = { entering: (state) => {
      return state.name === 'edit' && state.params.codeId.config.value !== 'new';
  } };
  router.transitionService.onStart(criteriaNewCode, requireAuthentication);

  let criteriaUnathorizedOnly = { entering: (state) => {
      return state.data && state.data.unathorizedOnly
  } };
  router.transitionService.onStart(criteriaUnathorizedOnly, unathorizedOnly);
  router.trace.enable(Category.TRANSITION);
};
function requireAuthentication(transition) {
  let $state = transition.router.stateService;
  let authService = transition.injector().get(AuthService);
  if(!authService.checkAuthenticated())
    return $state.target('login',{},{});
}
function unathorizedOnly(transition) {
  let authService = transition.injector().get(AuthService);
  if(authService.checkAuthenticated())
    return transition.abort();
}
// function titleUpdaterHook(transition){
//   let data = transition.to().data,
//   title = data && data.title ? data.title + ' - Qrdinger' : 'Qrdinger';
//   let titleService = transition.injector().get(Title);
//   titleService.setTitle(title);
// }
