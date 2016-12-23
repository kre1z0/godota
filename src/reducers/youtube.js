import * as actions from '../actions/youtube'

const initialYoutubeState = {
  videos: [],
  channel_url: '',
  channels_list: [],
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
        channelId: action.channelId,
        videos: action.videos,
        channel_url: action.channel_url,
        logo: action.logo,
        nextPageToken: action.nextPageToken,
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
