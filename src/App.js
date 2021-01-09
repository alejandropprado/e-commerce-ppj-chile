import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import store from './store'
import Router from './router'
import { ScrollToTop } from './hooks'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ScrollToTop />
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </ReduxProvider>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        closeOnClick
        draggable
      />
    </>
  )
}

export default App;
