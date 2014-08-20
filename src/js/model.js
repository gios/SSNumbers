/*SSNumbers
	version: 1.3;
	Model;
*/
"use strict";

define('model', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	//Declaring Table Model
	var Table = Backbone.Model.extend({
		defaults: {
			number: 0
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