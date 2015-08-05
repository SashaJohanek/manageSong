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
}(React, module));
},{"./SongForm.jsx":7,"./Songs.jsx":8}],3:[function(require,module,exports){
(function(React) {
  var RatingStar = require('./RatingStar.jsx');
  module.exports = React.createClass({displayName: "exports",
    getInitialState: function() {
      return {
        song: this.props.data,
        max: 5,
        hoverIndex: -1
      };
    },
    hoverStar: function(index) {
      this.setState(_.extend(this.state, {
        hoverIndex: index
      }));
    },
    leaveStar: function() {
      this.setState(_.extend(this.state, {
        hoverIndex: -1
      }));
    },
    render: function() {
      var stars = [];
      for (var idx = 1; idx <= this.state.max; idx++) {
        var fill = idx <= this.props.data.score;
        var hover = idx <= this.state.hoverIndex;
        stars.push(React.createElement(RatingStar, {fill: fill, index: idx, data: this.props.data, hoverFill: hover, hover: this.hoverStar, leave: this.leaveStar}));
      }
      return (
        React.createElement("div", {className: "rating pull-left"}, 
          stars
        )
      );
    }
  })
}(React));
},{"./RatingStar.jsx":4}],4:[function(require,module,exports){
(function(React) {
  module.exports = React.createClass({displayName: "exports",
    setScore: function(event) {
      this.props.data.score = this.props.index;
      this.props.data.save();
      
      event.preventDefault();
    },
    getClasses: function() {
      var classes = ['fa'];
      if (this.props.fill || this.props.hoverFill) {
        classes.push('fa-star');
      } else {
        classes.push('fa-star-o');
      }
      if (this.props.hoverFill) {
        classes.push('rating-highlight')
      } else {
        classes.push('rating-normal');
      }
      return classes;
    },
    hoverStar: function() {
      this.props.hover(this.props.index);
    },
    leaveStar: function() {
      this.props.leave(this.props.index);
    },
    render: function() {
      var starClasses = this.getClasses().join(' ');
      return (
        React.createElement("a", {onClick: this.setScore, onMouseOver: this.hoverStar, onMouseLeave: this.leaveStar, href: "#"}, 
          React.createElement("i", {className: starClasses})
        )
      );
    }
  });
}(React));
},{}],5:[function(require,module,exports){
(function(React, module, undefined) {
  var Rating = require("./Rating.jsx");
  module.exports = React.createClass({displayName: "exports",
    render: function() {
      return (
        React.createElement("tr", null, 
          React.createElement("td", null, 
            React.createElement("div", {className: "col-md-3 pull-left"}, 
              React.createElement("strong", null, this.props.data.artist), React.createElement("br", null), 
              React.createElement("small", null, this.props.data.title)
            ), 
            React.createElement("div", {className: "col-md-2"}, 
              React.createElement("strong", null, this.props.data.month, " month(s)")
            ), 
            React.createElement("div", {className: "col-md-2"}, 
              React.createElement("strong", null, this.props.data.registerDate)
            ), 
            React.createElement("div", {className: "col-md-4 pull-right"}, 
              React.createElement(Rating, {data: this.props.data}), 
              React.createElement("button", {type: "button", className: "btn btn-success", onClick: this.editSong}, 
                React.createElement("i", {className: "fa fa-pencil"})
              ), 
              React.createElement("button", {type: "button", className: "btn btn-danger", onClick: this.deleteSong}, 
                React.createElement("i", {className: "fa fa-trash-o"})
              )
            )
          )
        ) 
      );
    },
    deleteSong: function() {
      this.props.data.delete();
    }
  });
}(React, module));
},{}],7:[function(require,module,exports){
(function(React, _) {
  var Song = require('../models/SongModel.js');
  module.exports = React.createClass({displayName: "exports",
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
        React.createElement("form", {role: "form", onSubmit: this.addSong}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-sm-3"}, 
              React.createElement("label", {className: "sr-only", htmlFor: "artist"}, "Artist"), 
              React.createElement("input", {type: "text", className: "form-control", name: "artist", value: this.state.artist, 
                placeholder: "Name of the artist, band, ...", autofocus: true, onChange: this.handleNewArtist})
            ), 
            React.createElement("div", {className: "col-sm-3"}, 
              React.createElement("label", {className: "sr-only", htmlFor: "song"}, "Song"), 
              React.createElement("input", {type: "text", className: "form-control", name: "song", value: this.state.title, 
                placeholder: "Enter the name of the music...", onChange: this.handleNewTitle})
            ), 
            React.createElement("div", {className: "col-sm-4"}, 
              React.createElement("label", {className: "sr-only", htmlFor: "month"}), 
              React.createElement("input", {type: "text", className: "form-control", name: "month", value: this.state.month, 
                placeholder: "Enter the time range of the music...", onChange: this.handleNewMonth})
            ), 
            React.createElement("div", {className: "col-sm-2"}, 
              React.createElement("button", {type: "submit", className: "btn btn-default form-control", disabled: disabled}, "Add")
            )
          )
        )
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