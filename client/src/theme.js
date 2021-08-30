import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&::after': {
          borderBottom: '2px solid #e9d735',
        },
      },
    },
  },
})

export default theme
