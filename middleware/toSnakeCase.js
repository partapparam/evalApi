const { snakeCase } = require("lodash")

const snakeCaseKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((object) => snakeCaseKeys(object))
  } else if (data !== null && data.constructor === Object) {
    return Object.keys(data).reduce(
      (result, key) => ({
        ...result,
        [toSnakeCase(key)]: snakeCaseKeys(data[key]),
      }),
      {}
    )
  }
  return data
}

const toSnakeCase = (str) => snakeCase(str)

const convertToSnakeCase = (req, res, next) => {
  req.body = snakeCaseKeys(req.body)
  next()
}

module.exports = convertToSnakeCase
