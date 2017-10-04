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
     * Gives an array, which has Attribute, Logic, AttributeOrValue elements seperated from the given filter rule
     *
     * @param filterRule
     * @returns {*}
     */
    deriveElementsFromFilterRule = filterRule => {
        let initialSplitArray = filterRule.split(" ")
        let newSplitArray = []

        // If more than 3 members available after splitting
        if (initialSplitArray.length > 3) {
            // Push first two members as they are
            for (let i = 0; i < 2; i++) {
                newSplitArray.push(initialSplitArray[i])
            }
            // Push rest of the members concatenated with space
            newSplitArray.push(initialSplitArray.slice(2, initialSplitArray.length).join(" "))

            return newSplitArray
        }

        return initialSplitArray
    }

    // To store Attribute, Operator and AttributeOrValue elements of the filter, when a change occurs
    onAttributeChange = value => {
        this.props.onAttributeChange(this.props.filterRuleIndex, value)
    }
    onOperatorChange = value => {
        this.props.onOperatorChange(this.props.filterRuleIndex, value)
    }
    onAttributeOrValueChange = value => {
        this.props.onAttributeOrValueChange(this.props.filterRuleIndex, value)
    }

    /**
     * Handles onClick of remove button of the filter rule
     *
     * @param event
     */
    handleRemoveFilterRuleButtonClick = index => event => {
        this.props.handleRemoveFilterRule(index)
    }


    render() {
        // To display Attribute drop down
        var filterRuleAttributeToDisplay

        // If exposed input stream fields are passed through props
        if (this.props.exposedInputStreamFields && (this.props.exposedInputStreamFields != null)) {
            // To store options to display
            let fieldNameOptions = []
            for(let fieldName in this.props.exposedInputStreamFields){
                fieldNameOptions.push(fieldName.toString())
            }
            filterRuleAttributeToDisplay =
                <Property
                    name="filterRuleAttribute"
                    fieldName=""
                    description=""
                    value={this.deriveElementsFromFilterRule(this.props.filterRule)[0]}
                    options={fieldNameOptions}
                    onValueChange={(modifiedValue) => this.onAttributeChange(modifiedValue)}
                />
        } else {
            filterRuleAttributeToDisplay =
                <Property
                    name="filterRuleAttribute"
                    fieldName=""
                    description=""
                    value={this.deriveElementsFromFilterRule(this.props.filterRule)[0]}
                    onValueChange={(modifiedValue) => this.onAttributeChange(modifiedValue)}
                />
        }

        return (
            <TableRow>
                <TableCell>
                    <Typography>
                        {this.props.filterRuleIndex + 1}
                    </Typography>
                </TableCell>
                <TableCell>
                    {/*<Property*/}
                        {/*name="filterRuleAttribute"*/}
                        {/*fieldName=""*/}
                        {/*description=""*/}
                        {/*value={this.deriveElementsFromFilterRule(this.props.filterRule)[0]}*/}
                        {/*onValueChange={(modifiedValue) => this.onAttributeChange(modifiedValue)}*/}
                    {/*/>*/}
                    {filterRuleAttributeToDisplay}
                </TableCell>
                <TableCell>
                    <Property
                        name="operator"
                        fieldName=""
                        description=""
                        value={this.deriveElementsFromFilterRule(this.props.filterRule)[1]}
                        options={BusinessRulesConstants.BUSINESS_RULE_FILTER_RULE_OPERATORS}
                        onValueChange={(modifiedValue) => this.onOperatorChange(modifiedValue)}
                    />
                </TableCell>
                <TableCell>
                    <Property
                        name="attributeOrValue"
                        fieldName=""
                        description=""
                        value={this.deriveElementsFromFilterRule(this.props.filterRule)[2]}
                        onValueChange={(modifiedValue) => this.onAttributeOrValueChange(modifiedValue)}
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
