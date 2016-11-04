const Youtube = (state = {}, action) => {
  switch (action.type) {
    case 'YOUTUBE_CHANNEL_LIST':
      return {
        ...state,
        youtubeChannelsList: action.youtubeChannelsList
      }
    case 'YOUTUBE_CHANNEL_LIST_ERROR':
      return {
        ...state,
        youtubeChannelsListError: action.youtubeChannelsListError
      }
    case 'YOUTUBE_VIDEO':
      return {
        ...state,
        video: action.video
      }
    case 'ggwp':
      return {
        ...state,
        tt: action.tt
      }
    case 'LOAD_YOUTUBE_VIDEO':
      return {
        ...state,
        title: action.title,
        channelHref: action.channelHref,
        prevPageToken: action.prevPageToken,
        nextPageToken: action.nextPageToken,
        pid: action.pid,
        vidResults: action.vidResults
      }
    case 'LOAD_YOUTUBE_ACTIVE':
      return {
        ...state,
        active: action.active
      }
    case 'LOAD_YOUTUBE_VIDEO_TITLE':
      return {
        ...state,
        videoTitle: action.videoTitle
      }
    default:
      return state
  }
}

export default Youtube


