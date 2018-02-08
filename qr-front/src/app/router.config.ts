import { UIRouter, Category } from '@uirouter/angular';
import { AuthService } from './_services/index';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  const criteriaAuth = { entering: (state) => {
      return state.protected;
  } };
  router.transitionService.onStart(criteriaAuth, requireAuthentication);
  const criteriaNewCode = { entering: (state) => {
      return state.name === 'edit';
  } };
  router.transitionService.onStart(criteriaNewCode, requireEditAuthentication);

  const criteriaUnathorizedOnly = { entering: (state) => {
      return state.data && state.data.unathorizedOnly;
  } };
  router.transitionService.onStart(criteriaUnathorizedOnly, unathorizedOnly);
  router.trace.enable(Category.TRANSITION);
};
function requireAuthentication(transition) {
  const $state = transition.router.stateService;
  const authService = transition.injector().get(AuthService);

  if (!authService.checkAuthenticated()) {
    if (!authService.user) {
      authService.userObservable.subscribe( user => {
        if (user === null) {
          $state.go('login', {}, {});
        } else if (user.uid) {
          const targetState = transition.to(),
          tarhetParams = transition.params();
          $state.go(targetState.name, tarhetParams, {});
        }
      });
      return $state.go('callback', {}, {});
    } else {
      $state.go('login', {}, {});
    }
  }
}
function requireEditAuthentication(transition) {
  const $state = transition.router.stateService;
  const authService = transition.injector().get(AuthService);
  if (!authService.checkAuthenticated() && transition.params().codeId !== 'new') {
    if (!authService.user) {
      authService.userObservable.subscribe( user => {
        if (user === null) {
          $state.go('login', {}, {});
        } else if (user.uid) {
          const targetState = transition.to(),
          tarhetParams = transition.params();
          $state.go(targetState.name, tarhetParams, {});
        }
      });
      return $state.go('callback', {}, {});
    } else {
      $state.go('login', {}, {});
    }
  }
}
function unathorizedOnly(transition) {
  const authService = transition.injector().get(AuthService);
  if (authService.checkAuthenticated()) {
    return transition.abort();
  }
}
// function titleUpdaterHook(transition){
//   let data = transition.to().data,
//   title = data && data.title ? data.title + ' - Qrdinger' : 'Qrdinger';
//   let titleService = transition.injector().get(Title);
//   titleService.setTitle(title);
// }
