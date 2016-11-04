const Youtube = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_YOUTUBE_LIST':
      return {
        ...state,
        youtube: action.youtube
      }
    case 'YOUTUBE_LIST_FAILED':
      return {
        ...state,
        err: action.err
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
