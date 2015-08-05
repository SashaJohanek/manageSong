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