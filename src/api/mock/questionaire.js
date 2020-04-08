const { questions } = require('./questions.json')
const { provinces } = require('./cities.json')

export default [
  {
    url: '/questionaire/getQuestions',
    type: 'get',
    response: config => {
      return {
        code: 200,
        questions
      }
    }
  },
  {
    url: '/questionaire/getCities',
    type: 'get',
    response: config => {
      return {
        code: 200,
        provinces
      }
    }
  }
]
