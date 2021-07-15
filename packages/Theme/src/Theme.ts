import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './color';
import shadows from './shadow';
import { ButtonTheme as Button } from '@minion-ui/button';
import { paginationTheme as Pagination } from '@minion-ui/pagination';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { always } from 'ramda';

always(undefined);
const breakpoints = createBreakpoints({
  sm: '920px',
  md: '1440px',
  lg: '1920px',
  xl: '2326px',
})
const overrides = {
  colors,
  shadows,
  breakpoints: breakpoints,
  components: {
    Button,
    Pagination,
  },
}
// 给Button组件添加默认colorScheme，否则默认是gray
const defaultColorScheme = withDefaultColorScheme({
  colorScheme: 'blue',
  components: ['Button']
})
export default extendTheme(overrides, defaultColorScheme)
