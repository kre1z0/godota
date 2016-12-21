import * as actions from '../actions/youtube'

const initialYoutubeState = {

}

const youtube = (state = initialYoutubeState, action) => {
  switch (action.type) {
    case actions.YOUTUBE_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        youtubeChannelsList: action.youtubeChannelsList,
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
        video: action.video,
      }
    case actions.YOUTUBE_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.videos,
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
        logo: action.logo,
      }
    case actions.SELECTED_YOUTUBE_CHANNEL:
      return {
        ...state,
        active: action.active,
      }
    case 'YOUTUBE_SORT_ACTIVE':
      return {
        ...state,
        selected: action.selected,
      }
    default:
      return state
  }
}

export default youtube
