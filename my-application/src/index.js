// todo: bind handleClicks in the new way
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// Material-UI
import * as classes from "react/lib/ReactDOMFactories";
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Card, {CardContent, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import {SnackbarContent} from 'material-ui/Snackbar';

/**
 * Starting point of Creating / Modifying Business Rules
 */
class BusinessRules extends React.Component {
    render() {
        return (
            <div>
                <Typography type="headline" component="h2">
                    Business Rules
                </Typography>
                <br/>
                <div>
                    <Card>
                        <CardHeader title="Select one of the following two options"/>
                        <CardContent>
                            <Button raised color="primary"
                                    onClick={(e) => runBusinessRuleCreator()}>
                                Create a Business Rule
                            </Button>
                            &nbsp;&nbsp;
                            {/*todo: Remove hard code*/}
                            <Button raised color="default"
                                    onClick={(e) => runBusinessRuleModifier()}>
                                Modify a Business Rule
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

/**
 * Listing Template Groups and filtering them for creating Business Rules,
 * will happen within this component
 */
class BusinessRulesCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroups: props.templateGroups
        }
    }

    render() {
        // Display available Template Groups as thumbnails
        const templateGroups = this.state.templateGroups.map((templateGroup) =>
            <TemplateGroup
                key={templateGroup.name}
                name={templateGroup.name}
                description={templateGroup.description}
                ruleTemplates={templateGroup.ruleTemplates}
                viewAs="thumbnail"
            />
        );

        return (
            <div>
                <Typography type="headline" component="h2">
                    Template Groups
                </Typography>
                <br/>
                <div>
                    {templateGroups}
                </div>
            </div>
        );
    }
}

/**
 * Listing Business Rules in order to Edit and Delete,
 * will happen within this component
 */
class BusinessRulesModifier extends React.Component { //todo: just hard coded. remove them
    constructor(props) {
        super(props);
        this.state = {
            businessRules: props.businessRules
        }
    }

    render() {
        // Display available Business Rules as thumbnails
        const businessRules = this.state.businessRules.map((businessRule) =>
            <BusinessRule
                key={businessRule.uuid}
                uuid={businessRule.uuid}
                name={businessRule.name}
                templateGroupName={businessRule.templateGroupName}
                ruleTemplateName={businessRule.ruleTemplateName}
                type={businessRule.type}
                properties={businessRule.properties}
            />
        )

        return (
            <div>
                <Typography type="headline" component="h2">
                    Business Rules
                </Typography>
                <br/>
                <div>
                    {businessRules}
                </div>
            </div>);
    }
}

/**
 * Represents Template Group
 */
class TemplateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            ruleTemplates: props.ruleTemplates,
            // "thumbnail" when displaying available Template Groups
            // "parent" when displaying available Rule Templates under this
            viewAs: props.viewAs
        }
    }

    render() {
        // View Template Group as a thumbnail
        if (this.state.viewAs === "thumbnail") {
            return (
                <div>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="TemplateGroup" className={classes.avatar}>
                                    {this.state.name[0]}
                                </Avatar>
                            }
                            title={this.state.name}
                        />
                        <CardContent>
                            <Typography component="p">
                                {this.state.description}
                            </Typography>
                            <br/>
                            <Button dense color="primary" onClick={(e) => displayRuleTemplates(this.state)}>
                                View Rule Templates
                            </Button>
                        </CardContent>

                    </Card>
                    <br/>
                </div>
            );
        } else {
            // View each Rule Template under this Template Group, as a thumbnail
            // todo: map and return Rule Templates under this
            const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
                <RuleTemplate
                    key={ruleTemplate.name}
                    templateGroup={this.state}
                    name={ruleTemplate.name}
                    type={ruleTemplate.type}
                    instanceCount={ruleTemplate.instanceCount}
                    script={ruleTemplate.script}
                    description={ruleTemplate.description}
                    templates={ruleTemplate.templates}
                    properties={ruleTemplate.properties}
                    viewAs="thumbnail"
                />);
            return (
                <div>
                    <Typography type="headline" component="h2">
                        Rule Templates
                    </Typography>
                    <Typography type="subheading" color="secondary">
                        {this.state.name}
                    </Typography>
                    <Typography component="p">
                        {this.state.description}
                    </Typography>
                    <br/>
                    <div>
                        {ruleTemplates}
                    </div>
                </div>);
        }
    }
}

/**
 * Represents Rule Template
 */
class RuleTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroup: props.templateGroup, // Parent object
            templateGroupName: props.templateGroupName,
            name: props.name,
            type: props.type,
            instanceCount: props.instanceCount,
            script: props.script,
            description: props.description,
            templates: props.templates,
            properties: props.properties,
            // "thumbnail" when displaying available Template Groups
            // "parent" when displaying available Rule Templates under this
            viewAs: props.viewAs
        }
    }

    render() {
        if (this.state.viewAs === "thumbnail") {

            return (
                <div>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="RuleTemplate" className={classes.avatar}>
                                    {this.state.name[0]}
                                </Avatar>
                            }
                            title={this.state.name}
                        />
                        <CardContent>
                            <Typography component="p">
                                {this.state.description}
                            </Typography>
                            <br/>
                            <Typography component="p">
                                Type : {this.state.type}<br/>
                                Instance Count : {this.state.instanceCount}<br/>
                            </Typography>
                            <br/>
                            <Button dense color="primary"
                                    onClick={(e) =>
                                        displayCreateBusinessRuleForm(this.state)
                                    }>
                                Create Business Rule
                            </Button>
                        </CardContent>
                    </Card>
                    <br/>
                </div>
            );


        }
    }
}

/**
 * Represents Business Rule form
 */
class BusinessRuleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroup: props.templateGroup,
            ruleTemplate: props.ruleTemplate,
            properties: props.properties,
            mode: props.mode,
            businessRuleName: props.businessRuleName // Only available when mode is 'edit'
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    // Handles text field change for Business Rule name
    handleTextChange(event) {
        // todo: (!) Look into this
        // Get properties available until now
        let businessRuleProperties = businessRuleEnteredProperties
        // Add a new Key Value pair denoting the target's name & value,
        businessRuleProperties[event.target.name.toString()] = event.target.value

        // Update the existing properties object
        businessRuleEnteredProperties = businessRuleProperties
    }

    render() {
        // Convert objects, to an objects array
        var propertiesArray = []
        for (var propertyKey in this.state.properties) {
            var propertyKeyString = propertyKey.toString()
            // Push as an object,
            // which has the original object's Key & Value
            // denoted by new Keys : 'propertyName' & 'propertyObject
            propertiesArray.push(
                {
                    propertyName: propertyKey,
                    propertyObject: this.state.properties[propertyKeyString]
                }
            )
        }
        const properties = propertiesArray.map((property) =>
            <Property
                key={property.propertyName}
                name={property.propertyName}
                description={property.propertyObject.description}
                defaultValue={property.propertyObject.defaultValue}
                type={property.propertyObject.type}
                options={property.propertyObject.options}
            />
        );

        var displayMode // For the heading
        var businessRuleNameTextField // For the businessRuleName text field
        var submitButton // For the button at the end of form

        // Create BusinessRule
        if (this.state.mode === "create") {
            displayMode = "Create"
            businessRuleNameTextField =
                <TextField
                    id="businessRuleName"
                    name="businessRuleName"
                    label="Business Rule name"
                    placeholder="Please enter"
                    required={true}
                    onChange={this.handleTextChange}
                />
            submitButton =
                <Button raised color="primary"
                        onClick={(e) => prepareBusinessRule()}>Create</Button>
        } else {
            // Edit BusinessRule

            displayMode = "Edit"
            businessRuleNameTextField =
                <TextField
                    id="businessRuleName"
                    name="businessRuleName"
                    label="Business Rule name"
                    placeholder="Please enter"
                    value={this.state.businessRuleName}
                    required={true}
                    onChange={this.handleTextChange}
                    disabled={true}
                />
            submitButton =
                <Button raised color="primary"
                        onClick={(e) => console.log("TODO: Edit Business Rule")}>Update</Button>
        }


        return (
            <div>
                <Typography type="headline" component="h2">
                    {displayMode} Business Rule
                </Typography>
                <Typography type="subheading" color="secondary">
                    {this.state.templateGroup.name} -> {this.state.ruleTemplate.name}
                </Typography>
                <Typography component="p">
                    {this.state.ruleTemplate.description}
                </Typography>
                <br/>
                <div>
                    {businessRuleNameTextField}
                    <br/>
                </div>
                <div>
                    {properties}<br/>
                    {submitButton}
                </div>
            </div>
        );
    }

}

/**
 * Represents Property, which is going to be shown as an input element
 */
class Property extends React.Component {
    // Handles onChange of Radio button
    handleSelectChange = name => event => {
        this.setState(
            {value: event.target.value}
        )
        // Get properties available until now
        let businessRuleProperties = businessRuleEnteredProperties
        // Add a new Key Value pair denoting the target's name & value,
        businessRuleProperties[name] = event.target.value

        // Update the existing properties object
        businessRuleEnteredProperties = businessRuleProperties
    }

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            defaultValue: props.defaultValue,
            value: props.defaultValue,
            type: props.type,
            options: props.options,
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        businessRuleEnteredProperties[this.state.name] = this.state.defaultValue
    }

    // Handles onChange of Text Fields
    handleTextChange(event, value) {
        this.setState({
            value: value
        })

        // todo: (!) Look into this
        // Get properties available until now
        let businessRuleProperties = businessRuleEnteredProperties
        // Add a new Key Value pair denoting the target's name & value,
        businessRuleProperties[event.target.name.toString()] = event.target.value

        // Update the existing properties object
        businessRuleEnteredProperties = businessRuleProperties
    }

    // Renders each Property either as a TextField or Radio Group, with default values and elements as specified
    render() {
        if (this.state.type === "options") {
            const options = this.state.options.map((option) => (
                <MenuItem key={option} name={option} value={option}>{option}</MenuItem>))
            return (
                <div>
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={this.state.name}>{this.state.name}</InputLabel>
                        <Select
                            value={this.state.value}
                            onChange={this.handleSelectChange(this.state.name)}
                            input={<Input id={this.state.name}/>}
                        >
                            {options}
                        </Select>
                        <FormHelperText>{this.state.description}</FormHelperText>
                    </FormControl>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    <TextField
                        required
                        id={this.state.name}
                        name={this.state.name}
                        label={this.state.name}
                        defaultValue={this.state.defaultValue}
                        helperText={this.state.description}
                        margin="normal"
                        onChange={this.handleTextChange}
                    />
                    <br/>
                </div>
            );
        }
    }
}

/**
 * Represents a BusinessRule, that is already created and available
 */
class BusinessRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: this.props.uuid,
            name: this.props.name,
            templateGroupName: this.props.templateGroupName,
            ruleTemplateName: this.props.ruleTemplateName,
            type: this.props.type,
            properties: this.props.properties
        }
    }

    // Displays each available Business Rule as a thumbnail, with options to Edit & Delete
    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="BusinessRule" className={classes.avatar}>
                                {this.state.name[0]}
                            </Avatar>
                        }
                        title={this.state.name}
                    />
                    <CardContent>
                        <Typography component="p">
                            Type : {this.state.type}<br/>
                        </Typography>
                        <br/>

                        <IconButton aria-label="Edit"
                                    onClick={(e) =>
                                        displayEditBusinessRuleForm(
                                            this.state.templateGroupName,
                                            this.state.ruleTemplateName,
                                            this.state)}>
                            <ModeEditIcon/>
                        </IconButton>
                        <IconButton aria-label="Delete"
                                    onClick={(e) => console.log("[Test] Sent delete request for BR data, to API")}>
                            <DeleteIcon/>
                        </IconButton>
                    </CardContent>
                </Card>
                <br/>
            </div>
        );
    }

}

/* Start of Methods related to API calls **************************************/

/** [1]
 * Gets available TemplateGroups
 * todo: from API
 *
 * @returns {Array}
 */
function getTemplateGroups() {
    // todo: remove hardcode *****************************
    var receivedTemplateGroups = [
        {
            "name": "SensorDataAnalysis1",
            "description": "Collection for sensor data analysis(1)",
            "ruleTemplates": [
                {
                    "name": "SensorAnalytics1",
                    "type": "app",
                    "instanceCount": "many",
                    "script": "<script> (optional)",
                    "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice (1)",
                    "templates": [
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        },
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property2} insert into ${outStream2}>"
                        }
                    ],
                    "properties": {
                        "inStream1": {
                            "description": "Input Stream",
                            "defaultValue": "myInputStream1",
                            "type": "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        "property1": {
                            "description": "Unique Identifier for the sensor",
                            "defaultValue": "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        "property2": {
                            "description": "Type of value, the sensor measures",
                            "defaultValue": "sensorValue",
                            "type": "String"
                        },
                        "outStream1": {
                            "description": "Output Stream 1",
                            "defaultValue": "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        },
                        "outStream2": {
                            "description": "Output Stream 2",
                            "defaultValue": "myOutputStream2",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    }
                },
                {
                    "name": "SensorLoggings1",
                    "type": "<app>",
                    "instanceCount": "many",
                    "script": "<script> (optional)",
                    "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice (1)",
                    "templates": [
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        }
                    ],
                    "properties": {
                        "inStream1": {
                            "description": "Input Stream",
                            "defaultValue": "myInputStream1",
                            "type": "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        "property1": {
                            "description": "Unique Identifier for the sensor",
                            "defaultValue": "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        "outStream1": {
                            "description": "Output Stream 1",
                            "defaultValue": "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    }
                }
            ]
        },
        {
            "name": "SensorDataAnalysis2",
            "description": "Collection for sensor data analysis(2)",
            "ruleTemplates": [
                {
                    "name": "SensorAnalytics2",
                    "type": "app",
                    "instanceCount": "many",
                    "script": "<script> (optional)",
                    "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice (2)",
                    "templates": [
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        },
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property2} insert into ${outStream2}>"
                        }
                    ],
                    "properties": {
                        "inStream1": {
                            "description": "Input Stream",
                            "defaultValue": "myInputStream1",
                            "type": "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        "property1": {
                            "description": "Unique Identifier for the sensor",
                            "defaultValue": "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        "property2": {
                            "description": "Type of value, the sensor measures",
                            "defaultValue": "sensorValue",
                            "type": "String"
                        },
                        "outStream1": {
                            "description": "Output Stream 1",
                            "defaultValue": "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        },
                        "outStream2": {
                            "description": "Output Stream 2",
                            "defaultValue": "myOutputStream2",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    }
                },
                {
                    "name": "SensorLoggings2",
                    "type": "<app>",
                    "instanceCount": "many",
                    "script": "<script> (optional)",
                    "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice (2)",
                    "templates": [
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        }
                    ],
                    "properties": {
                        "inStream1": {
                            "description": "Input Stream",
                            "defaultValue": "myInputStream1",
                            "type": "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        "property1": {
                            "description": "Unique Identifier for the sensor",
                            "defaultValue": "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        "outStream1": {
                            "description": "Output Stream 1",
                            "defaultValue": "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    }
                }
            ]
        }
    ]

    return receivedTemplateGroups
    // todo: *********************************************
    // todo: Get TemplateGroups from API
}

/** [2]
 * Get available RuleTemplates, belong to the given TemplateGroup
 * todo: from API
 *
 * @param templateGroupName
 */
function getRuleTemplates(templateGroupName) {
    // todo: remove hardcode ******************************
    var templateGroups = availableTemplateGroups
    for (let templateGroup of templateGroups) {
        if (templateGroup.name === templateGroupName) {
            return templateGroup.ruleTemplates
        }
    }
    // todo: **********************************************
    // todo: Return RuleTemplates from API
}

/** [3]
 * Get available Properties, belong to the given TemplateGroup and RuleTemplate
 * todo: from API
 *
 * @param templateGroupName
 * @param ruleTemplateName
 * @returns {*|Array}
 */
function getRuleTemplateProperties(templateGroupName, ruleTemplateName) {
    // todo: remove hardcode ******************************
    var ruleTemplates
    for (let templateGroup of availableTemplateGroups) {
        if (templateGroup.name === templateGroupName) {
            ruleTemplates = templateGroup.ruleTemplates
            break
        }
    }
    for (let ruleTemplate of ruleTemplates) {
        if (ruleTemplate.name === ruleTemplateName) {
            return ruleTemplate.properties
        }
    }
    // todo: **********************************************
    // todo: Return Properties from API
}

// API [4] is the POST for CreateBusinessRule

/** [5]
 * Gets available BusinessRules
 * todo: from API
 *
 * @returns {[null,null]}
 */
function getBusinessRules() {
    // todo: remove hardcode *****************************
    var receivedBusinessRules = [
        {
            "uuid": "aaabbbcccddd",
            "name": "TemperatureLoggings",
            "templateGroupName": "SensorDataAnalysis1",
            "ruleTemplateName": "SensorLoggings1",
            "type": "template",
            "properties": {
                "inStream1": "myInputStream1",
                "property1": "sensorName",
                "outStream1": "myOutputStream1"
            }
        },
        {
            "uuid": "eeefffggghhh",
            "name": "HumidityAnalytics",
            "templateGroupName": "SensorDataAnalysis1",
            "ruleTemplateName": "SensorAnalytics1",
            "type": "template",
            "properties": {
                "inStream1": "myInputStream2",
                "property1": "sensorID",
                "property2": "humidity",
                "outStream1": "myOutputStream2",
                "outStream2": "myOutputStream1"
            }
        }
    ]

    return receivedBusinessRules
    // todo: *********************************************
    // todo: Get BusinessRules from API ******************
}

/** [6]
 * Gets the BusinessRule with the given UUID
 * todo: from API
 *
 * @param businessRuleUUID
 * @returns {null|null}
 */
function getBusinessRule(businessRuleUUID) {
    // todo: remove hardcode ******************************
    for (let businessRule of availableBusinessRules) {
        if (businessRuleUUID === businessRule.uuid) {
            return businessRule
        }
    }
    // todo: *********************************************
    // todo: Get BusinessRule from API *******************

}

/**
 * Gets properties of the RuleTemplate specified in the BusinessRule,
 * with defaultValues replaced with the entered properties in the BusinessRule
 * todo: (Q) Can we have an API for this and do this in backend? (better)
 * todo: name can be 'getBusinessRulePropertiesMapped'
 *
 * @param businessRuleUUID
 * @returns {*|Array}
 */
function getMappedProperties(businessRuleUUID) {
    var foundBusinessRule = getBusinessRule(businessRuleUUID)
    var foundBusinessRuleProperties = foundBusinessRule.properties

    if (foundBusinessRule.type === "template") { //todo: confirm the string
        // Get property type, description and etc. from specified RuleTemplate
        var templateGroupName = foundBusinessRule.templateGroupName
        var ruleTemplateName = foundBusinessRule.ruleTemplateName

        var ruleTemplateProperties = getRuleTemplateProperties(templateGroupName, ruleTemplateName)

        var modifiedProperties = ruleTemplateProperties
        // Replace each property's default value with entered values
        // because, entered values are going to be displayed todo: (Q) Is this ok
        for (let propertyName in modifiedProperties) {
            // Update defaultValue with entered value
            modifiedProperties[propertyName]["defaultValue"] = foundBusinessRuleProperties[propertyName]
        }

        return modifiedProperties
    } else {
        console.log("From Scratch is not supported yet") // todo
    }
}

// Functions that have API calls unnecessarily /////////////////////////////////
/**
 * Gets the TemplateGroup with the given name
 * todo: from API (We have available templateGroups in front end itself)
 *
 * @param templateGroupName
 * @returns {*}
 */
function getTemplateGroup(templateGroupName) {
    // todo: remove hardcode ******************************
    for (let templateGroup of availableTemplateGroups) {
        if (templateGroup.name === templateGroupName) {
            return templateGroup
        }
    }
    // todo: **********************************************
    // todo: Return TemplateGroup from API
}

/**
 * Gets the RuleTemplate with the given name, that belongs to the given TemplateGroup name
 * todo: from API (We have available templateGroups in front end itself)
 *
 * @param templateGroupName
 * @param ruleTemplateName
 * @returns {*}
 */
function getRuleTemplate(templateGroupName, ruleTemplateName) {
    // todo: remove hardcode ******************************
    var ruleTemplates
    for (let templateGroup of availableTemplateGroups) {
        if (templateGroup.name === templateGroupName) {
            ruleTemplates = templateGroup.ruleTemplates
            break
        }
    }
    for (let ruleTemplate of ruleTemplates) {
        if (ruleTemplate.name === ruleTemplateName) {
            return ruleTemplate
        }
    }
    // todo: **********************************************
    // todo: Return RuleTemplate from API
}

// End of Functions that have API calls unnecessarily //////////////////////////

/* End of Methods related to API calls ****************************************/

/**
 * Starts and runs Business Rules,
 * which consists of BusinessRules Creator & BusinessRules Modifier
 */
function startBusinessRules() {
    console.log("[Started Business Rules]")
    ReactDOM.render(<BusinessRules/>, document.getElementById("root"))
}

/**
 * Starts and runs Business Rules Creator
 */
function runBusinessRuleCreator() {
    console.log("[Started Business Rules Creator]")

    // Get available Template Groups and display
    displayTemplateGroups(availableTemplateGroups)
}

/**
 * Starts and runs Business Rules Modifier
 */
function runBusinessRuleModifier() {
    console.log("[Started Business Rules Modifier]")

    // Get available Business Rules and display
    displayBusinessRules(availableBusinessRules)
}

/**
 * Displays available Template Groups, as thumbnails
 *
 * @param availableTemplateGroups
 */
function displayTemplateGroups(availableTemplateGroups) {
    ReactDOM.render(
        <BusinessRulesCreator
            templateGroups={availableTemplateGroups}
        />, document.getElementById("root"))
}

/**
 * Displays available Business Rules, as thumbnails
 *
 * @param availableTemplateGroups
 */
function displayBusinessRules() {
    ReactDOM.render(
        <BusinessRulesModifier
            businessRules={availableBusinessRules}
        />, document.getElementById("root"))
}

/**
 * Displays available Rule Templates that belong to the given Template Group name, as thumbnails
 *
 * @param templateGroup Given Template Group object
 */
function displayRuleTemplates(templateGroup) {
    ReactDOM.render(
        <TemplateGroup
            key={templateGroup.name}
            name={templateGroup.name}
            description={templateGroup.description}
            ruleTemplates={getRuleTemplates(templateGroup.name)}
            viewAs="parent"
        />, document.getElementById("root")
    )
}

/**
 * Displays a form to fill in properties data, in order to create a Business Rule
 *
 * @param ruleTemplate Given Rule Template object, which the Business Rule uses
 */
function displayCreateBusinessRuleForm(ruleTemplate) {
    ReactDOM.render(
        <BusinessRuleForm
            templateGroup={ruleTemplate.templateGroup}
            ruleTemplate={ruleTemplate}
            properties={getRuleTemplateProperties(ruleTemplate.templateGroup.name, ruleTemplate.name)}
            mode="create"
        />, document.getElementById("root"));
}

/**
 * Displays a form with property data, got from the given Business Rule
 *
 * @param templateGroupName
 * @param ruleTemplateName
 * @param businessRuleUUID
 */
function displayEditBusinessRuleForm(templateGroupName, ruleTemplateName, businessRule) {
    // Get from loaded Available Business Rules
    var properties = getMappedProperties(businessRule.uuid)
    var ruleTemplate = getRuleTemplate(templateGroupName, ruleTemplateName)

    // Get from loaded Available Template Groups
    ruleTemplate['templateGroup'] = getTemplateGroup(templateGroupName)

    ReactDOM.render(
        <BusinessRuleForm
            templateGroup={ruleTemplate.templateGroup}
            ruleTemplate={ruleTemplate}
            properties={properties}
            mode="edit"
            businessRuleName={businessRule.name}
        />, document.getElementById("root"));
}

/**
 * Sends the form filled values as Key Value pairs, to the API
 *
 * @param filledValues
 */
function prepareBusinessRule() {
    var isRequiredIncomplete = false
    for (let property in businessRuleEnteredProperties) {
        if ((!(businessRuleEnteredProperties[property] != null)) || (businessRuleEnteredProperties[property] === "")) {
            isRequiredIncomplete = true
            break
        }
    }

    if (isRequiredIncomplete) {
        fillInRequiredFieldsError()
    } else {
        createObjectForBusinessRuleCreation()
    }
}

/**
 * Gives error when all the required fields are not filled //todo: implement properly
 */
function fillInRequiredFieldsError() {
    console.log("Please fill in all the fields")
    ReactDOM.render(<SnackbarContent
        message="Please fill in all the fields"/>, document.getElementById("errors"))
}

/**
 * Gives the mapped properties, to send to the API to create Business Rule
 */
function createObjectForBusinessRuleCreation() {
    console.log("Business Rule Properties :")
    console.log(businessRuleEnteredProperties)
    ReactDOM.render(<SnackbarContent
        message="Properties are ready for sending to API"/>, document.getElementById("errors"))
}

// Load from API and store
var availableTemplateGroups = getTemplateGroups()
var availableBusinessRules = getBusinessRules()

// todo: (!) look into this. Seems not a good practise
// Properties given in the form, for Creating a Business Rule
var businessRuleEnteredProperties = {
    businessRuleName: null
}

// Start & Run BusinessRuleCreator();
startBusinessRules();