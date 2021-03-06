var Search = (props) => (
  <div className="search-bar form-inline">
    <input className="form-control" type="text" onChange={(e) => props.typingListener(e.target.value)}/>
    <button className="btn hidden-sm-down" onClick={(e) => props.listener(e.target.value)}>
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div> 
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
