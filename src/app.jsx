import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from  'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends React.Component {
    navMenuClick() {
        console.log('Nav menu button clicked!');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <AppBar
                    title="React Starter"
                    onLeftIconButtonTouchTap={this.navMenuClick} />
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();

ReactDOM.render(
    <App phrase="ES2015" />,
    document.getElementById('react-container')
);
