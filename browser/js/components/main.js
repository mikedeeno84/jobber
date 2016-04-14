var React = require('react');

var Navbar = require('./navbar')

var Main = React.createClass({
  render: function () {
    return (
    	<div><Navbar/>
	      <div className='main-container container'>
	        {this.props.children}
	      </div>
      </div>
    )
  }
});

module.exports = Main;