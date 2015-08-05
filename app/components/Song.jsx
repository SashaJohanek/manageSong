(function(React, module, undefined) {
  var Rating = require("./Rating.jsx");
  module.exports = React.createClass({
    render: function() {
      return (
        <tr>
          <td>
            <div className="col-md-3 pull-left">
              <strong>{this.props.data.artist}</strong><br />
              <small>{this.props.data.title}</small>
            </div>
            <div className="col-md-2">
              <strong>{this.props.data.month} month(s)</strong>
            </div>
            <div className="col-md-2">
              <strong>{this.props.data.registerDate}</strong>
            </div>
            <div className="col-md-4 pull-right">
              <Rating data={this.props.data} />
              <button type="button" className="btn btn-success" onClick={this.editSong}>
                <i className="fa fa-pencil"></i>
              </button>
              <button type="button" className="btn btn-danger" onClick={this.deleteSong}>
                <i className="fa fa-trash-o"></i>
              </button>              
            </div>
          </td>
        </tr> 
      );
    },
    deleteSong: function() {
      this.props.data.delete();
    }
  });
}(React, module));