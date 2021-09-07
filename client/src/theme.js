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
    MuiSelect: {
      root: {
        fontSize: '0.8rem !important',
      },
    },
    MuiFormLabel: {
      root: {
        '@media (max-width:600px)': {
          fontSize: '0.8rem !important',
        },
      },
    },
  },
})

export default theme
