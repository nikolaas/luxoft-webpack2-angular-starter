import angular from 'angular';
import app from './app.component';

export default angular.module('app', [])
    .component(app.name, app.config)
    .name;

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});