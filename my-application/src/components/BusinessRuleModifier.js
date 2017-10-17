import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import Header from "./Header";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRule from "./BusinessRule";
import Table, {TableBody, TableCell, TableHead, TableRow,} from 'material-ui/Table';
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import BusinessRulesMessageStringConstants from "../utils/BusinessRulesMessageStringConstants";

/**
 * Allows to select a Business Rule among Business Rules displayed as table rows
 * and view, edit, delete or re-deploy (when not deployed already) each;
 * Or to create a new business rule
 */
const styles = {
    floatButton: {
        backgroundColor: '#EF6C00',
        color: 'white',
        float: 'right'
    },
    raisedButton: {
        backgroundColor: '#EF6C00',
        color: 'white'
    },
    container: {
        maxWidth: 1020,
    },
    paper: {
        maxWidth: 400,
        paddingTop: 30,
        paddingBottom: 30
    },
    snackbar: {
        direction: 'up'
    }
}

class BusinessRuleModifier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessRules: props.businessRules, // Available Business Rules

            // To show the snackbar, after deployment / save
            displaySnackBar: this.props.displaySnackBar,
            snackbarMessageStatus: this.props.snackbarMessageStatus,

            // To show dialog when deleting a business rule
            displayDeleteDialog: false,
            isForceDeletePossible: false,
            forceDeleteBusinessRule: false,
            isDeleted: false
        }
    }

    /**
     * Displays list of Business Rules when available, or message for creation when not
     */
    loadAvailableBusinessRules() {
        // Check whether business rules are available
        let isNoneAvailable
        if (this.state.businessRules) {
            // If at least one business rule is available
            if (this.state.businessRules.length > 0) {
                isNoneAvailable = false
            } else {
                // No business rules are available
                isNoneAvailable = true
            }
        } else {
            isNoneAvailable = true
        }

        if (!isNoneAvailable) {
            // Show available business rules
            let businessRules = this.state.businessRules.map((businessRule) =>
                <BusinessRule
                    key={businessRule[0].uuid}
                    name={businessRule[0].name}
                    uuid={businessRule[0].uuid}
                    type={businessRule[0].type}
                    status={businessRule[1]}
                />
            )

            return (
                <div style={styles.container}>
                    <Button fab color="primary" style={styles.floatButton} aria-label="Remove"
                            onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                        <AddIcon/>
                    </Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Business Rule</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {businessRules}
                        </TableBody>
                    </Table>
                </div>
            )
        } else {
            // Show message for creation
            return (
                <div>
                    <Paper style={styles.paper}>
                        <Typography type="title">
                            No business rule found!
                        </Typography>
                        <Typography type="subheading">
                            Get started by creating one
                        </Typography>
                        <br/>
                        <Button color="primary" style={styles.raisedButton} aria-label="Remove"
                                onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                            Create
                        </Button>
                    </Paper>
                </div>
            )
        }
    }

    /**
     * Closes the snackbar
     */
    handleRequestClose(){
        this.setState({ displaySnackBar: false });
    };

    /**
     * Shows the delete dialog, after a business rule is requested to be deleted
     *
     * @returns {XML}
     */
    showDeleteDialog(){
        return (
            <Dialog open={this.state.displayDeleteDialog}
                    onRequestClose={(e)=>this.dismissDialog()}
            >
                <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.state.dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={styles.secondaryButton}
                            onClick={(e)=>this.dismissDialog()}
                            color="default">
                        {this.state.dialogPrimaryButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    /**
     * Closes the dialog
     */
    dismissDialog(){
        this.setState({displayDeleteDialog: false})
    }

    render() {
        // Show snackbar with response message, when this page is rendered after a form submission
        let snackBar =
            <Snackbar
                open={this.state.displaySnackBar}
                onRequestClose={(e)=>this.handleRequestClose()}
                transition={<Slide direction={styles.snackbar.direction} />}
                SnackbarContentProps={{
                    'aria-describedby': 'snackbarMessage',
                }}
                message={
                    <span id="snackbarMessage">
                        {(this.state.snackbarMessageStatus ===
                            BusinessRulesMessageStringConstants.BUSINESS_RULE_SAVE_SUCCESSFUL) ?
                            (BusinessRulesMessageStringConstants.BUSINESS_RULE_SAVE_SUCCESSFUL_MESSAGE) :
                            (this.state.snackbarMessageStatus ===
                                BusinessRulesMessageStringConstants
                                    .BUSINESS_RULE_SAVE_AND_DEPLOYMENT_SUCCESS) ?
                                (BusinessRulesMessageStringConstants
                                    .BUSINESS_RULE_SAVE_AND_DEPLOYMENT_SUCCESS_MESSAGE) :
                                (this.state.snackbarMessageStatus ===
                                    BusinessRulesMessageStringConstants
                                        .BUSINESS_RULE_SAVE_SUCCESSFUL_DEPLOYMENT_FAILURE) ?
                                    (BusinessRulesMessageStringConstants
                                        .BUSINESS_RULE_SAVE_SUCCESSFUL_DEPLOYMENT_FAILURE_MESSAGE) :
                                    (this.state.snackbarMessageStatus ===
                                        BusinessRulesMessageStringConstants
                                            .BUSINESS_RULE_SAVE_AND_DEPLOYMENT_FAILURE) ?
                                        (BusinessRulesMessageStringConstants
                                            .BUSINESS_RULE_SAVE_AND_DEPLOYMENT_FAILURE_MESSAGE) :
                                        ('')}
                    </span>
                }
            />


        return (
            <div>
                {snackBar}
                <center>
                    <Header
                        title="Business Rule Manager"
                    />
                    <br/>
                    <br/>
                    <div>
                        {
                            (this.state.businessRules.length > 0)?
                                (<Typography type="headline">
                                    Business Rules
                                </Typography>):
                                (<div></div>)
                        }
                    </div>
                    <br/>
                    {this.loadAvailableBusinessRules()}
                </center>
            </div>
        )
    }
}

export default BusinessRuleModifier;
