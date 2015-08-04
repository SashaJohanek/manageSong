(function(React, _) {
  var Song = require('../models/musicModel.js');
  module.exports = React.createClass({
    render: function() {
      var disabled = this.isDisabled();
      return (
        <form role="form" onSubmit={this.addSong}>
          <div className="row">
            <div className="col-sm-5">
              <label className="sr-only" htmlFor="artist">Artist</label>
              <input type="text" className="form-control" name="artist" value={this.state.artist}
                placeholder="Name of the artist, band, ..." autofocus onChange={this.handleNewArtist} />
            </div>
            <div className="col-sm-5">
              <label className="sr-only" htmlFor="song">Song</label>
              <input type="text" className="form-control" name="song" value={this.state.title}
                placeholder="Enter the name of the song..." onChange={this.handleNewTitle} />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default form-control" disabled={disabled}>Add</button>
            </div>
          </div>
        </form>
      );
    }
  });
}(React, _));
