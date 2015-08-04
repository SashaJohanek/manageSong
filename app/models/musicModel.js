(function(_) {
  var LSService = require('../services/LSService.js'),
      data = LSService.read();
  
  var musicModel = function(song) {
    this.id = song.id || statics.counter++;
    this.title = song.title || "";
    this.artist = song.artist || "";
    this.score = song.score || 0;
  };
  
  _.extend(musicModel, statics);
  module.exports = SongModel;
}(_));