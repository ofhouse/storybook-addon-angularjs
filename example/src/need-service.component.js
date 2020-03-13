const componentName = "needServiceComponent";

const component = {
  template: `
    <h1>Data froX service: {{$ctrl.data}}</h1>
  `,
  controller: class {
    constructor(globalService) {
      this.globalService = globalService;
    }
    
    $onInit() {
      this.data = this.globalService.getData();
    }
  }
};

export default [componentName, component];
