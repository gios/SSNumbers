// SSNumbers
// version: 0.8.1;
"use strict";

require(['jquery', 'underscore', 'backbone', 'model', 'collection'], function($, _, Backbone, Model, Collection) {

	var tableCollection = new Collection.TableCollection();

	tableCollection.add(new Model.Table({
		'first': 1,
		'second': 2,
		'third': 3,
		'fourth': 4,
		'fifth': 5,
		'sixth': 6,
		'seventh': 7,
		'eighth': 8,
		'ninth': 9,
		'tenth': 10
	}));

	tableCollection.add(new Model.Table({
		'first': 11,
		'second': 12,
		'third': 13,
		'fourth': 14,
		'fifth': 15,
		'sixth': 16,
		'seventh': 17,
		'eighth': 18,
		'ninth': 19,
		'tenth': 20
	}));

	tableCollection.add(new Model.Table({
		'first': 21,
		'second': 22,
		'third': 23,
		'fourth': 24,
		'fifth': 25,
		'sixth': 26,
		'seventh': 27,
		'eighth': 28,
		'ninth': 29,
		'tenth': 30
	}));

	tableCollection.add(new Model.Table({
		'first': 31,
		'second': 32,
		'third': 33,
		'fourth': 34,
		'fifth': 35,
		'sixth': 36,
		'seventh': 37,
		'eighth': 38,
		'ninth': 39,
		'tenth': 40
	}));

	tableCollection.add(new Model.Table({
		'first': 41,
		'second': 42,
		'third': 43,
		'fourth': 44,
		'fifth': 45,
		'sixth': 46,
		'seventh': 47,
		'eighth': 48,
		'ninth': 49,
		'tenth': 50
	}));

	tableCollection.add(new Model.Table({
		'first': 51,
		'second': 52,
		'third': 53,
		'fourth': 54,
		'fifth': 55,
		'sixth': 56,
		'seventh': 57,
		'eighth': 58,
		'ninth': 59,
		'tenth': 60
	}));

	tableCollection.add(new Model.Table({
		'first': 61,
		'second': 62,
		'third': 63,
		'fourth': 64,
		'fifth': 65,
		'sixth': 66,
		'seventh': 67,
		'eighth': 68,
		'ninth': 69,
		'tenth': 70
	}));

	tableCollection.add(new Model.Table({
		'first': 71,
		'second': 72,
		'third': 73,
		'fourth': 74,
		'fifth': 75,
		'sixth': 76,
		'seventh': 77,
		'eighth': 78,
		'ninth': 79,
		'tenth': 80
	}));

	tableCollection.add(new Model.Table({
		'first': 81,
		'second': 82,
		'third': 83,
		'fourth': 84,
		'fifth': 85,
		'sixth': 86,
		'seventh': 87,
		'eighth': 88,
		'ninth': 89,
		'tenth': 90
	}));

	tableCollection.add(new Model.Table({
		'first': 91,
		'second': 92,
		'third': 93,
		'fourth': 94,
		'fifth': 95,
		'sixth': 96,
		'seventh': 97,
		'eighth': 98,
		'ninth': 99,
		'tenth': 100
	}));

	//Block right click
	document.oncontextmenu = function() {
		return false
	};

	//Create own event
	window.vent = {};
	_.extend(vent, Backbone.Events);

	//Iterator Statistic
	window.i = 0;
	window.j = 0;

	//Declare View 
	var TableView = Backbone.View.extend({
		//HTML Element
		el: 'body',

		initialize: function() {
			vent.on("TableCorrect", function() {
				i++;
				$(this.el).find("td").click(function() {
					$(this).attr("id", "correct");
					statisticView.render('correct', i);
				});
				console.log("Correct");
			}, this);
			vent.on("TableIncorrect", function() {
				j++;
				$(this.el).find("td").contextmenu(function() {
					$(this).attr("id", "incorrect");
					statisticView.render('incorrect', j);
				});
				console.log("Incorrect");
			}, this);
		},
		//Render View
		render: function() {
			var viewHtml = '<table border="1">';
			viewHtml += "<h2>SSNumbers</h2>";
			//Iterate collection
			_.each(this.collection.models, function(m) {
				var collectionHtml = '<tr><td class="number">' + m.get('first') + '</td><td class="number">' + m.get('second') +
					'</td><td class="number">' + m.get('third') + '</td><td class="number">' + m.get('fourth') +
					'</td><td class="number">' + m.get('fifth') + '</td><td class="number">' + m.get('sixth') +
					'</td><td class="number">' + m.get('seventh') + '</td><td class="number">' + m.get('eighth') +
					'</td><td class="number">' + m.get('ninth') + '</td><td class="number">' + m.get('tenth') + '</td></tr>';
				viewHtml += collectionHtml;
			});

			viewHtml += '</table>'
			//Set View 
			$(this.el).html(viewHtml);
			var i = -1;
			$(this.el).find("td").each(function(el) {
				i++;
				$(this).attr("id", "" + i);
			});
		},
		events: {
			'click .number': function() {
				vent.trigger("TableCorrect");
			},
			'contextmenu .number': function() {
				vent.trigger("TableIncorrect");
			}
		}
	});

	//Collection to App.Views.Table
	var tableView = new TableView({
		collection: tableCollection,
	});

	//Render the View 
	tableView.render();

	//Create Element for Statistics
	var statisticElement = document.createElement("div");
	$("body").append(statisticElement);
	$("div").attr("id", "statistic");

	//Statistic View
	var StatisticView = Backbone.View.extend({

		el: $("#statistic"),

		template: _.template("<strong><p>Correct Answers</p><%= correct %></strong><strong><p>Incorrect Answers</p><%= incorrect %></strong>"),

		initialize: function() {
			//this.model.set("correct", 0);
		},

		render: function(text, count) {
			this.model.set(text, count);
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Correct = " + this.model.get('correct'));
			console.log("Incorrect = " + this.model.get('incorrect'));
		}
	});

	//Collection and model to App.Views.Statistic
	var statisticView = new StatisticView({
		model: new Model.Statistic
	});

	//Render Statistic
	statisticView.render();

	// Random click :)
	$(document).ready(function() {
		var random = Math.floor(Math.random() * 100);
		console.log(random);
		$('body').find('#' + random).click();
		$('body').find('#' + random).contextmenu();
	});
});