var React = require('react');
var Ingredients = require('./ingredients.js');
var Actions = require('../flux/actions.js');
var Assign = require('object-assign');
var Modal = require('./modal.js');
var Button = require('react-bootstrap').Button;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var Recipe = React.createClass({
    getInitialState: function() {
        return {
            showModal: false
        };
    },
    render: function() {
        return (
                <ListGroupItem
                    header={this.props.recipe.name}
                    key={this.props.recipe.id}
                >
                    <Ingredients ingredients={this.props.recipe.ingredients}/>
                    <Button onClick={this._onDelete}>delete</Button>
                    <Button onClick={this._onEdit}>Edit</Button>
                <Modal 
                    recipe={this.props.recipe}
                    showModal={this.state.showModal}
                    hideModal={this._closeModal}
                    onSubmit={this._onSubmit}
                />    
                </ListGroupItem>
        );
    },
    _onDelete: function() {
        Actions.destroyRecipe(this.props.recipe.id);
    },
    _onEdit: function() {
        this.setState({
            showModal: true
        });
    },
    _onSubmit: function(input) {
        Actions.updateRecipe(Assign({}, this.props.recipe, input));
        this.setState({showModal: false});
    },
    _closeModal: function(){
        this.setState({showModal: false});
    }
});

module.exports = Recipe;