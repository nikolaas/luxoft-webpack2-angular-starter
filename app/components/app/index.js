import angular from 'angular';
import app from './app.component';

export default angular.module('appComponent', [])
    .component(app.name, app.config)
    .name;