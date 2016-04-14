var React = require('react');
var Navbar = React.createClass({
    render:function () {
        return(
  <nav className = "navbar navbar-static-top">
    <div className = "container">
      <ul className = "nav navbar-nav">            
        <li>George</li>
      </ul>
      <button className = "login-button">Login</button>
    </div>
  </nav>
            )
    }
})
module.exports = Navbar;