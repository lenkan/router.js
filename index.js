// @ts-check
const pathToRegexp = require('path-to-regexp')

/**
 * @typedef {(request: { params: any, pathname: string, search: string}) => any} RouteHandler
 * @typedef {{ regex: RegExp, keys: { name: string }[], handler: RouteHandler }} Route
 */
function Router () {
  const self = Object.assign(render, { use })

  /**
   * @type {Route[]}
   */
  const routes = []

  /**
   * @param {string} route
   * @param {RouteHandler} handler
   */
  function use (route, handler) {
    const keys = []
    const regex = pathToRegexp(route, keys, null)

    routes.push({ regex, keys, handler })
    return self
  }

  /**
   * @param {{pathname: string, search: string}} location
   */
  function render (location) {
    for (const route of routes) {
      const result = route.regex.exec(location.pathname)
      if (result) {
        const params = result.slice(1).reduce((params, match, index) => {
          const key = route.keys[index]
          params[key.name] = match
          return params
        }, {})

        return route.handler({ params, ...location })
      }
    }
  }

  return self
}

module.exports = Router
