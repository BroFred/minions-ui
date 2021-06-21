import { extendTheme } from '@chakra-ui/react';
import colors from './color';
import shadows from './shadow';
import { ButtonTheme as Button } from '@minion-ui/button';
import { paginationTheme as Pagination } from '@minion-ui/pagination';
import {map} from 'ramda';
console.log(map)
const overrides = {
  colors,
  shadows,
  components: {
    Button,
    Pagination,
  },
}
export default extendTheme(overrides)
