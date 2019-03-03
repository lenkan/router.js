# router.js
Dead simple routing in javascript based on [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

This repository was created for reference when used in simpler react projects. However, it does not make any assumptions on what you return from the route handler. So it can be used for whenever you want to switch which function is invoked based on a path.

# Example

```js
const router = require('@lenkan/router.js')()

router.use('/foo/:bar', request => {
  return request.params.bar
})

router.use('/foo', request => {
  return 'hello'
})

console.log(router({ pathname: '/foo' }))
// > 'hello'

console.log(router({ pathname: '/foo/4' }))
// > '4'

console.log(router({ pathname: '/something' }))
// > undefined
```

# Example (React)

Here is an example using the same router for routing in a react-app. The `useLocation` hook can be whatever that simply hooks into the current document location. [Here](https://github.com/lenkan/react-hooks/blob/master/src/use-location.js) is an example implementation. But the router only needs an object with at least `{ pathname: string }`.

```js
import Router from '@lenkan/router.js'

function App (props) {
  const location = useLocation()

  const router = Router()

  router.use('/todos', request => {
    // request contains route params, pathname and search
    return <TodosPage {...request} />
  })

  router.use('/todos/:id', request => {
    // request contains route params, pathname and search
    return <TodoPage {...request} />
  })

  router.use('', () => {
    return <DefaultPage />
  })

  return router(location)
}
```
