import angular from 'angular';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.styl';

import components from './components/index';

angular.module('myApp', [
    components
]);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['myApp']);
});
