import { extendTheme } from "@chakra-ui/react";
import colors from "./color";
import { ButtonTheme as Button } from "../components/Button";
import { paginationTheme as Pagination } from '../components/Pagination';
const overrides = {
  colors,
  components: {
    Button,
    Pagination,
  },
}
export default extendTheme(overrides)
