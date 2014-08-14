/*SSNumbers
	version: 0.8.1;
	Collection;
*/
"use strict";

define('collection', ['jquery', 'underscore', 'backbone', 'model'], function($, _, Backbone, Model) {

	var Model = require(Model);

	//Declaring Table Collection 
	var TableCollection = Backbone.Collection.extend({
		model: Model.Table
	});

	return {
		TableCollection: TableCollection
	};
});