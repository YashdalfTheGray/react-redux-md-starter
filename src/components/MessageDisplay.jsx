import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';

import { store } from '../stores/app';
import { marginMedium } from '../styles';

export default props => (
    <Card style={marginMedium}>
        <CardTitle title={store.getState().message}></CardTitle>
    </Card>
);
