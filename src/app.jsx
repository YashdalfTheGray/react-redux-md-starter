import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from  'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { store } from './stores/app';
import MessageDisplay from './components/MessageDisplay';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends React.Component {
    navMenuClick() {
        console.log('Nav menu button clicked!');
    }

    render() {
        const globalFontStyle = {
            fontFamily: 'Roboto, sans-serif'
        };

        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div style={globalFontStyle}>
                    <AppBar
                        title="Redux Starter"
                        onLeftIconButtonTouchTap={this.navMenuClick} />
                    <MessageDisplay />
                </div>
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.getElementById('react-container')
);
