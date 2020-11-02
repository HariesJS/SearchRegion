import React from 'react';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { Search } from './src/components/Search';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import { MyRegions } from './src/components/MyRegions';

const uiTheme = {
    palette: {
      primaryColor: COLOR.green500,
    },
    toolbar: {
      container: {
        height: 50,
      },
    },
};

export default App = () => {
    return (
        <Provider store={store}>
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <MyRegions />
            </ThemeContext.Provider>
        </Provider>
      );
}