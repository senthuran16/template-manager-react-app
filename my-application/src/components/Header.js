import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Logo from '../images/wso2-logo.svg';

/**
 * Represents a Create Button used in the Business Rule Manager
 */
class Header extends React.Component {
    // Styles
    headerStyle = {
        color: 'white',
        backgroundColor: '#212121',
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.title
        }
    }

    render() {
        return (
            <AppBar position="static" style={this.headerStyle}>
                <Toolbar>
                    <img height='35' src={Logo}/>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Typography type="title" color="inherit">
                        {this.state.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
