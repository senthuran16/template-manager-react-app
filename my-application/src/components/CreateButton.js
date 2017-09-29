import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import './index.css';
// Material-UI

/**
 * Represents a Create Button used in the Business Rule Manager
 */
class CreateButton extends React.Component {
    // Styles
    // buttonStyle = {
    //     float: 'left',
    //     padding: 50,
    //     margin: 25,
    //     height: 105,
    //     width: 105,
    //     color: 'white',
    //     backgroundColor: '#212121',
    //     borderRadius: 900,
    //     cursor: 'pointer'
    // };

    buttonStyle = {
        float: 'left',
        padding: 50,
        margin: 25,
        height: 200,
        width: 200,
        color: 'white',
        backgroundColor: '#424242',
        borderRadius: 900,
    };

    constructor(props) {
        super(props);
        this.state = {
            icon: '', // Icon for the button
            text: props.text, // Text for the button
            onClick: props.onClick // Stores onClick function
        }
    }

    render() {
        return (
            <Button raised style={this.buttonStyle} onClick={this.state.onClick}>
                <Typography type="title" color="inherit">
                    {this.state.text}
                </Typography>
            </Button>
        )
    }
}

export default CreateButton;

{/*<div style={this.buttonStyle} onClick={this.state.onClick}>*/
}
{/*<Typography type="title" color="inherit">*/
}
{/*{this.state.text}*/
}
{/*</Typography>*/
}
{/*</div>*/
}
