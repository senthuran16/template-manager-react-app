import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import Header from "./Header";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRule from "./BusinessRule";
import Table, {TableBody, TableCell, TableHead, TableRow,} from 'material-ui/Table';

/**
 * Allows to select a Business Rule among Business Rules displayed as table rows and re-deploy, edit or delete each
 */
class BusinessRuleModifier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessRules: props.businessRules // Available Business Rules
        }
    }

    render() {
        var businessRules = this.state.businessRules.map((businessRule) =>
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
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <br/>
                <center>
                    <Typography type="headline">
                        Business Rules
                    </Typography>
                    <br/>
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
                </center>
            </div>
        )
    }
}

export default BusinessRuleModifier;
