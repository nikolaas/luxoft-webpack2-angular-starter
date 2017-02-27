import angular from 'angular';
import app from './app/app.component';

export default angular.module('app.components', [])
    .component(app.name, app.config)
    .name;
