import React from 'react';
// import './index.css';
// Material-UI
import Property from './Property';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
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
            paddingBottom: 15,
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
     * Handles onChange of any value for an input field for output mapping
     * @param outputFieldName
     */
    handleOutputMappingChange = (outputFieldName) => event => {
        let state = this.state
        state['businessRuleProperties']['outputMappings'][outputFieldName] = event.target.value
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

        // Deselect input & output rule templates
        state['selectedInputRuleTemplate'] = {'name' : '', 'uuid' : ''}
        state['selectedOutputRuleTemplate'] = {'name' : '', 'uuid' : ''}
        state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT] = {}
        state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT] = {}
        state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_PROPERTY_TYPE_OUTPUT_MAPPINGS] = {}

        // Input & output rule templates available under the selected template group
        let loadedRuleTemplates = BusinessRulesFunctions.getRuleTemplates(event.target.value)
        let inputRuleTemplates = []
        let outputRuleTemplates = []

        // Get input & output templates into different arrays
        for (let ruleTemplate of loadedRuleTemplates) {
            if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_INPUT) {
                inputRuleTemplates.push(ruleTemplate)
            } else if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_OUTPUT) {
                outputRuleTemplates.push(ruleTemplate)
            }
        }

        state.inputRuleTemplates = inputRuleTemplates
        state.outputRuleTemplates = outputRuleTemplates

        this.setState(state)
    }
    /**
     * Handles onChange of Input & Output rule templates selected
     * @param event
     */
    handleInputRuleTemplateSelected = event => {
        let state = this.state
        state['selectedInputRuleTemplate'] = BusinessRulesFunctions.getRuleTemplate(
            this.state.selectedTemplateGroup.uuid, event.target.value
        )
        // Set default values as inputData values in state
        for (let propertyKey in state['selectedInputRuleTemplate']['properties']) {
            state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT][propertyKey.toString()] =
                state['selectedInputRuleTemplate']['properties'][propertyKey.toString()]['defaultValue']
        }
        this.setState(state)
    }
    handleOutputRuleTemplateSelected = event => {
        let state = this.state
        state['selectedOutputRuleTemplate'] = BusinessRulesFunctions.getRuleTemplate(
            this.state.selectedTemplateGroup.uuid, event.target.value
        )
        // Set default values as outputData values in state
        for (let propertyKey in state['selectedOutputRuleTemplate']['properties']) {
            state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT][propertyKey.toString()] =
                state['selectedOutputRuleTemplate']['properties'][propertyKey.toString()]['defaultValue']
        }
        this.setState(state)
    }

    constructor(props) {
        super(props);
        this.state = {
            formMode: props.formMode, // 'create' or 'edit'
            templateGroups: props.templateGroups,
            selectedTemplateGroup: props.selectedTemplateGroup,
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

        // Assign default values of properties as entered values in create mode
        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
            let state = this.state
            state['selectedTemplateGroup'] = {'name': '', 'uuid': ''}

            state['selectedInputRuleTemplate'] = {'name': '', 'uuid': ''}
            state['selectedOutputRuleTemplate'] = {'name': '', 'uuid': ''}
            state['businessRuleProperties'] = {
                'inputData': {},
                'ruleComponents': {
                    'filterRules': ['  '],
                    'ruleLogic': ['']
                },
                'outputData': {},
                'outputMappings': {}
            }
            this.state = state
        } else {
            // To load input & output templates available under the selected template group in Edit mode
            // Input & output rule templates available under the selected template group
            let loadedRuleTemplates = BusinessRulesFunctions.getRuleTemplates(this.state.selectedTemplateGroup.uuid)
            let inputRuleTemplates = []
            let outputRuleTemplates = []

            // Get input & output templates into different arrays
            for (let ruleTemplate of loadedRuleTemplates) {
                if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_INPUT) {
                    inputRuleTemplates.push(ruleTemplate)
                } else if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_OUTPUT) {
                    outputRuleTemplates.push(ruleTemplate)
                }
            }

            // Update state with input & output rule templates
            let state = this.state
            state['inputRuleTemplates'] = inputRuleTemplates
            state['outputRuleTemplates'] = outputRuleTemplates
        }

        // To display filter rules
        // if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {
        //     let state = this.state
        //     // One empty filter rule
        //     state['businessRuleProperties'][BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS]
        //         [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES]
        //         = ["  "]
        //     // Empty rule logic
        //     state.businessRuleProperties['ruleComponents']['ruleLogic'][0] = ""
        //     this.setState(state)
        // }
    }

    /**
     * Gives field names of the given stream definition, as an array
     * @param exposedStreamDefinition
     */
    getFieldNames(streamDefinition) {
        let fieldNames = []
        for (let field in this.getFields(streamDefinition)){
            fieldNames.push(field.toString())
        }

        return fieldNames
    }

    /**
     * Gives field names as keys and types as values, of the given stream definition, as an object
     * @param streamDefinition
     * @returns {{x: string}}
     */
    getFields(streamDefinition){
        let regExp = /\(([^)]+)\)/;
        let matches = regExp.exec(streamDefinition);
        let fields = {}

        // Keep the field name and type, as each element in an array
        for (let field of matches[1].split(",")) {
            // Key: name, Value: type
            let fieldName = field.trim().split(" ")[0]
            let fieldType = field.trim().split(" ")[1]
            fields[fieldName.toString()] = fieldType
        }

        return fields
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
                        value={(this.state['businessRuleProperties']
                            [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
                            [property.propertyName])?(this.state['businessRuleProperties']
                            [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT]
                            [property.propertyName]):(property.propertyObject.defaultValue)
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
        } else {
            // Form is opened in 'create' mode

            if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT) {
                // If an input rule template has been selected to get properties from it
                if (this.state.selectedInputRuleTemplate.uuid !== '') {
                    unArrangedPropertiesFromTemplate = this.state.selectedInputRuleTemplate.properties
                }
            } else if (propertiesType === BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT) {
                // If an output rule template has been selected to get properties from it
                if (this.state.selectedOutputRuleTemplate.uuid !== '') {
                    unArrangedPropertiesFromTemplate = this.state.selectedOutputRuleTemplate.properties
                }
            }

            // Re-arrange properties
            for (let propertyKey in unArrangedPropertiesFromTemplate) {
                // Display defaultValue initially
                let property = unArrangedPropertiesFromTemplate[propertyKey.toString()]

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
                    value={(this.state.businessRuleProperties
                        [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT][property.propertyName]) ?
                        (this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT][property.propertyName]) :
                        (property.propertyObject.defaultValue)}
                    // value={property.propertyObject.defaultValue}
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
        let state = this.state
        var businessRuleObject = {}
        businessRuleObject['uuid'] = state.businessRuleUUID
        businessRuleObject['name'] = state.businessRuleName
        businessRuleObject['templateGroupUUID'] = state.selectedTemplateGroup.uuid
        businessRuleObject['inputRuleTemplateUUID'] = state.selectedInputRuleTemplate.uuid
        businessRuleObject['outputRuleTemplateUUID'] = state.selectedOutputRuleTemplate.uuid
        businessRuleObject['type'] = BusinessRulesConstants.BUSINESS_RULE_TYPE_SCRATCH
        businessRuleObject['properties'] = state.businessRuleProperties
    }

    render() {
        // BUSINESS RULE NAME //////////////////////////////////////////////////////////////////////////////////////////
        var businessRuleNameToDisplay

        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            businessRuleNameToDisplay =
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
        } else {
            businessRuleNameToDisplay =
                <TextField
                    id="businessRuleName"
                    name="businessRuleName"
                    label="Business Rule name"
                    placeholder="Please enter"
                    required={true}
                    onChange={this.handleBusinessRuleNameChange}
                />
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // TEMPLATE GROUP //////////////////////////////////////////////////////////////////////////////////////////////
        var templateGroupsToDisplay

        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            // Disabled for Edit mode
            templateGroupsToDisplay =
                <TextField
                    id="templateGroup"
                    name="templateGroup"
                    label="Template Group"
                    placeholder="Template Group"
                    value={this.state.selectedTemplateGroup.name}
                    helperText={this.state.selectedTemplateGroup.description}
                    required={true}
                    disabled={true}
                />
        } else {
            let templateGroupElementsToDisplay = this.state.templateGroups.map((templateGroup) =>
                <MenuItem key={templateGroup.uuid}
                          value={templateGroup.uuid}>
                    {templateGroup.name}
                </MenuItem>
            )

            let templateGroupHelperText = "Please select a template group"

            if (this.state.selectedTemplateGroup.uuid != '') {
                templateGroupHelperText = this.state.selectedTemplateGroup.description
            }

            templateGroupsToDisplay =
                <FormControl>
                    <InputLabel htmlFor="templateGroup">Template Group</InputLabel>
                    <Select
                        value={this.state.selectedTemplateGroup.uuid}
                        onChange={this.handleTemplateGroupSelected}
                        input={<Input id="templateGroup"/>}
                    >
                        {templateGroupElementsToDisplay}
                    </Select>
                    <FormHelperText>{templateGroupHelperText}</FormHelperText>
                </FormControl>
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // INPUT PROPERTIES ////////////////////////////////////////////////////////////////////////////////////////////
        // To display input properties
        var inputRuleTemplatesToDisplay
        var inputDataPropertiesToDisplay

        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            var inputRuleTemplateElements = this.state.inputRuleTemplates.map((inputRuleTemplate) =>
                <MenuItem key={inputRuleTemplate.uuid} value={inputRuleTemplate.uuid}>
                    {inputRuleTemplate.name}
                </MenuItem>)

            // To display input rule templates drop down
            inputRuleTemplatesToDisplay =
                <FormControl>
                    <InputLabel htmlFor="inputRuleTemplate">Rule Template</InputLabel>
                    <Select
                        value={this.state.selectedInputRuleTemplate.uuid}
                        onChange={this.handleInputRuleTemplateSelected} // todo: recheck
                        input={<Input id="inputRuleTemplate"/>}
                    >
                        {inputRuleTemplateElements}
                    </Select>
                    <FormHelperText>{this.state.selectedInputRuleTemplate.description}</FormHelperText>
                </FormControl>

            // To display input data properties
            inputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT,
                this.state.formMode)
        } else {
            // To display the helper text
            let inputRuleTemplateHelperText
            if (this.state.selectedInputRuleTemplate.uuid === '') {
                inputRuleTemplateHelperText = 'Select an input rule template'
            } else {
                inputRuleTemplateHelperText = this.state.selectedInputRuleTemplate.description
            }

            // If a template group has been selected
            if (this.state.selectedTemplateGroup.uuid !== '') {
                var inputRuleTemplateElements = this.state.inputRuleTemplates.map((inputRuleTemplate) =>
                    <MenuItem key={inputRuleTemplate.uuid} value={inputRuleTemplate.uuid}>
                        {inputRuleTemplate.name}
                    </MenuItem>)

                // To display input rule templates drop down
                inputRuleTemplatesToDisplay =
                    <FormControl>
                        <InputLabel htmlFor="inputRuleTemplate">Rule Template</InputLabel>
                        <Select
                            value={this.state.selectedInputRuleTemplate['uuid']}
                            onChange={this.handleInputRuleTemplateSelected} // todo: recheck
                            input={<Input id="inputRuleTemplate"/>}
                        >
                            {inputRuleTemplateElements}
                        </Select>
                        <FormHelperText>{inputRuleTemplateHelperText}</FormHelperText>
                    </FormControl>

                // If an input rule template has been selected
                if (this.state.selectedInputRuleTemplate.uuid != '') {
                    // To display input data properties
                    inputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                        BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT,
                        this.state.formMode)
                } else {
                    inputDataPropertiesToDisplay =
                        <Typography type="body2">
                            Please select an input rule template
                        </Typography>
                }

            } else {
                inputRuleTemplatesToDisplay =
                    <Typography type="body2">
                        Please select a template group
                    </Typography>
                inputDataPropertiesToDisplay =
                    <Typography type="body2">
                        Please select a template group and an input rule template
                    </Typography>
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // OUTPUT PROPERTIES ////////////////////////////////////////////////////////////////////////////////////////////
        // To display output properties
        var outputRuleTemplatesToDisplay
        var outputDataPropertiesToDisplay

        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            var outputRuleTemplateElements = this.state.outputRuleTemplates.map((outputRuleTemplate) =>
                <MenuItem key={outputRuleTemplate.uuid} value={outputRuleTemplate.uuid}>
                    {outputRuleTemplate.name}
                </MenuItem>)

            // To display output rule templates drop down
            outputRuleTemplatesToDisplay =
                <FormControl>
                    <InputLabel htmlFor="outputRuleTemplate">Rule Template</InputLabel>
                    <Select
                        value={this.state.selectedOutputRuleTemplate.uuid}
                        onChange={this.handleOutputRuleTemplateSelected} // todo: recheck
                        input={<Input id="outputRuleTemplate"/>}
                    >
                        {outputRuleTemplateElements}
                    </Select>
                    <FormHelperText>{this.state.selectedOutputRuleTemplate.description}</FormHelperText>
                </FormControl>

            // To display output data properties
            outputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT,
                this.state.formMode)
        } else {
            // To display the helper text
            let outputRuleTemplateHelperText
            if (this.state.selectedOutputRuleTemplate.uuid === '') {
                outputRuleTemplateHelperText = 'Select an output rule template'
            } else {
                outputRuleTemplateHelperText = this.state.selectedOutputRuleTemplate.description
            }

            // If a template group has been selected
            if (this.state.selectedTemplateGroup.uuid !== '') {
                var outputRuleTemplateElements = this.state.outputRuleTemplates.map((outputRuleTemplate) =>
                    <MenuItem key={outputRuleTemplate.uuid} value={outputRuleTemplate.uuid}>
                        {outputRuleTemplate.name}
                    </MenuItem>)

                // To display output rule templates drop down
                outputRuleTemplatesToDisplay =
                    <FormControl>
                        <InputLabel htmlFor="outputRuleTemplate">Rule Template</InputLabel>
                        <Select
                            value={this.state.selectedOutputRuleTemplate['uuid']}
                            onChange={this.handleOutputRuleTemplateSelected} // todo: recheck
                            input={<Input id="outputRuleTemplate"/>}
                        >
                            {outputRuleTemplateElements}
                        </Select>
                        <FormHelperText>{outputRuleTemplateHelperText}</FormHelperText>
                    </FormControl>

                // If an output rule template has been selected
                if (this.state.selectedOutputRuleTemplate.uuid != '') {
                    // To display output data properties
                    outputDataPropertiesToDisplay = this.reArrangePropertiesForDisplay(
                        BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT,
                        this.state.formMode)
                } else {
                    outputDataPropertiesToDisplay =
                        <Typography type="body2">
                            Please select an output rule template
                        </Typography>
                }

            } else {
                outputRuleTemplatesToDisplay =
                    <Typography type="body2">
                        Please select a template group
                    </Typography>
                outputDataPropertiesToDisplay =
                    <Typography type="body2">
                        Please select a template group and an output rule template
                    </Typography>
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // FILTERS /////////////////////////////////////////////////////////////////////////////////////////////////////

        var filterRulesToDisplay
        var ruleLogicToDisplay
        var propertyOptions = null

        var exposedInputStreamFields = null // To send selectable field options to each filter rule

        // If a template group & input rule template has been selected
        if ((this.state.selectedTemplateGroup.uuid !== '') &&
            (this.state.selectedInputRuleTemplate.uuid !== '')) {
            // Get field names and types from the exposed input stream
            exposedInputStreamFields = this.getFields(this.state.selectedInputRuleTemplate['templates'][0]['exposedStreamDefinition'])
        }

        //if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
        filterRulesToDisplay =
            this.state.businessRuleProperties[BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS]
                [BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_RULE_COMPONENT_PROPERTY_TYPE_FILTER_RULES]
                .map((filterRule, index) =>
                    <FilterRule
                        key={index}
                        filterRuleIndex={index}
                        filterRule={filterRule}
                        exposedInputStreamFields={exposedInputStreamFields}
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
        //}

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // OUTPUT MAPPINGS /////////////////////////////////////////////////////////////////////////////////////////////
        var outputMappingsToDisplay

        // If a template group, an input rule template, and an output rule template have been selected
        if ((this.state.selectedTemplateGroup.uuid !== '') &&
            (this.state.selectedInputRuleTemplate.uuid !== '') &&
            (this.state.selectedOutputRuleTemplate.uuid !== '')) {
            // Each field of the exposed output stream, must be mapped with an available field in the exposed input stream
            var exposedOutputStreamFieldNames =
                this.getFieldNames(this.state.selectedOutputRuleTemplate['templates'][0]['exposedStreamDefinition'])
            var exposedInputStreamFieldNames =
                this.getFieldNames(this.state.selectedInputRuleTemplate['templates'][0]['exposedStreamDefinition'])

            // Each drop down will have fields of the exposed input stream as options
            var inputStreamFieldsToMap = exposedInputStreamFieldNames.map((fieldName, index) =>
                <MenuItem key={index}
                          value={fieldName}>
                    {fieldName}
                </MenuItem>
            )

            // To display a row for each output field map
            let outputMappingElementsToDisplay = exposedOutputStreamFieldNames.map((fieldName, index) =>
                <TableRow key={index}>
                    <TableCell>
                        <FormControl>
                            <Select
                                // No value when no mapping is specified
                                // (used when a different output rule template is selected)
                                value={(this.state['businessRuleProperties']['outputMappings'][fieldName]) ?
                                    (this.state['businessRuleProperties']['outputMappings'][fieldName]) : ''}
                                onChange={this.handleOutputMappingChange(fieldName)} //todo: check the method
                                input={<Input id="templateGroup"/>}
                            >
                                {inputStreamFieldsToMap}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell>
                        As
                    </TableCell>
                    <TableCell>
                        <TextField
                            disabled
                            id={fieldName}
                            name={fieldName}
                            value={fieldName}
                            margin="normal"
                        />
                    </TableCell>
                </TableRow>
            )

            outputMappingsToDisplay =
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Input</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Output</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {outputMappingElementsToDisplay}
                    </TableBody>
                </Table>
        } else {
            outputMappingsToDisplay =
                <Typography type="body2">
                    Please select an input rule template and an output rule template
                </Typography>

        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // SUBMIT BUTTON ///////////////////////////////////////////////////////////////////////////////////////////////

        // Submit button
        var submitButton

        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            // Update button
            submitButton =
                <Button raised color="primary" style={this.styles.button}
                        onClick={(e) => this.createBusinessRuleObject()}>
                    Update
                </Button>
        } else {
            // Create button
            submitButton =
                <Button raised color="primary" style={this.styles.button}
                        onClick={(e) => this.createBusinessRuleObject()}>
                    Create
                </Button>
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        return (
            <div>
                <br/>
                {businessRuleNameToDisplay}
                <br/>
                <br/>
                <Paper style={this.styles.paper}>
                    {templateGroupsToDisplay}
                </Paper>
                <br/>
                <Paper style={this.styles.paper}>
                    <Typography type="title">
                        Input
                    </Typography>
                    <br/>
                    {inputRuleTemplatesToDisplay}
                    <br/>
                    <br/>
                    <br/>
                    <Typography type="subheading">
                        Configurations
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
                    {outputRuleTemplatesToDisplay}
                    <br/>
                    <br/>
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
                    {outputMappingsToDisplay}
                </Paper>
                <br/>
                {submitButton}
            </div>
        )
    }
}

export default BusinessRuleFromScratchForm;