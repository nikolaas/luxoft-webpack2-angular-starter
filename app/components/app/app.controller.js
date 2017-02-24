export default class AppController {
    /* @ngInject */
    constructor($log) {
        this.name = 'Root component.';
        this.$onInit = function() {
            $log.info('Root component has been loaded.');
        };
    }
}