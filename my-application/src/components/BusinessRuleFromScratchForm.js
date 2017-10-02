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
        button: {
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
     * Handles onChange of any Attribute, of a filter rule
     * @param filterRuleIndex
     * @param value
     */
    handleAttributeChange = (filterRuleIndex, value) => {
        var ruleComponentType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS
        var ruleComponentFilterRuleType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES

        let state = this.state
        state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex] =
            value + " " +
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[1] + " " +
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[2]
        this.setState(state)
    }

    /**
     * Handles onChange of any Operator, of a filter rule
     *
     * @param filterRuleIndex
     * @param value
     */
    handleOperatorChange = (filterRuleIndex, value) => {
        var ruleComponentType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS
        var ruleComponentFilterRuleType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES

        let state = this.state
        state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex] =
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[0] + " " +
            value + " " +
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[2]
        this.setState(state)
    }

    /**
     * Handles onChange of any AttributeOrValue, of a filter
     *
     * @param filterRuleIndex
     * @param value
     */
    handleAttributeOrValueChange = (filterRuleIndex, value) => {
        var ruleComponentType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS
        var ruleComponentFilterRuleType = BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES

        let state = this.state
        state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex] =
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[0] + " " +
            state.businessRuleProperties[ruleComponentType][ruleComponentFilterRuleType][filterRuleIndex].split(" ")[1] + " " +
            value
        this.setState(state)
    }

    /**
     * Handles onChange of the RuleLogic
     * @param value
     */
    handleRuleLogicChange = value => {
        let state = this.state
        state['businessRuleProperties']['ruleComponents']['ruleLogic'][0] = value
        this.setState(state)
    }

    /**
     * Handles onChange of any input / output property
     *
     * @param property
     */
    handleValueChange = property => value => {
        let state = this.state
        state['businessRuleProperties'][property] = value
        this.setState(state)
    }

    handleValueChange = (property, propertyType) => value => {
        let state = this.state
        state['businessRuleProperties'][propertyType][property] = value
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
    /**
     * Removes the filter rule given by index
     * @param index
     */
    removeFilterRule = index => value => {
        let state = this.state
        state.businessRuleProperties['ruleComponents']['filterRules'].splice(index, 1)
        this.setState(state)
    }

    constructor(props) {
        super(props);

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
     * Re-arranges the structure of property objects of the given type, and returns them as input fields
     * @param propertiesType
     * @returns {Array}
     */
    reArrangePropertiesForDisplay(propertiesType, formMode) {
        // To store values that are going to be used
        let unArrangedPropertiesFromTemplate
        let businessRulePropertiesSubset // To get initial values with this
        let reArrangedProperties = []// To store after arranging
        // To store mapped properties as input fields
        let propertiesToDisplay

        if (formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                unArrangedPropertiesFromTemplate = this.state.inputRuleTemplate.properties
                businessRulePropertiesSubset =
                    this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                unArrangedPropertiesFromTemplate = this.state.outputRuleTemplate.properties
                businessRulePropertiesSubset =
                    this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT]
            }

            // Re-arrange properties
            for (let propertyKey in unArrangedPropertiesFromTemplate) {
                // Modify default value, as the entered property value,
                // in order to display initially in the form
                let property = unArrangedPropertiesFromTemplate[propertyKey.toString()]
                property['defaultValue'] =
                    businessRulePropertiesSubset[propertyKey.toString()]

                reArrangedProperties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            // Map each re-arranged property as an input field
            propertiesToDisplay = reArrangedProperties.map((property) =>
                <Property
                    key={property.propertyName}
                    name={property.propertyName}
                    fieldName={property.propertyObject.fieldName}
                    description={property.propertyObject.description}
                    value={property.propertyObject.defaultValue}
                    options={property.propertyObject.options}
                    onValueChange={this.handleValueChange(property.propertyName, propertiesType)}
                />
            )
        } else if (formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                unArrangedPropertiesFromTemplate = this.state.inputRuleTemplate.properties
                // businessRulePropertiesSubset =
                //     this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                unArrangedPropertiesFromTemplate = this.state.outputRuleTemplate.properties
                // businessRulePropertiesSubset =
                //     this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT]
            }

            // Re-arrange properties
            for (let propertyKey in unArrangedPropertiesFromTemplate) {
                // Modify default value, as the entered property value,
                // in order to display initially in the form
                let property = unArrangedPropertiesFromTemplate[propertyKey.toString()]
                property['defaultValue'] =
                    businessRulePropertiesSubset[propertyKey.toString()]

                reArrangedProperties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            // Map each re-arranged property as an input field
            propertiesToDisplay = reArrangedProperties.map((property) =>
                <Property
                    key={property.propertyName}
                    name={property.propertyName}
                    fieldName={property.propertyObject.fieldName}
                    description={property.propertyObject.description}
                    value={property.propertyObject.defaultValue}
                    options={property.propertyObject.options}
                    onValueChange={this.handleValueChange(property.propertyName, propertiesType)}
                />
            )
        }

        return propertiesToDisplay
    }

    /**
     * Adds a new filter rule
     */
    addFilterRule() {
        let state = this.state
        state.businessRuleProperties['ruleComponents']['filterRules'].push("  ")
        this.setState(state)
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
        // To display properties
        var inputDataPropertiesToDisplay
        var outputDataPropertiesToDisplay
        var filterRulesToDisplay
        var ruleLogicToDisplay
        var outputMappingsToDisplay

        // Submit button
        var submitButton

        // If form should be displayed to create business rule
        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
            // todo: implement
        } else if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            // If form should be displayed to edit business rule

            // Add properties of input & output templates in re-organized form to display
            inputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT,
                BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT)
            console.log(inputDataPropertiesToDisplay)
            outputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT,
                BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT)

            var outputMappings = [] // Key: input Value: output
            for (let inputKey in this.state.businessRuleProperties.outputMappings) {
                outputMappings.push({
                    propertyName: inputKey,
                    propertyObject: {
                        "fieldName": "",
                        "description": "",
                        "defaultValue": this.state.businessRuleProperties.outputMappings[inputKey.toString()]
                    }
                })
            }
            outputMappingsToDisplay = outputMappings.map((mapping, index) =>
                <TableRow key={index}>
                    <TableCell>
                        <TextField
                            id={mapping.propertyName}
                            name={mapping.propertyName}
                            label=""
                            placeholder={mapping.propertyName}
                            value={mapping.propertyName}
                            onChange={this.handleBusinessRuleNameChange}
                            disabled={true}
                        />
                    </TableCell>
                    <TableCell>
                        As
                    </TableCell>
                    <TableCell>
                        <Property
                            key={index}
                            name={mapping['propertyObject']['defaultValue']}
                            fieldName={mapping['propertyObject']['fieldName']}
                            description={mapping['propertyObject']['description']}
                            value={mapping['propertyObject']['defaultValue']}
                            onValueChange={this.handleValueChange(
                                mapping.propertyName,
                                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_PROPERTY_TYPE_OUTPUT_MAPPINGS
                            )}
                        />
                    </TableCell>
                </TableRow>
            )

            filterRulesToDisplay =
                this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS]
                    [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES]
                    .map((filterRule, index) =>
                        <FilterRule
                            key={index}
                            filterRuleIndex={index}
                            filterRule={filterRule}
                            //filterRuleAttribute={filterRule.split(" ")[0]}
                            //operator={filterRule.split(" ")[1]}
                            //attributeOrValue={filterRule.split(" ")[2]}
                            onAttributeChange={(filterRuleIndex, value) => this.handleAttributeChange(filterRuleIndex, value)}
                            onOperatorChange={(filterRuleIndex, value) => this.handleOperatorChange(filterRuleIndex, value)}
                            onAttributeOrValueChange={(filterRuleIndex, value) => this.handleAttributeOrValueChange(filterRuleIndex, value)}
                            handleRemoveFilterRule={this.removeFilterRule(index)}
                        />)

            ruleLogicToDisplay =
                <Property
                    name="ruleLogic"
                    fieldName="Rule Logic"
                    description="Enter the Rule Logic, referring filter rule numbers"
                    value={this.state.businessRuleProperties['ruleComponents']['ruleLogic'][0]}
                    onValueChange={this.handleRuleLogicChange}
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
                {/*Text field for Business Rule name*/}
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
                <br/>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">
                        Input
                    </Typography>
                    {inputDataPropertiesToDisplay}
                </Paper>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">Filters</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Attribute</TableCell>
                                <TableCell>Operator</TableCell>
                                <TableCell>Value/Attribute</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterRulesToDisplay}
                        </TableBody>
                    </Table>
                    <br/>
                    <IconButton color="primary" style={this.styles.addFilterRuleButton} aria-label="Remove"
                                onClick={(e) => this.addFilterRule()}>
                        <AddIcon/>
                    </IconButton>
                    <br/>
                    <br/>
                    {ruleLogicToDisplay}
                </Paper>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">
                        Output
                    </Typography>
                    <br/>
                    <Typography type="subheading">
                        Configurations
                    </Typography>
                    {outputDataPropertiesToDisplay}
                    <br/>
                    <br/>
                    <Typography type="subheading">
                        Mappings
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Input</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Output</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {outputMappingsToDisplay}
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
                {submitButton}
            </div>
        )
    }
}

export default BusinessRuleFromScratchForm;