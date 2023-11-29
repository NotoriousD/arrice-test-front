import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import css from 'shared/styles/styles.module.scss'

import { store } from './store'
import { router } from './router'

function App() {
  return (
    <div className={css.root}>
      <Provider store={store}>
        <Suspense fallback={<>Loading</>}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </div>
  )
}

export default App;
