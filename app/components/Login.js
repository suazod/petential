// Include React
var React = require("react");

// Create the Header component
// Notice how Header uses React.createClass
// Notice how it uses a render function which specifies what will be displayed by the component

var Link = require("react-router").Link;

var Login = React.createClass({
  render: function() {
    return (

        <div className="pet-primary">
          <h1 className="pet-title"><span className="pet-txt">Pet</span>ential</h1>
          <h4 className="pet-title-sub">An online playground for your pets!</h4>
          <div className="pet-body home-buttons-wrapper">
            <div className="row">
              <div className="large-12 columns login-btm">
               <a className="hollow button secondary" href="/blog.html">Login</a>
                <a className="hollow button secondary" href="/blog.html">Register</a>
              </div>
            </div>

          </div>
        </div>





    );
  }
});

// Export the component back for use in other files
module.exports = Login;
