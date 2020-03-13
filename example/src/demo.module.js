import angular from "angular";

import demoComponent from "./demo.component";
import needServiceComponent from "./need-service.component";

const MyAppModule = angular
  .module("myApp", [])
  .component(...demoComponent)
  .component(...needServiceComponent);

export { MyAppModule };
