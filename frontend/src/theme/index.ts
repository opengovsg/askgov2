import { extendTheme } from '@chakra-ui/react'

import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { components } from './components'
import { radii } from './radii'
import { textStyles } from './textStyles'
import { mode } from '@chakra-ui/theme-tools'
export const theme = extendTheme({
  components,
  colors,
  radii,
  textStyles,
  breakpoints,
})
mode('gray.800', 'whiteAlpha.900')

