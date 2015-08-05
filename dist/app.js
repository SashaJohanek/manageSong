(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(React, _) {
  var App = require('./components/App.jsx'),
      Song = require('./models/SongModel.js');
  
  _.mixin(_.string.exports());
  
  var render = function() {
    React.render(React.createElement(App, { songs: Song.query() }), document.body);
  };
  render();
  Song.subscribe(render);
}(React, _));

},{"./components/App.jsx":2,"./models/musicModel.js":9}],2:[function(require,module,exports){
(function(React, module, undefined) {
  var Songs = require('./Songs.jsx'),
      SongForm = require('./SongForm.jsx');
  
  module.exports = React.createClass({displayName: "exports",
    render: function() {
      return (
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "page-header"}, 
            React.createElement("h1", null, "Rate the music ", React.createElement("small", null, "Like them all!"))
          ), 
          
          alert, 
          React.createElement(Songs, {data: this.props.songs}), 
          React.createElement(SongForm, null)
        )
      );
    }
  });