import { UIRouter, Category } from '@uirouter/angular';
import { AuthService } from './_services/index';
// import { Injector } from "@angular/core";
// import { MetaService } from 'ng2-ui-router-meta';
// import { requiresAuthHook } from './_global/auth.hook';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  // requiresAuthHook(transitionService);
  // let metaService: MetaService = injector.get(MetaService);
  let criteriaAuth = { entering: (state) => {
      return state.protected
  } };
  router.transitionService.onStart(criteriaAuth, requireAuthentication);
  let criteriaNewCode = { entering: (state) => {
      return state.name === 'edit' && state.params.codeId.config.value !== 'new';
  } };
  router.transitionService.onStart(criteriaNewCode, requireAuthentication);
  // router.transitionService.onStart({}, titleUpdaterHook);
  router.trace.enable(Category.TRANSITION);
};
function requireAuthentication(transition) {
  let $state = transition.router.stateService;
  let authService = transition.injector().get(AuthService);
  if(!authService.checkAuthenticated())
    return $state.target('login',{},{});
}

// function titleUpdaterHook(transition){
//   let data = transition.to().data,
//   title = data && data.title ? data.title + ' - Qrdinger' : 'Qrdinger';
//   let titleService = transition.injector().get(Title);
//   titleService.setTitle(title);
// }
