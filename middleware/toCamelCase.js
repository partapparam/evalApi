const { camelCase } = require("lodash")

const camelCaseKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((object) => camelCaseKeys(object))
  } else if (data !== null && data.constructor === Object) {
    return Object.keys(data).reduce(
      (result, key) => ({
        ...result,
        [toCamelCase(key)]: camelCaseKeys(data[key]),
      }),
      {}
    )
  }
  return data
}

const toCamelCase = (str) => camelCase(str)

const convertToCamelCase = (req, res, next) => {
  const oldJson = res.json
  res.json = (body) => {
    body.data = camelCaseKeys(body.data)
    return oldJson.call(res, body)
  }
  next()
}

module.exports = convertToCamelCase
