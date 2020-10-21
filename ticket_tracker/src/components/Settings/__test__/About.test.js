import React from 'react'
import ReactDom from 'react-dom'
import About from '../About'
import Main from '../Main'
import Settings from '../Settings'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

// About / Main
it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDom.render(<About />, div)
})

it('Renders Back Button Correctly', () => {
  const { getByTestId } = render(<About />, <Main />)
  expect(getByTestId('button')).toHaveTextContent('Back')
})

// Settings
it('Renders About Button Correctly', () => {
  const { getByTestId } = render(<Settings />)
  expect(getByTestId('about')).toHaveTextContent('About')
})

it('Renders Back Button Correctly', () => {
  const { getByTestId } = render(<Settings />)
  expect(getByTestId('main')).toHaveTextContent('Main')
})