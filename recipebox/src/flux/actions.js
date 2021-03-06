var WebAPIUtils = require('./WebAPIUtils.js');
var Dispatcher = require('./dispatcher.js');
var Constants = require('./constants.js');
var Assign = require('object-assign');

var actions = {
    receiveAllRecipes: function() {
        var recipes = WebAPIUtils.getAllRecipes();
        console.log(recipes);
        Dispatcher.dispatch({
            type: Constants.RECEIVE_RECIPES,
            recipes: recipes
        });
    },
    destroyRecipe: function(id) {
        WebAPIUtils.destroyRecipe(id);
        Dispatcher.dispatch({
            type: Constants.RECIPE_DESTROY,
            id: id
        });

    },
    createRecipe: function(recipe) {
        var newRecipe = WebAPIUtils.createRecipe(recipe);
        Dispatcher.dispatch(Assign({}, newRecipe, {
            type: Constants.RECIPE_CREATE
        }));
    },
    updateRecipe: function(recipe){
        WebAPIUtils.updateRecipe(recipe);
        Dispatcher.dispatch(Assign({}, {recipe: recipe}, {type: Constants.RECIPE_UPDATE}));
    }
};

module.exports = actions;