import angular from 'angular';
import 'angular-mocks';

import {expect} from 'chai';

import appComponent from './app.component'

describe('app component', () => {
    let $rootScope;
    let $compile;

    beforeEach(() => {
        angular
            .module('app', [])
            .component(appComponent.name, appComponent.config);
        angular.mock.module('app');
    });

    beforeEach(angular.mock.inject((_$rootScope_, _$compile_) => {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should render app', () => {
        const scope = $rootScope.$new(true);
        const element = $compile('<app></app>')(scope);
        scope.$digest();

        const appContent = element[0].textContent;
        expect(appContent).to.be.eq('Application');
    });
});