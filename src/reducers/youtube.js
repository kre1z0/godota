import * as actions from '../actions/youtube'

const initialYoutubeState = {
  videos: [],
  channel_url: '',
  channels_list: [],
  active: false,
}

const youtube = (state = initialYoutubeState, action) => {
  switch (action.type) {
    case actions.YOUTUBE_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        channels_list: action.channels_list,
        error: action.error,
      }
    case actions.LOAD_YOUTUBE_VIDEOS:
      return {
        ...state,
        id: action.id,
        videos: action.videos,
        nextPageToken: action.nextPageToken,
        prevPageToken: action.prevPageToken,
      }
    case actions.LOAD_YOUTUBE_LOGO_INFO:
      return {
        ...state,
        logo: action.logo,
        channel_url: action.channel_url,
      }
    case actions.SELECTED_YOUTUBE_CHANNEL:
      return {
        ...state,
        active: action.active,
      }
    default:
      return state
  }
}

export default youtube
