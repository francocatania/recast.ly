class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentVideo: exampleVideoData[0],
      allVideos: exampleVideoData
      
    };
    this.handleListItemTitleClick = this.handleListItemTitleClick.bind(this);
    console.log('hi');
    
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }
  
  handleListItemTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }
  
  handleSearchClick() {
    //SETSTATE allVideos -> getVideos --> query = text input.value
    let query = $('.form-control').val();
    this.getVideos(query);
    $('.form-control').val('');
  }

  getVideos(query, maxResults = 6) {
    //run youtube api ajax call
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      // do we need to specify "window"?
      data: {key: window.YOUTUBE_API_KEY, q: query, part: 'snippet', maxResults: maxResults},
      dataType: 'json',
      success: (data) => {
        console.log('success ', data.items);
        this.setState({
          allVideos: data.items.slice(1),
          currentVideo: data.items[0]
        });
      },
      
      error: (data) => {
        console.log('fail', data);
      }
    });
  }
  

  
  render() {
    return (
      <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search listener={this.handleSearchClick}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.allVideos} listener={this.handleListItemTitleClick}/>
        </div>
      </div>
    </div>
    );
  }
  
  
    // onClick={this.handleListItemClick.bind(this)}
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
















// let ajaxStuff = {

//   getVideos(query, maxResults = 5) {
//     //run youtube api ajax call
//     $.ajax({
//       url: 'https://www.googleapis.com/youtube/v3/search',
//       type: 'GET',
//       // do we need to specify "window"?
//       data: {key: YOUTUBE_API_KEY, q: query, part: 'snippet', maxResults},
//       dataType: 'json',
//       success: (data) => {
//         //populate videos collection with youtube api data       
//       },
//       error: function(data) {
//         console.log('fail', data);
//       }
//     });
//   },

//   getComments() {
//     //pull comments for video from youtube api
//     $.ajax({
//       url: 'https://www.googleapis.com/youtube/v3/commentThreads',
//       type: 'GET',
//       // do we need to specify "window"?
//       data: {key: YOUTUBE_API_KEY, part: 'snippet', videoId: 'id';
//       dataType: 'json',
//       success: (data) => {
//         //parse comment data 
//         this.parseComments(data.items);
//       },
//       error: function(data) {
//         console.log('fail', data);
//       }
//     });
//   },
  
//   parseComments(comments) {
//     let commentsArr = [];
//     //iterate through comments and push to comments array
//     for (let i = 0; i < comments.length; i++) {
//       commentsArr.push({author: comments[i].snippet.topLevelComment.snippet.authorDisplayName, text: comments[i].snippet.topLevelComment.snippet.textOriginal});
//     }
//   }
// }
  
