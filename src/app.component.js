import template from './app.component.html';
import './app.component.styl';

let config = {
    restrict: 'E',
    template
};

let component = {
    name: 'app',
    config: config
};

export default component;

