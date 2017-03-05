import angular from 'angular';
import app from './app.component';

angular.module('app', [])
    .component(app.name, app.config)
    .name;

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});