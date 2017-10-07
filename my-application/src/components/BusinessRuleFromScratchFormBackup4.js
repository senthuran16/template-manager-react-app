import React from 'react';
// import './index.css';
// Material-UI
import Property from './Property';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
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
    /**
     * Updates selected Rule Template in the state,
     * when Rule Template is selected from the list
     * @param name
     */
    handleTemplateGroupSelected = event => {
        let state = this.state
        // Get selected template group & update in the state
        state['selectedTemplateGroup'] = BusinessRulesFunctions.getTemplateGroup(event.target.value)
        this.setState(state)
    }

    constructor(props) {
        super(props);
        this.state = {
            formMode: props.formMode, // 'create' or 'edit'
            templateGroups: props.templateGroups,
            selectedTemplateGroup: props.templateGroup,
            inputRuleTemplates: props.inputRuleTemplates,
            outputRuleTemplates: props.outputRuleTemplates,

            // Present only in 'edit' mode
            businessRuleName: props.businessRuleName,
            businessRuleUUID: props.businessRuleUUID,
            // Rule Templates, whose properties will be used to generate form
            selectedInputRuleTemplate: props.selectedInputRuleTemplate,
            selectedOutputRuleTemplate: props.selectedOutputRuleTemplate,

            businessRuleProperties: props.businessRuleProperties // To store values given for properties displayed in the form
        }

        // To prevent 'undefined' when updating properties, if no properties are passed during 'create' mode
        // if (!this.state.businessRuleProperties) {
        //     let state = this.state
        //     state['businessRuleProperties'] = {}
        //     this.state = state
        // }

        // Assign default values of properties as entered values in create mode
        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
            let state = this.state
            state['selectedTemplateGroup'] = {'name': '', 'uuid': ''}
            state['businessRuleProperties'] = {
                'inputData': {},
                'ruleComponents': {
                    'filterRules': [],
                    'ruleLogic': []
                },
                'outputData': {},
                'outputMappings': {}
            }
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
        let businessRulePropertiesSubset // To get initial values from the values set in state
        let reArrangedProperties = [] // To store after arranging
        // To store mapped properties as input fields
        let propertiesToDisplay

        // Form is on edit mode
        if (formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                unArrangedPropertiesFromTemplate = this.state.selectedInputRuleTemplate.properties
                businessRulePropertiesSubset =
                    this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                unArrangedPropertiesFromTemplate = this.state.selectedOutputRuleTemplate.properties
                businessRulePropertiesSubset =
                    this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT]
            }

            // Push each property in the rule template, as an object in a re-arranged format,
            // which has the original object's Key & Value
            // denoted by new Keys : 'propertyName' & 'propertyObject'
            for (let propertyKey in unArrangedPropertiesFromTemplate) {
                let property = unArrangedPropertiesFromTemplate[propertyKey.toString()]

                reArrangedProperties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                // Map each re-arranged property as an input field
                propertiesToDisplay = reArrangedProperties.map((property) =>
                    <Property
                        key={property.propertyName}
                        name={property.propertyName}
                        fieldName={property.propertyObject.fieldName}
                        description={property.propertyObject.description}
                        value={this.state['businessRuleProperties']
                            [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
                            [property.propertyName]
                        }
                        options={property.propertyObject.options}
                        onValueChange={this.handleValueChange(property.propertyName, propertiesType)}
                    />
                )
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                // Map each re-arranged property as an input field
                propertiesToDisplay = reArrangedProperties.map((property) =>
                    <Property
                        key={property.propertyName}
                        name={property.propertyName}
                        fieldName={property.propertyObject.fieldName}
                        description={property.propertyObject.description}
                        value={this.state['businessRuleProperties']
                            [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT]
                            [property.propertyName]
                        }
                        options={property.propertyObject.options}
                        onValueChange={this.handleValueChange(property.propertyName, propertiesType)}
                    />
                )
            }
        } else if (formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                // If an input rule template has been selected to get properties from it
                if (this.state.selectedInputRuleTemplate) {
                    unArrangedPropertiesFromTemplate = this.state.selectedInputRuleTemplate.properties
                    businessRulePropertiesSubset =
                        this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
                }
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                // If an output rule template has been selected to get properties from it
                if (this.state.selectedInputRuleTemplate) {
                    unArrangedPropertiesFromTemplate = this.state.selectedOutputRuleTemplate.properties
                    businessRulePropertiesSubset =
                        this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT]
                }
            }

            // Re-arrange properties
            for (let propertyKey in unArrangedPropertiesFromTemplate) {
                // Display defaultValue initially
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
        businessRuleObject['templateGroupUUID'] = this.state.selectedTemplateGroup.uuid
        businessRuleObject['ruleTemplateUUID'] = this.state.ruleTemplate.uuid
        businessRuleObject['properties'] = this.state.businessRuleProperties
    }

    render() {
        var isATemplateGroupSelected = (this.state.selectedTemplateGroup.name != '')
        var loadedRuleTemplates
        var inputRuleTemplates = []
        var outputRuleTemplates = []

        if (isATemplateGroupSelected) {
            // Input & output rule templates available under the selected template group
            loadedRuleTemplates = BusinessRulesFunctions.getRuleTemplates(this.state.selectedTemplateGroup.uuid)
            // todo: check whether API syncs continuously. If so, this is bad

            for (let ruleTemplate of loadedRuleTemplates) {
                if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_INPUT) {
                    inputRuleTemplates.push(ruleTemplate)
                } else if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_OUTPUT) {
                    outputRuleTemplates.push(ruleTemplate)
                }
            }
        }


        var templateGroupsToDisplay // To display template group selection
        var templateGroupSelectionHelperText // To display helper text under the template group

        // If a template group has been selected
        if (isATemplateGroupSelected) {
            templateGroupSelectionHelperText = this.state.selectedTemplateGroup.description
        } else {
            // Otherwise, show default helper text
            templateGroupSelectionHelperText = "Select a template group"
        }

        var templateGroupElements = this.state.templateGroups.map((templateGroup) =>
            <MenuItem key={templateGroup.uuid} value={templateGroup.uuid}>
                {templateGroup.name}
            </MenuItem>
        )

        templateGroupsToDisplay =
            <FormControl>
                <InputLabel htmlFor="templateGroup">Template Group</InputLabel>
                <Select
                    value={this.state.selectedTemplateGroup.uuid}
                    onChange={this.handleTemplateGroupSelected}
                    input={<Input id="templateGroup"/>}
                >
                    {templateGroupElements}
                </Select>
                <FormHelperText>{templateGroupSelectionHelperText}</FormHelperText>
            </FormControl>

        //////////////////////////////////////////////////////////////

        // To display input properties
        var inputRuleTemplatesToDisplay
        var inputDataPropertiesToDisplay

        // To display input rule templates & input data properties
        if (isATemplateGroupSelected) {
            var inputRuleTemplateElements = inputRuleTemplates.map((inputRuleTemplate) =>
                <MenuItem key={inputRuleTemplate.uuid} value={inputRuleTemplate.uuid}>
                    {inputRuleTemplate.name}
                </MenuItem>)

            // To display input rule templates drop down
            inputRuleTemplatesToDisplay =
                <FormControl>
                    <InputLabel htmlFor="inputRuleTemplate">Rule Template</InputLabel>
                    <Select
                        value={this.state.selectedInputRuleTemplate.uuid}
                        onChange={(e)=>this.handleInputRuleTemplateSelected(e)}
                        input={<Input id="inputRuleTemplate"/>}
                    >
                        {inputRuleTemplateElements}
                    </Select>
                    <FormHelperText>Please select an input rule template</FormHelperText>
                </FormControl>

            // To display input data properties
            inputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT,
                this.state.formMode)
        } else {
            inputRuleTemplatesToDisplay = <div></div>
            inputDataPropertiesToDisplay = <div></div>
        }


        //////////////////////////////////////////////////////////////

        // To display output properties
        var outputRuleTemplatesToDisplay
        var outputDataPropertiesToDisplay

        // To display output rule templates & input data properties
        if (isATemplateGroupSelected) {
            var outputRuleTemplateElements = outputRuleTemplates.map((outputRuleTemplate) =>
                <MenuItem key={outputRuleTemplate.uuid} value={outputRuleTemplate.uuid}>
                    {outputRuleTemplate.name}
                </MenuItem>)

            // To display output rule templates drop down
            outputRuleTemplatesToDisplay =
                <FormControl>
                    <InputLabel htmlFor="outputRuleTemplate">Rule Template</InputLabel>
                    <Select
                        value={this.state.selectedOutputRuleTemplate.uuid}
                        onChange={this.handleOutputRuleTemplateSelected}
                        input={<Input id="outputRuleTemplate"/>}
                    >
                        {outputRuleTemplateElements}
                    </Select>
                    <FormHelperText>Please select an output rule template</FormHelperText>
                </FormControl>

            // To display output data properties
            outputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT,
                this.state.formMode)

            // To display output mappings

        } else {
            outputRuleTemplatesToDisplay = <div></div>
            outputDataPropertiesToDisplay = <div></div>
        }

        //////////////////////////////////////////////////////////////

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
                    {templateGroupsToDisplay}
                </Paper>
                <Paper style={this.styles.paper}>
                    <Typography type="title">
                        Input
                    </Typography>
                    <br/>
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