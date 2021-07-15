import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './color';
import shadows from './shadow';
import { ButtonTheme as Button } from '@minion-ui/button';
import { paginationTheme as Pagination } from '@minion-ui/pagination';
import { always } from 'ramda';

always(undefined);
const overrides = {
  colors,
  shadows,
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
