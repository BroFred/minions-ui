import { mode } from "@chakra-ui/theme-tools"
const styles = {
    global: (props) => ({
        "body": {
            fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,Noto Color Emoji",
            color: mode("nl.800", "nd.200")(props),
            bg: mode("white", "nd.900")(props),
            fontSize: '0.875rem',
            lineHeight: "base"
        },
        "*::placeholder": {
            color: mode("nl.700", "nd.200")(props),
        },
        "*, *::before, &::after": {
            borderColor: mode("gray.200", "whiteAlpha.300")(props),
            wordWrap: "break-word",
        }
    })
}

export default styles;