import React from 'react';
// import './index.css';
// Material-UI
import Property from './Property';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";

/**
 * Represents a form, shown to for Business Rules from template
 */
class BusinessRuleFromTemplateForm extends React.Component {
    // Button Style
    styles = {
        button: {
            backgroundColor: '#EF6C00'
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
        this.state = {
            formMode: props.formMode, // 'create' or 'edit'
            businessRuleName: props.businessRuleName,
            businessRuleUUID: props.businessRuleUUID,
            templateGroup: props.templateGroup,
            ruleTemplate: props.ruleTemplate, // Rule Templates, whose properties will be used to generate form
            businessRuleProperties: props.businessRuleProperties // To store values given for properties displayed in the form
        }

        // To prevent 'undefined' when updating properties, when no properties are passed during 'create' mode
        if (!this.state.businessRuleProperties) {
            let state = this.state
            state['businessRuleProperties'] = {}
            this.state = state
        }
    }

    /**
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

        // To store properties in re-arranged format, in order to generate fields
        var properties = []

        // Business Rule Name text field
        var businessRuleNameTextField
        // Submit button
        var submitButton

        // If form should be displayed for Creating a business rule
        if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE) {

            // Push each property in the rule template, as an object in a new format,
            // which has the original object's Key & Value
            // denoted by new Keys : 'propertyName' & 'propertyObject'
            for (let propertyKey in this.state.ruleTemplate.properties) {
                properties.push({
                    propertyName: propertyKey,
                    propertyObject: this.state.ruleTemplate.properties[propertyKey.toString()]
                })
            }

            // To display each property as an input field
            propertiesToDisplay = properties.map((property) =>
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

            // Text field to enter Business Rule name
            businessRuleNameTextField =
                <TextField
                    id="businessRuleName"
                    name="businessRuleName"
                    label="Business Rule name"
                    placeholder="Please enter"
                    required={true}
                    onChange={this.handleBusinessRuleNameChange}
                />

            // Create button
            submitButton =
                <Button raised color="primary" style={this.styles.button}
                        onClick={(e) => this.createBusinessRuleObject()}>
                    Create
                </Button>
        } else if (this.state.formMode === BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT) {
            // If form should be displayed for Editing a business rule

            // Push each property in the rule template, as an object in a new format,
            // which has the original object's Key & Value
            // denoted by new Keys : 'propertyName' & 'propertyObject'
            for (let propertyKey in this.state.ruleTemplate.properties) {
                // Modify default value, as the entered property value,
                // in order to display initially in the form
                let property = this.state.ruleTemplate.properties[propertyKey.toString()]
                property['defaultValue'] = this.state.businessRuleProperties[propertyKey.toString()]

                properties.push({
                    propertyName: propertyKey,
                    propertyObject: property
                })
            }

            // To display each property as an input field
            propertiesToDisplay = properties.map((property) =>
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
                {propertiesToDisplay}
                <br/>
                {submitButton}
            </div>
        )
    }
}

export default BusinessRuleFromTemplateForm;
