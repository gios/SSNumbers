/*SSNumbers
	version: 1.3;
	Main;
*/
"use strict";

require(['jquery', 'underscore', 'backbone', 'model', 'collection'], function($, _, Backbone, Model, Collection) {

	var tableCollection = new Collection.TableCollection();

	for (var i = 1; i <= 100; i++) {
		tableCollection.add(new Model.Table({
			number: i
		}));
	}

	//Block right click
	document.oncontextmenu = function() {
		return false;
	};

	//Create own event
	var vent = {};
	_.extend(vent, Backbone.Events);

	//Iterator Statistic
	var counterCorrect = 0;
	var counterIncorrect = 0;

	//Declare View 
	var TableView = Backbone.View.extend({
		//HTML Element
		el: 'body',

		initialize: function() {
			vent.on("TableCorrect", function() {
				counterCorrect++;
				$(this.el).find("td").click(function() {
					if ($(this).attr("id") == 'correct' || $(this).attr("id") == 'incorrect') {
						$(this).click(function() {
							return false;
						});
						$(this).contextmenu(function() {
							return false;
						});
					} else {
						$(this).attr("id", "correct");
						statisticView.render('correct', counterCorrect);
						$(this).click(function() {
							return false;
						});
						$(this).contextmenu(function() {
							return false;
						});
						$(this).animate({
							opacity: 0.7
						}, 1000);
					}
				});
				console.log("Correct");
			}, this);
			vent.on("TableIncorrect", function() {
				counterIncorrect++;
				$(this.el).find("td").contextmenu(function() {
					if ($(this).attr("id") == 'correct' || $(this).attr("id") == 'incorrect') {
						$(this).click(function() {
							return false;
						});
						$(this).contextmenu(function() {
							return false;
						});
					} else {
						$(this).attr("id", "incorrect");
						statisticView.render('incorrect', counterIncorrect);
						$(this).click(function() {
							return false;
						});
						$(this).contextmenu(function() {
							return false;
						});
						$(this).animate({
							opacity: 0.7
						}, 1000);
					}
				});
				console.log("Incorrect");
			}, this);
		},
		//Render View
		render: function() {
			var viewHtml = '<table border="1">';
			viewHtml += "<h2>SSNumbers</h2>";
			var self = this;
			//Iterate collection
			_.each(self.collection.models, function(m, e) {
				var collectionHtml = '<td class="number">' + m.get('number') + '</td>';
				for (var j = 9; j <= self.collection.length; j += 10) {
					if (e == j) {
						collectionHtml += '<tr>';
					}
				}
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
		model: new Model.Statistic
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
			this.$el.html(this.template(this.model.toJSON()));
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

	// Random click :)
	$(document).ready(function() {
		var random = Math.floor(Math.random() * 100);
		$('body').find('#' + random).click();
		$('body').find('#' + random).contextmenu();
	});
});