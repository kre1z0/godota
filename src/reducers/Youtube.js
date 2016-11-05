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
    case 'LOAD_YOUTUBE_VIDEO':
      return {
        ...state,
        title: action.title,
        channelHref: action.channelHref,
        prevPageToken: action.prevPageToken,
        nextPageToken: action.nextPageToken,
        pid: action.pid,
        vidResults: action.vidResults,
        video: action.video
      }
    case 'LOAD_YOUTUBE_TITLE':
      return {
        ...state,
        title: action.title,
        channelHref: action.channelHref,
      }
    case 'LOAD_YOUTUBE_LOGO':
      return {
        ...state,
        logo: action.logo
      }
    case 'LOAD_YOUTUBE_ACTIVE':
      return {
        ...state,
        active: action.active
      }
    default:
      return state
  }
}

export default Youtube


