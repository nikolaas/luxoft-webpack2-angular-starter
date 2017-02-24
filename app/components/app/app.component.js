import template from './app.component.html';
import controller from './app.controller';
import './app.component.styl';

let config = {
    restrict: 'E',
    bindings: {},
    template,
    controller
};

let component = {
    name: 'app',
    config: config
};

export default component;

