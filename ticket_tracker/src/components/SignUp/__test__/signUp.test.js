import React from 'react'
import ReactDom from 'react-dom'
import { cleanup, render } from '@testing-library/react'
import SignUp from '../SignUp'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDom.render(<SignUp />, div)
})
