import React from 'react';
// import './index.css';
// Material-UI
import Property from './Property';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import AddIcon from "material-ui-icons/Add"
import {IconButton, Typography} from "material-ui";
import Paper from 'material-ui/Paper';
import FilterRule from "./FilterRule";

/**
 * Represents a form, shown to for Business Rules from scratch
 */
class BusinessRuleFromScratchForm extends React.Component {
    // Button Style
    styles = {
        addFilterRuleButton: {
            backgroundColor: '#EF6C00',
            color: 'white'
        },
        paper: {
            padding: 10,
            paddingTop: 15,
            paddingBottom: 15
        }
    }
    /**
     * Handles onChange of each property
     *
     * @param property
     */
    handleValueChange = property => value => {
        let state = this.state
        state['businessRuleProperties'][property] = value
        this.setState(state)
    }
    /**
     * Handles onChange of Business Rule name text field
     *
     * @param event
     */
    handleBusinessRuleNameChange = event => {
        let state = this.state
        state['businessRuleName'] = event.target.value
        state['businessRuleUUID'] = BusinessRulesFunctions.generateBusinessRuleUUID(event.target.value)
        this.setState(state)
    }

    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.addFilterRule = this.addFilterRule.bind(this);
        this.removeFilterRule = this.removeFilterRule.bind(this);

        this.state = {
            formMode: props.formMode, // 'create' or 'edit'
            businessRuleName: props.businessRuleName,
            businessRuleUUID: props.businessRuleUUID,
            templateGroup: props.templateGroup,
            businessRuleType: props.businessRuleType,
            // Rule Templates, whose properties will be used to generate form
            inputRuleTemplate: props.inputRuleTemplate,
            outputRuleTemplate: props.outputRuleTemplate,

            businessRuleProperties: props.businessRuleProperties // To store values given for properties displayed in the form
        }

        // To prevent 'undefined' when updating properties, if no properties are passed during 'create' mode
        if (!this.state.businessRuleProperties) {
            let state = this.state
            state['businessRuleProperties'] = {}
            this.state = state
        }
    }

    /**
     * Adds a new filter rule
     */
    addFilterRule() {
        let state = this.state
        state.businessRuleProperties['ruleComponents']['filterRules'].push("  ")
        this.setState(state)
    }

    /**
     * Removes the filter rule given by index
     * @param index
     */
    removeFilterRule = index => value => {
        let state = this.state
        console.log("BEFORE")
        console.log(state.businessRuleProperties['ruleComponents']['filterRules'])
        state.businessRuleProperties['ruleComponents']['filterRules'].splice(index,1)
        console.log("AFTER")
        console.log(state.businessRuleProperties['ruleComponents']['filterRules'])

        this.setState(state)
        //console.log("Removed " + index)
    }

    /** todo:different for BR from scratch
     * Creates a Business Rule object from the form filled properties
     */
    createBusinessRuleObject() {
        var businessRuleObject = {}
        businessRuleObject['name'] = this.state.businessRuleName
        businessRuleObject['uuid'] = this.state.businessRuleUUID
        businessRuleObject['templateGroupUUID'] = this.state.templateGroup.uuid
        businessRuleObject['ruleTemplateUUID'] = this.state.ruleTemplate.uuid
        businessRuleObject['properties'] = this.state.businessRuleProperties
    }

    render() {
        // To store properties that should be displayed, mapped as Property components
        var propertiesToDisplay

        var inputDataPropertiesToDisplay
        var outputDataPropertiesToDisplay
        var ruleComponentPropertiesToDisplay
        var filterRulesToDisplay
        var ruleLogicToDisplay

        // To store properties in re-arranged format, in order to generate fields
        var properties = []

        // Sub arrays to store each type of properties in re-arranged format
        var inputDataProperties = []
        var outputDataProperties = []
        var ruleComponentProperties = []
        var filterRules = []


        // Business Rule Name text field
        var businessRuleNameTextField
        // Submit button
        var submitButton

        // Business rule has been created from scratch

        // If form should be displayed to edit business rule
        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            // Add properties of input & output templates in re-organized form to display

            // inputRuleTemplate properties
            for (let propertyKey in this.state.inputRuleTemplate.properties) {
                // Modify default value, as the entered property value,
                // in order to display initially in the form
                let property = this.state.inputRuleTemplate.properties[propertyKey.toString()]
                property['defaultValue'] = this.state.businessRuleProperties['inputData'][propertyKey.toString()]

                inputDataProperties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            // To display each input data property as an input field
            inputDataPropertiesToDisplay = inputDataProperties.map((property) =>
                <Property
                    key={property.propertyName}
                    name={property.propertyName}
                    fieldName={property.propertyObject.fieldName}
                    description={property.propertyObject.description}
                    initialValue={property.propertyObject.defaultValue}
                    options={property.propertyObject.options}
                    onValueChange={this.handleValueChange(property.propertyName)}
                />
            )

            // outputRuleTemplate properties
            for (let propertyKey in this.state.outputRuleTemplate.properties) {
                // Modify default value, as the entered property value,
                // in order to display initially in the form
                let property = this.state.outputRuleTemplate.properties[propertyKey.toString()]
                property['defaultValue'] = this.state.businessRuleProperties['outputData'][propertyKey.toString()]

                outputDataProperties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            // To display each output data property as an input field
            outputDataPropertiesToDisplay = outputDataProperties.map((property) =>
                <Property
                    key={property.propertyName}
                    name={property.propertyName}
                    fieldName={property.propertyObject.fieldName}
                    description={property.propertyObject.description}
                    initialValue={property.propertyObject.defaultValue}
                    options={property.propertyObject.options}
                    onValueChange={this.handleValueChange(property.propertyName)}
                />
            )

            // Rule Components
            // Filter rules
            // for (let i = 0; i < this.state.businessRuleProperties['ruleComponents']['filterRules'].length; i++) {
            //     // Split and store each filter rule
            //     // Elements : [0] Attribute, [1] Operator, [2] Attribute/Value
            //     let filterRule =
            //         this.state.businessRuleProperties['ruleComponents']['filterRules'][i].toString().split(" ")
            //     filterRules.push(
            //         filterRule
            //     )
            // }

            // To display each filter rule
            filterRulesToDisplay = this.state.businessRuleProperties['ruleComponents']['filterRules'].map((filterRule, index) =>
                <FilterRule
                    key={index}
                    filterRuleNumber={index + 1}
                    filterRuleAttribute={filterRule.split(" ")[0]}
                    operator={filterRule.split(" ")[1]}
                    attributeOrValue={filterRule.split(" ")[2]}
                    handleRemoveFilterRule={this.removeFilterRule(index)}
                />
            )

            // filterRulesToDisplay = filterRules.map((filterRule, index) =>
            //     <FilterRule
            //         key={index}
            //         filterRuleNumber={index + 1}
            //         filterRuleAttribute={filterRule[0]}
            //         operator={filterRule[1]}
            //         attributeOrValue={filterRule[2]}
            //         handleRemoveFilterRule={this.removeFilterRule(index)}
            //     />
            // )

            // Rule Logic
            ruleLogicToDisplay =
                <Property
                    name="ruleLogic"
                    fieldName="Rule Logic"
                    description="Enter the Rule Logic, referring filter rule numbers"
                    initialValue={this.state.businessRuleProperties['ruleComponents']['ruleLogic'][0]}
                    onValueChange={this.handleValueChange('ruleLogic')} //todo: MAKE A KEY, SUBKEY since we have some levels
                />

            // To display each rule component filter rule property as an input field
            ruleComponentPropertiesToDisplay = ruleComponentProperties.map((property) =>
                <Property
                    key={property.propertyName}
                    name={property.propertyName}
                    fieldName={property.propertyObject.fieldName}
                    description={property.propertyObject.description}
                    initialValue={property.propertyObject.defaultValue}
                    options={property.propertyObject.options}
                    onValueChange={this.handleValueChange(property.propertyName)}
                />
            )

            // Disabled text field that has Business Rule name
            businessRuleNameTextField =
                <TextField
                    id="businessRuleName"
                    name="businessRuleName"
                    label="Business Rule name"
                    placeholder="Please enter"
                    value={this.state.businessRuleName}
                    required={true}
                    onChange={this.handleBusinessRuleNameChange}
                    disabled={true}
                />

            // Update button
            submitButton =
                <Button raised color="primary" style={this.styles.button}
                        onClick={(e) => this.createBusinessRuleObject()}>
                    Update
                </Button>
        }

        return (
            <div>
                <br/>
                {businessRuleNameTextField}
                <br/>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">Input Data Properties</Typography>
                    {inputDataPropertiesToDisplay}
                </Paper>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">Rule Component Properties</Typography>
                    <br/>
                    <Typography type="subheading">Filter Rules</Typography>
                    {/*<Table>*/}
                        {/*<TableHead>*/}
                            {/*<TableRow>*/}
                                {/*<TableCell></TableCell>*/}
                                {/*<TableCell>Attribute</TableCell>*/}
                                {/*<TableCell>Operator</TableCell>*/}
                                {/*<TableCell>Value/Attribute</TableCell>*/}
                            {/*</TableRow>*/}
                        {/*</TableHead>*/}
                        {/*<TableBody>*/}
                            {/*{filterRulesToDisplay}*/}
                        {/*</TableBody>*/}
                    {/*</Table>*/}
                    <IconButton color="primary" style={this.styles.addFilterRuleButton} aria-label="Remove"
                                onClick={(e) => this.addFilterRule()}>
                        <AddIcon/>
                    </IconButton>
                    <br/>
                    <h3>
                        {this.state.businessRuleProperties['ruleComponents']['filterRules']}
                    </h3>
                    <div>
                        {this.state.businessRuleProperties['ruleComponents']['filterRules'].map((filterRule, index) =>
                        <FilterRule
                            key={index}
                            filterRuleNumber={index + 1}
                            filterRuleAttribute={filterRule.split(" ")[0]}
                            operator={filterRule.split(" ")[1]}
                            attributeOrValue={filterRule.split(" ")[2]}
                            handleRemoveFilterRule={this.removeFilterRule(index)}
                        />)}
                    </div>
                    <br/>
                    {ruleLogicToDisplay}
                </Paper>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">Output Data Properties</Typography>
                    {outputDataPropertiesToDisplay}
                </Paper>
                <br/>
                {submitButton}
            </div>
        )
    }
}

export default BusinessRuleFromScratchForm;
