/*SSNumbers
	version: 1.2;
	Model;
*/
"use strict";

define('model', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	//Declaring Table Model
	var Table = Backbone.Model.extend({
		defaults: {
			first: 1,
			second: 2,
			third: 3,
			fourth: 4,
			fifth: 5,
			sixth: 6,
			seventh: 7,
			eighth: 8,
			ninth: 9,
			tenth: 10
		}
	});

	var Statistic = Backbone.Model.extend({
		defaults: {
			'correct': 0,
			'incorrect': 0
		}
	});

	return {
		Table: Table,
		Statistic: Statistic
	};
});