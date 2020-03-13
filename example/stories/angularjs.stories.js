import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { forModule } from "storybook-addon-angularjs";

export default {
  title: "Demo Component",
  decorators: [withKnobs]
};

export const Demo = forModule("myApp").createElement(compile => {
  const name = text("Name", "Jane");
  const someString = text("Some String", "It works too!");

  const foo = {
    bar: number("Value", 20, { range: true, min: 0, max: 30, step: 1 })
  };

  const things = array("Things", ["a", "b", "c"], ",");

  const onEvt = action("clicked");

  return compile`<demo-component name="${name}" some-string="{{${someString}}}" foo="${foo}" things="${things}" on-event="${onEvt}(item)"></demo-component>`;
});

const mocks = {
  globalService: {
    getData() {
      return 'Mocked Data!';
    }
  }
}

export const WithMocks = forModule("myApp", mocks).createElement(compile => {
  return compile`<need-service-component></need-service-component>`
})
