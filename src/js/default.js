var React = require("react");

var App = React.createClass({
  render () {
    return (
      <div>
        <ul className="list-inline text-center">
          <li>
            <a href="#" className="button button-primary">
              <img src="img/1419481024_tux.png" width="128" height="128"/>
            </a>
          </li>
          <li>
            <a href="#" className="button">
              <img src="img/1419480938_17-windows-512.png" width="128" height="128"/>
            </a>
          </li>
          <li>
            <a href="#" className="button">
              <img src="img/1419480970_16-apple-512.png" width="128" height="128"/>
            </a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = App;
