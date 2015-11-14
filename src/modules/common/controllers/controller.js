'use strict';

module.exports = ['$scope' ,controller];
function controller($scope) {

	this.IsVisible = false;

	this.showHide = function () {

		this.IsVisible = this.IsVisible ? false : true;

	}

}

