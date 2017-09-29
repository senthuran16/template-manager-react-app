import React from 'react';
// import './index.css';
// Material-UI
import {TableCell, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import Property from "./Property";
import {Typography} from "material-ui";

/**
 * Represents a Filter Rule, which is specified in a Business Rule from scratch, that has exactly 4 elements :
 * FilterRuleNumber, Attribute, Operator and AttributeOrvalue
 */
class FilterRule extends React.Component {
    // Styles
    styles = {
        deployButton: {
            color: '#EF6C00'
        }
    }
    /**
     * Handles onChange of each property
     *
     * @param property
     */
    handleValueChange = property => value => {
        let state = this.state
        state[property] = value
        this.setState(state)
    }
    /**
     * Handles onClick of remove button against the filter rule
     *
     * @param event
     */
    handleRemoveFilterRuleButtonClick = index => event => {
        console.log("INNER")
        this.props.handleRemoveFilterRule(index) // todo: make sure to pass
    }

    constructor(props) {
        super(props);
        this.state = {
            filterRuleNumber: props.filterRuleNumber,
            filterRuleAttribute: props.filterRuleAttribute,
            operator: props.operator,
            attributeOrValue: props.attributeOrValue
        }
    }

    render() {
        return (

            <TableRow>
                <TableCell>
                    <Typography>
                        {this.state.filterRuleNumber}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Property
                        name="filterRuleAttribute"
                        fieldName=""
                        description=""
                        initialValue={this.state.filterRuleAttribute}
                        onValueChange={this.handleValueChange("filterRuleAttribute")}
                    />
                </TableCell>
                <TableCell>
                    <Property
                        name="operator"
                        fieldName=""
                        description=""
                        initialValue={this.state.operator}
                        options={BusinessRulesConstants.BUSINESS_RULE_FILTER_RULE_OPERATORS}
                        onValueChange={this.handleValueChange("operator")}
                    />
                </TableCell>
                <TableCell>
                    <Property
                        name="attributeOrValue"
                        fieldName=""
                        description=""
                        initialValue={this.state.attributeOrValue}
                        onValueChange={this.handleValueChange("attributeOrValue")}
                    />
                </TableCell>
                <TableCell>
                    <IconButton color="primary" style={this.styles.deployButton} aria-label="Remove"
                                onClick={this.handleRemoveFilterRuleButtonClick('test')}>
                        <ClearIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default FilterRule;
