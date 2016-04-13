var React = require('react');
var ReactDOM = require('react-dom');

var HelloUser = React.createClass({
  // must have the render method
    // render is function that returns in parentheses
    // the html or "jsx" you'd like to render
  propTypes:{
  	name: React.PropTypes.node
  },
  render: function() {
    return (<div>
          <h1>Hello {this.props.name}!</h1>
          </div>)
  }
});

var Friends = React.createClass({
	propTypes:{
  	friends: React.PropTypes.node,
  	name: React.PropTypes.node
  },
	render: function() {
 return (<div>
 			<h3>{this.props.name}</h3>
 			<Showlist things={this.props.friends}/>
 		</div>)
	}
})

var Showlist = React.createClass({
	  propTypes:{
  	things: React.PropTypes.node
  },
	render: function () {
		var thingList = this.props.things.map(function(thing){
			return <li> {thing} </li>
		});
		return (<div>
									<ul>
										{thingList}
									</ul>
								</div>)
	}
})
ReactDOM.render( <div><HelloUser name="Dolly" / > <Friends name="Dolly" friends={['Tom','Jerry','Barry', 'Benny']}/></div>, document.getElementById('jobber'));
