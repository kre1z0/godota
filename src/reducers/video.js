import { LOAD_VIDEO } from '../constants/basic'

const initialTwitchState = {
  video: '',
}

const Video = (state = initialTwitchState, action) => {
  switch (action.type) {
    case LOAD_VIDEO:
      return {
        ...state,
        video: action.video,
      }
    default:
      return state
  }
}

export default Video
