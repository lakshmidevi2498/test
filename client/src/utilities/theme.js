
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1366,
      xl: 1600,
    },
  },
  palette: {
    one: {

      title: "#21a6a4",
      links: "#4b9c9a",
      bg: "#db0707",
      btn: "white",
      orange:"#ff5722",
      color:"#289997"
    },

  },

  typography: {

    caption1: {
      fontFamily: "poppins",
    },

    text1: {
      fontFamily: "cursive",
    }

  },

  components: {
    MuiButton: {

      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 15px',
        },
      },
      variants: [
        {

          props: { variant: 'primary' },
          style: {
            backgroundColor: '#db0707',
            color: '#ffffff',
            fontWeight: 'bold',
            textTransform: "initial",
            fontSize: { xs: "12px" }, 

            // backgroundColor: theme.palette.one.bg,
            // color: "#fff",
            ":hover": {
              // backgroundColor: theme.palette.one.bg,
            },
            '&:hover': {
              backgroundColor: '#e85877',
            },
          },
        },
        {

          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#ff5722',
            color: '#ffffff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          },
        },
        {

          props: { variant: 'outlined' },
          style: {
        textTransform: "initial",
        fontSize: { xs: "12px" },
        backgroundColor: "#fff",
        fontWeight: 'bold',
       
        ":hover": {
            backgroundColor: "#f7f7f7",
        },
      },
    },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#21a6a4",
          color: 'white',
          fontSize: '14px',
          padding: '10px',
          borderRadius: "10px"
        },
        arrow: {
          color: '#21a6a4',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black', // Default border color
            },
            // '&:hover .MuiOutlinedInput-notchedOutline': {
            //   borderColor: 'lightgray', // Hover border color
            // },
            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            //   borderColor: 'green', // Focused border color
            // },
          },
          '& .MuiInputLabel-root': {
            color: 'black',  
            
          },
        },
      },
    },
  
  },
})
export default theme;
