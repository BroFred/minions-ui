import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './color';
import shadows from './shadow';
import styles from './global';
import { ButtonTheme as Button } from '@minion-ui/button';
import { paginationTheme as Pagination } from '@minion-ui/pagination';
import { HeadingTheme as Heading } from '@minion-ui/heading';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { always } from 'ramda';

always(undefined);
const breakpoints = createBreakpoints({
  sm: '57.5rem',
  md: '90rem',
  lg: '120rem',
  xl: '145.375rem',
})
const sizes = {
  container: {
    sm: '18rem',
    md: '30rem'
  }
}
const overrides = {
  styles,
  colors,
  shadows,
  sizes,
  breakpoints,
  components: {
    Heading,
    Button,
    Pagination,
  },
}
// 给Button组件添加默认colorScheme，否则默认是gray
const defaultColorScheme = withDefaultColorScheme({
  colorScheme: 'nl',
  components: ['Button']
})
export default extendTheme(overrides, defaultColorScheme)
