// "use strict";
// var auth_service_1 = require("../_services/auth.service");
// function requiresAuthHook(transitionService) {
//     var requiresAuthCriteria = {
//         to: function (state) { return state.data && state.data.requiresAuth; }
//     };
//     var redirectToLogin = function (transition) {
//         var authService = transition.injector().get(auth_service_1.AuthService);
//         var $state = transition.router.stateService;
//         if (!authService.isAuthenticated()) {
//             return $state.target('login', undefined, { location: false });
//         }
//     };
//     transitionService.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });
// }
// exports.requiresAuthHook = requiresAuthHook;
