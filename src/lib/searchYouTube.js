var searchYouTube = (query, callback) => {

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: {key: window.YOUTUBE_API_KEY, q: query, part: 'snippet', maxResults: 6},
    dataType: 'json',
  })
  .done((data) => {
    console.log('done', data);
    if (callback) {
      callback(data);
    }
  });
};

window.searchYouTube = searchYouTube;
