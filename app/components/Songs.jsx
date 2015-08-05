(function(React, module, undefined) {
  var Song = require('./Song.jsx');
  
  module.exports = React.createClass({
    render: function() {
      var stars = [];
      return (
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>
                <div className="col-md-3">Music</div>
                <div className="col-md-2">Time Remaining</div>
                <div className="col-md-2">Date Entered</div>
                <div className="col-md-4">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(function(song) {
              return <Song key={song.id} data={song}/>;
            })}
          </tbody>
        </table>
      );
    }
  });
}(React, module));