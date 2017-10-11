import React from 'react';
// import './index.css';
// Material-UI
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import {TableCell, TableRow,} from 'material-ui/Table';
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesAPIs from "../utils/BusinessRulesAPIs";

/**
 * Represent each Business Rule, that is shown as a row, in order to edit, delete / re-deploy Business Rules
 */
class BusinessRule extends React.Component {
    // Styles
    styles = {
        deployButton: {
            color: '#EF6C00'
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            uuid: props.uuid,
            templateGroup: props.templateGroup,
            type: props.type,
            status: props.status,
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

    /**
     * Handles onClick action of the 'Re-deploy' button
     */
    handleReDeployButtonClick() {

    }

    /**
     * Handles onClick action of the 'Edit' button
     */
    handleEditButtonClick() {
        BusinessRulesFunctions.loadBusinessRuleEditor(this.state.uuid)
    }

    /**
     * Handles onClick action of the 'Delete' button
     */
    handleDeleteButtonClick() {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let deletePromise = apis.deleteBusinessRule(this.state.uuid, 'false').then(
            alert('BusinessRule \''+this.state.name+'\' has been successfully deleted!')
        )
    }

    render() {
        // To show the action buttons for the business rule
        var actionButtonsCell
        // If not deployed
        if (this.state.status === BusinessRulesConstants.BUSINESS_RULE_DEPLOYMENT_STATUS_NOT_DEPLOYED) {
            actionButtonsCell =
                <TableCell>
                    <IconButton aria-label="Edit" onClick={(e) => this.handleEditButtonClick()}>
                        <EditIcon/>
                    </IconButton>
                    &nbsp;
                    <IconButton aria-label="Delete" onClick={(e) => this.handleDeleteButtonClick()}>
                        <DeleteIcon/>
                    </IconButton>
                    &nbsp;
                    <IconButton color="primary" style={this.styles.deployButton} aria-label="Refresh"
                                onClick={(e) => this.handleReDeployButtonClick()}>
                        <RefreshIcon/>
                    </IconButton>
                </TableCell>
        } else {
            actionButtonsCell =
                <TableCell>
                    <IconButton aria-label="Edit" onClick={(e) => this.handleEditButtonClick()}>
                        <EditIcon/>
                    </IconButton>
                    &nbsp;
                    <IconButton aria-label="Delete" onClick={(e) => this.handleDeleteButtonClick()}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
        }

        // Deployed status string
        var deployedStatus
        if (this.state.status === BusinessRulesConstants.BUSINESS_RULE_DEPLOYMENT_STATUS_DEPLOYED) {
            deployedStatus = "Deployed"
        } else {
            deployedStatus = "Not Deployed"
        }
        return (
            <TableRow>
                <TableCell>{this.state.name}</TableCell>
                <TableCell>{this.state.templateGroup.name}</TableCell>
                <TableCell>{deployedStatus}</TableCell>
                {actionButtonsCell}
            </TableRow>
        )
    }
}

export default BusinessRule;
