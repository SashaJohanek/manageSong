(function(React, module, undefined) {
  var Songs = require('./Songs.jsx'),
      SongForm = require('./SongForm.jsx');
  
  module.exports = React.createClass({
    render: function() {
      return (
        <div className="container">
          <div className="page-header">
            <h1>Rate the song <small>Like them all!</small></h1>
          </div>
          
          {alert}
          <Songs data={this.props.songs} />
          <SongForm />
        </div>
      );
    }
  });
}(React, module));