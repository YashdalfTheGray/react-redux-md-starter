import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium } from '../styles';

class MessageDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: store.getState().message
        };

        this.unsubMessage = store.subscribe(() => {
            this.setState({
                message: store.getState().message
            });
        })
    }

    componentWillUnmount() {
        this.unsubMessage();
    }

    render() {
        let message;
        return (
            <Card style={marginMedium}>
                <CardTitle title={this.state.message}></CardTitle>
                <CardText>
                    <TextField
                        floatingLabelText="Message"
                        fullWidth={true}
                        onChange={e => store.dispatch(actions.updateMessage(e.target.value))} />
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Reset Message"
                        primary={true}
                        onTouchTap={e => store.dispatch(actions.resetMessage())} />
                </CardActions>
            </Card>
        );
    }
}

export default MessageDisplay;
