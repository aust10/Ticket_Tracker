import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import Home from '../Home'

afterEach(cleanup)

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Home />, div)
})
