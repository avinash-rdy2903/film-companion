import Index from "./index";
import { store } from './context/store';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
const theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
  });
export default function App(){
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Index/>
            </ThemeProvider>
        </Provider>
    )
}