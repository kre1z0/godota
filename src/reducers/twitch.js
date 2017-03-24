import * as actions from '../actions/twitch'

const initialTwitchState = {
  twitch: [],
  loader: false,
  imageIsVisible: false,
  image: {
    date: null,
    url: null,
  },
  active: false,
}

const Twitch = (state = initialTwitchState, action) => {
  switch (action.type) {
    case actions.LOAD_TWITCH_CHAT:
      return {
        ...state,
        chat: action.chat,
      }
    case actions.SELECTED_TWITCH_STREAMER:
      return {
        ...state,
        selected: action.selected,
      }
    case actions.LOAD_TWITCH_SUCCESS:
      return {
        ...state,
        twitch: action.twitch,
      }
    case actions.LOAD_TWITCH_IMAGE:
      return {
        ...state,
        image: action.image,
      }
    case actions.HIDE_TWITCH_IMAGE:
      return {
        ...state,
        imageIsVisible: action.imageIsVisible,
      }
    case actions.TWITCH_IMAGE_LOADER:
      return {
        ...state,
        loader: action.loader,
      }
    default:
      return state
  }
}

export default Twitch
