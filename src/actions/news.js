export const GET_NEWS = 'GET_NEWS'

export function getNews(news) {
  return (dispatch) => {
    dispatch({
      type: GET_NEWS,
      news_item: news,
    })
  }
}