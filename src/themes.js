import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export const defaultLightTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#f6f6f6'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          content: undefined,
          top: 20
        }
      }
    }
  }
})
