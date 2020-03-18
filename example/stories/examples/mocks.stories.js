import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { withAngularJs } from 'storybook-addon-angularjs';

import externalApp from '../../src/external.module';

export default {
  title: 'Mocks',
  decorators: [withKnobs]
};

/**
 * Story with template and service mock
 */
export const ServiceMock = () => ({
  template: `
    <example-component
      value="aValue"
      string="{{aString}}"
      on-click="onClick(section)"
    >
      <slot-a>{{slotA}}</slot-a>
      <slot-b>
        <code>foo()</code>
      </slot-b>
    </example-component>
  `,
  props: {
    aValue: 'Some text here!',
    aString: 'This string will be interpolated...',
    onClick: action('onClick'),
    slotA: 'This will be transcluded into the component'
  }
});

class MockAppService {
  constructor() {
    console.log('[MockService] New Instance');
    this.message = 'Hi Dave!';
  }
}

ServiceMock.story = {
  // adding the decorator with module name only
  decorators: [withAngularJs(externalApp.name)],
  parameters: {
    ng: {
      mock: {
        modules: ['external.module'],
        inject: {
          AppService: MockAppService,
          TEST: 'LOL'
        }
      }
    }
  }
};
