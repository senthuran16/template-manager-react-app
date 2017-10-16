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
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import BusinessRulesMessageStringConstants from "../utils/BusinessRulesMessageStringConstants";

/**
 * Allows to select a Business Rule among Business Rules displayed as table rows and re-deploy, edit or delete each
 */
class BusinessRuleModifier extends React.Component {
    styles = {
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

    constructor(props) {
        super(props);
        this.state = {
            businessRules: props.businessRules, // Available Business Rules

            // To show the snackbar, after deployment / save
            displaySnackBar: this.props.displaySnackBar,
            snackbarMessageStatus: this.props.snackbarMessageStatus
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
            console.log("RESPONSES")
            console.log(this.state.businessRules)

            // Show available business rules
            let businessRules = this.state.businessRules.map((businessRule) =>
                <BusinessRule
                    key={businessRule[0].uuid}
                    name={businessRule[0].name}
                    uuid={businessRule[0].uuid}
                    type={businessRule[0].type}
                    //status={BusinessRulesFunctions.getBusinessRuleDeploymentStatus(businessRule.uuid)}
                    status={businessRule[1].toString()}
                />
            )

            return (
                <div style={this.styles.container}>
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
                    <Paper style={this.styles.paper}>
                        <Typography type="title">
                            No business rule found!
                        </Typography>
                        <Typography type="subheading">
                            Get started by creating one
                        </Typography>
                        <br/>
                        <Button color="primary" style={this.styles.raisedButton} aria-label="Remove"
                                onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                            Create
                        </Button>
                    </Paper>
                </div>
            )
        }
    }

    handleRequestClose(){
        this.setState({ displaySnackBar: false });
    };

    render() {

        let snackBar =
            <Snackbar
                open={this.state.displaySnackBar}
                onRequestClose={(e)=>this.handleRequestClose()}
                transition={<Slide direction={this.styles.snackbar.direction} />}
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
                                    <Button fab color="primary" style={this.styles.floatButton} aria-label="Remove"
                                            onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                                        <AddIcon/>
                                    </Button>
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
