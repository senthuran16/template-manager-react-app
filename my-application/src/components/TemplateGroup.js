import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Cake from 'material-ui-icons/Cake'
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

/**
 * Represent each Template Group, that is shown as a thumbnail
 */
class TemplateGroup extends React.Component {
    // Styles
    card = {
        width: 345,
        float: 'left',
        margin: 15
    }

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            uuid: props.uuid,
            uuid: props.uuid,
            description: props.description,
            onClick: props.onClick // Stored onClick action
        }
    }

    /**
     * Generates initials to be shown in the avatar
     */
    generateAvatarInitials() {
        var avatarInitials = "";
        // Contains words split by space
        var splitWords = this.state.name.split(" ")

        if (splitWords.length >= 2) {
            // Two letter initials
            avatarInitials += (splitWords[0][0] + splitWords[splitWords.length - 1][0])
        } else {
            // One letter initial
            avatarInitials += splitWords[0][0]
        }

        return avatarInitials
    }

    /**
     * Generates a style with backgroundColor for the given name
     *
     * @param name
     * @returns {{style: {backgroundColor: string}}}
     */
    generateAvatarColor(name) {
        var hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        var c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        var color = "00000".substring(0, 6 - c.length) + c;
        // Put the random color to an object
        let style = {backgroundColor: '#' + color.toString()}
        return {style}
    }

    /**
     * Generates style with a random backgroundColor, from an array of given colors
     * @returns {{style: {backgroundColor: string}}}
     */
    generateAvatarColor() {
        let colors = [
            '#009688',
            '#03A9F4',
            '#EF6C00',
            '#4527A0',
            '#C51162',
        ];
        // Put the random color to an object
        let style = {backgroundColor: colors[Math.floor(Math.random() * colors.length)]}
        return {style}
    }

    render() {
        return (
            <Card style={this.card}>
                <CardContent>
                    <Avatar style={this.generateAvatarColor()['style']}>
                        {this.generateAvatarInitials()}
                    </Avatar>
                    <br/>
                    <Typography type="headline" component="h2">
                        {this.state.name}
                    </Typography>
                    <Typography component="p">
                        {this.state.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Create" onClick={this.state.onClick}>
                        <Cake/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default TemplateGroup;
