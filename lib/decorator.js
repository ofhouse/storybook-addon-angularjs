import angular from "angular";

import { makeDecorator } from "@storybook/addons";

import { buildElement, updateElement } from "./utils/angularjs";

const cache = {};

export default makeDecorator({
  name: "withAngularJs",
  parameterName: "ng",
  skipIfNoParametersOrOptions: true,

  wrapper: (getStory, context, { parameters, options }) => {
    const storyOptions = parameters || options;

    const { module, hooks, mock } =
      // withAngularJs("myApp") or withAngularJs(["myApp", "myOtherApp"])
      typeof storyOptions === "string" || Array.isArray(storyOptions)
        ? {
          module: storyOptions,
          hooks: undefined,
          mock: undefined,
        }
        : {
          // If module is defined in parameters use it otherwise fallback to
          // module from options
          ...storyOptions, module: parameters.module || options
        }

    const story = getStory();
    const modules = Array.isArray(module) ? module : [module];

    const { template, props = {} } = typeof story === "string" ? { template: story } : story;

    const key = context.id;

    if (!cache[key] || cache[key].template !== template) {
      const element = document.createElement("div");

      // Initialize mocked modules
      // To make them available to the
      if (mock && mock.modules) {
        mock.modules.forEach((moduleToMock) => {
          modules.unshift(angular.module(moduleToMock, []).name);
        });
      }

      // Initialize mocked providers
      // Since the providers of the last module overrides the ones of the previous modules
      // we append it to the end of the modules
      // https://stackoverflow.com/q/37094761/831465
      if (mock && mock.inject) {
        modules.push(['$provide', ($provide) => {
          angular.forEach(mock.inject, (mockedValue, key) => {
            $provide.provider(key, {
              $get: () => {
                if (typeof mockedValue === 'function') {
                  return new mockedValue();
                }

                return mockedValue;
              }
            });
          });
        }]);
      }

      angular.bootstrap(element, modules);
      cache[key] = { template, element };

      return buildElement(cache[key].element, template, props, hooks);
    }

    return updateElement(cache[key].element, props, hooks);
  },
});
