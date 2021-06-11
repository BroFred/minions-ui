import React from 'react'
import {addDecorator} from '@storybook/react'
import {ChakraProvider, CSSReset, extendTheme} from  "@chakra-ui/react"
import theme from '../src/components/theme'

addDecorator((storyFn) => (
  <ChakraProvider theme={extendTheme(theme)}>
    <CSSReset />
    {storyFn()}
  </ChakraProvider>
))

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }