class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentVideo: exampleVideoData[0],
      allVideos: exampleVideoData
      
    };
  }
  

  componentDidMount() {
    this.getVideos('cats');
  }
  
  handleListItemTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }
  
  handleSearchClick(text) {
    //SETSTATE allVideos -> getVideos --> query = text input.value
    // let query = $('.form-control').val();
    
    this.getVideos(text);
    $('.form-control').val('');
  }
  
  handleSearchType(text) {
    //SETSTATE allVideos -> getVideos --> query = text input.value
    // let query = $('.form-control').val();
    this.getVideos(text);
  }
  

  getVideos(query) {
    this.props.searchYouTube(query, (data) => {
      console.log('DATA ', data);
      this.setState({
        allVideos: data.items.slice(1),
        currentVideo: data.items[0]
      });
    });
  }
  
  render() {
    return (
      <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search listener={this.handleSearchClick.bind(this)} typingListener={this.handleSearchType.bind(this)}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.allVideos} listener={this.handleListItemTitleClick.bind(this)}/>
        </div>
      </div>
    </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App searchYouTube={window.searchYouTube} API_KEY={window.YOUTUBE_API_KEY}/>, document.getElementById('app'));

