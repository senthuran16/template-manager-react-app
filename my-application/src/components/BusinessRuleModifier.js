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

/**
 * Allows to select a Business Rule among Business Rules displayed as table rows and re-deploy, edit or delete each
 */
class BusinessRuleModifier extends React.Component {
    styles = {
        floatButton: {
            backgroundColor: '#EF6C00',
            color: 'white',
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
        }

    }

    constructor(props) {
        super(props);
        this.state = {
            //businessRules: props.businessRules // Available Business Rules
            //businessRules: props.businessRules // Available Business Rules
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
                    key={businessRule.uuid}
                    name={businessRule.name}
                    uuid={businessRule.uuid}
                    templateGroup={BusinessRulesFunctions.getTemplateGroup(businessRule.templateGroupUUID)}
                    type={businessRule.type}
                    status={BusinessRulesFunctions.getBusinessRuleDeploymentStatus(businessRule.uuid)}
                />
            )

            return (
                <div style={this.styles.container}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Business Rule</TableCell>
                                <TableCell>Template Group</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {businessRules}
                        </TableBody>
                    </Table>
                    <br/>
                    <Button fab color="primary" style={this.styles.floatButton} aria-label="Remove"
                            onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                        <AddIcon/>
                    </Button>
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
                        <Button color="primary" style={this.styles.floatButton} aria-label="Remove"
                                onClick={(e) => BusinessRulesFunctions.loadBusinessRuleCreator()}>
                            Create
                        </Button>
                    </Paper>
                </div>
            )
        }
    }

    render() {


        return (
            <div>
                <center>
                    <Header
                        title="Business Rule Manager"
                    />
                    <br/>
                    <br/>
                    <div>
                        <Typography type="headline">
                            Business Rules
                        </Typography>
                    </div>
                    <br/>
                    {this.loadAvailableBusinessRules()}
                </center>
            </div>
        )
    }
}

export default BusinessRuleModifier;
