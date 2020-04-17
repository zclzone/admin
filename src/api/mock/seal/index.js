const { Seal_Stamped_Data } = require('./data.json')

export default [
  {
    url: '/seal/getSealStamped',
    type: 'get',
    response: config => {
      const { pageSize, toPage } = JSON.parse(config.body)
      let resData = []
      const totalCount = Seal_Stamped_Data.length
      let endCount = pageSize * toPage
      if (pageSize * toPage >= totalCount) {
        endCount = totalCount
      }
      resData = Seal_Stamped_Data.slice(pageSize * (toPage - 1), endCount)
      return {
        code: 200,
        data: {
          Seal_Stamped_Data: resData,
          totalCount
        }
      }
    }
  }
]