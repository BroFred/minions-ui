import { extendTheme } from '@chakra-ui/react';
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
export default extendTheme(overrides)
