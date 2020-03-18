// Example module which requests an module from a higher order app
import angular from "angular";

import myApp from './app.module';

export default angular.module("myApp.external", [myApp.name, 'external.module']);