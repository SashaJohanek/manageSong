(function(React, _) {
  var Song = require('../models/SongModel.js');
  module.exports = React.createClass({
    isDisabled:  function() {
      return _.isBlank(this.state.artist) || _.isBlank(this.state.title);
    },
    handleNewArtist: function(event) {
      this.setState(_.extend(this.state, {
        artist: event.target.value
      }));
    },
    handleNewTitle: function(event) {
      this.setState(_.extend(this.state, {
        title: event.target.value
      }));
    },
    handleNewMonth: function(event) {
      this.setState(_.extend(this.state, {
        month: event.target.value
      }));
    },
    addSong: function(event) {
      var song = new Song(this.state);
      song.save();
      this.setState(this.getInitialState());

      event.preventDefault();
      event.stopPropagation();
    },
    render: function() {
      var disabled = this.isDisabled();
      return (
        <form role="form" onSubmit={this.addSong}>
          <div className="row">
            <div className="col-sm-3">
              <label className="sr-only" htmlFor="artist">Artist</label>
              <input type="text" className="form-control" name="artist" value={this.state.artist}
                placeholder="Name of the artist, band, ..." autofocus onChange={this.handleNewArtist} />
            </div>
            <div className="col-sm-3">
              <label className="sr-only" htmlFor="song">Song</label>
              <input type="text" className="form-control" name="song" value={this.state.title}
                placeholder="Enter the name of the music..." onChange={this.handleNewTitle} />
            </div>
            <div className="col-sm-4">
              <label className="sr-only" htmlFor="month"></label>
              <input type="text" className="form-control" name="month" value={this.state.month}
                placeholder="Enter the time range of the music..." onChange={this.handleNewMonth} />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default form-control" disabled={disabled}>Add</button>
            </div>
          </div>
        </form>
      );
    },
    getInitialState: function() {
      return {
        artist: "",
        title: "",
        month: ""
      };
    }
  });
}(React, _));
