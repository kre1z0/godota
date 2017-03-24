import { LOAD_VIDEO, ACTIVE_VIDEO } from '../constants/basic'

const initialTwitchState = {
  video: '',
  active: false,
}

const Video = (state = initialTwitchState, action) => {
  switch (action.type) {
    case LOAD_VIDEO:
      return {
        ...state,
        video: action.video,
      }
    case ACTIVE_VIDEO:
      return {
        ...state,
        active: action.active,
      }
    default:
      return state
  }
}

export default Video
