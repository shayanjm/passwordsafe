'use strict';

angular.module('passwordsafeApp', ['ngCookies', 'ngResource', 'psa.controllers', 'psa.directives', 'psa.services']);

// bundling dependencies
window.angular.module('psa.controllers', ['psa.controllers.header', 'psa.controllers.index']);
window.angular.module('psa.services', ['psa.services.global']);
