// todo: bind handleClicks in the new way
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// Material-UI
import * as classes from "react/lib/ReactDOMFactories";
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormControlLabel, FormLabel} from 'material-ui/Form';
import FormControl from 'material-ui/Form/FormControl';
import Radio, {RadioGroup} from 'material-ui/Radio';
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
 * Listing Business Rules in order to Edit and Delete,
 * will happen within this component
 */
class BusinessRulesModifier extends React.Component { //todo: just hard coded. remove them
    render() {
        const hardCodedBRs = [
            {
                uuid: 'abc123',
                name: 'MyHardCodedBR1',
                templateGroupName: 'someTemplateGroup',
                ruleTemplateName: 'someRuleTemplateName',
                type: 'template',
                properties: null
            },
            {
                uuid: 'def456',
                name: 'MyHardCodedBR2',
                templateGroupName: 'someTemplateGroup',
                ruleTemplateName: 'someRuleTemplateName',
                type: 'template',
                properties: null
            }
        ]
        const gotBRs = hardCodedBRs.map((br) =>
            <BusinessRule
                key={br.uuid}
                uuid={br.uuid}
                name={br.name}
                templateGroupName={br.templateGroupName}
                ruleTemplateName={br.ruleTemplateName}
                type={br.type}
                properties={br.properties}
            />
        )

        return (
            <div>
                <Typography type="headline" component="h2">
                    Business Rules
                </Typography>
                <br/>
                <div>
                    {gotBRs}
                </div>
            </div>);
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
                            <Button dense color="primary" onClick={(e) =>
                                displayForm(
                                    this.state,
                                    this.state.properties)}>
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
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    // Handle text field change
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

        return (
            <div>
                <Typography type="headline" component="h2">
                    Create Business Rule
                </Typography>
                <Typography type="subheading" color="secondary">
                    {this.state.templateGroup.name} -> {this.state.ruleTemplate.name}
                </Typography>
                <Typography component="p">
                    {this.state.ruleTemplate.description}
                </Typography>
                <br/>
                <div>
                    <TextField
                        id="businessRuleName"
                        name="businessRuleName"
                        label="Business Rule name"
                        placeholder="Please enter"
                        required={true}
                        onChange={this.handleTextChange}
                    />
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div>
                    {properties}<br/>
                    <Button raised color="primary"
                            onClick={(e) => prepareBusinessRule()}>Create</Button>
                </div>
            </div>
        );
    }

}

/**
 * Represents Property, which is going to be shown as an input element
 */
class Property extends React.Component {
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
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        businessRuleEnteredProperties[this.state.name] = this.state.defaultValue
    }

    handleRadioChange(event, value) {
        this.setState({
            value: value
        });
        // Get properties available until now
        let businessRuleProperties = businessRuleEnteredProperties
        // Add a new Key Value pair denoting the target's name & value,
        businessRuleProperties[event.target.name.toString()] = value

        // Update the existing properties object
        businessRuleEnteredProperties = businessRuleProperties
    }

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

    // Renders each element either as a TextField or Radio Group
    render() {
        if (this.state.type === "options") {
            const options = this.state.options.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio/>} label={option}/>))
            return (
                <div>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">{this.state.name}</FormLabel>
                        <RadioGroup
                            aria-label={this.state.name}
                            key={this.state.name}
                            name={this.state.name}
                            value={this.state.value}
                            className="c182"
                            onChange={this.handleRadioChange}
                        >
                            {options}
                        </RadioGroup>
                    </FormControl>
                    <br/>
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
                        margin="normal"
                        onChange={this.handleTextChange}
                    />
                    <br/>
                    <br/>
                </div>
            );
        }
    }

    // render() {
    //     var htmlSource = "";
    //     htmlSource += this.state.description + " : <br/>";
    //     if (this.state.type === "options") {
    //         // Options : List view
    //         htmlSource += "<select name=" + this.state.name + " value=" + this.state.defaultValue + ">";
    //
    //         // Each given option
    //         for (let option of this.state.options) {
    //             htmlSource += "<option value=" + option + ">" + option + "</option>";
    //         }
    //
    //         htmlSource += "</select>";
    //     } else {
    //         // Text Field
    //         htmlSource += "<input type=text name=" + this.state.name + " value=" + this.state.defaultValue + " required >";
    //     }
    //     htmlSource += "<br/><br/>"
    //     return (
    //         <div dangerouslySetInnerHTML={this.toHTML(htmlSource)}/>
    //     );
    // }

    toHTML(inputString) {
        return {
            __html: inputString
        }
    }
}

/**
 * Represents a BusinessRule, that is already created and available todo: Roughly done. Implement properly
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
                                    onClick={(e) => console.log("[Test] Sent request for BR data, to API")}>
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

/* Start of Methods related with API calls */

/**
 * Get available TemplateGroups todo: from API
 *
 * @returns {Array}
 */
function getTemplateGroups() {
    // todo: remove hardcode *****************************
    var receivedTemplateGroups = {
        templateGroups: [
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
    }

    return receivedTemplateGroups.templateGroups
    // todo: *********************************************
    // todo: Get TemplateGroups from API
}

/**
 * Get available RuleTemplates, belong to the given TemplateGroup todo: from API
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

/**
 * Get available Properties, belong to the given RuleTemplate
 *
 * @param templateGroupName
 * @param ruleTemplateName
 * @returns {*|Array}
 */
function getProperties(templateGroupName, ruleTemplateName) {
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

/* End of Methods related with API calls */

// Load available Template Groups and store
const availableTemplateGroups = getTemplateGroups()

// todo: (!) look into this. Seems not good
// Properties given in the form, for Creating a Business Rule
var businessRuleEnteredProperties = {
    businessRuleName: null
}

/**
 * Starts and runs Business Rules, which consists of BR Creator & Modifier todo: Hard coded. Remove
 */
function runBusinessRules() {
    console.log("[Started Business Rules]")
    ReactDOM.render(<BusinessRules/>, document.getElementById("root"))
}

/**
 * Starts and runs Business Rules Creator
 */
function runBusinessRuleCreator() {
    console.log("[Started Business Rules Creator]")

    // Pass available Template Groups into BusinessRules
    displayTemplateGroups(availableTemplateGroups)
}

/**
 * Starts and runs Business Rules Modifier todo: Hard Coded. Remove
 */
function runBusinessRuleModifier() {
    console.log("[Started Business Rules Modifier]")
    displayBusinessRules()
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
 * Displays available Business Rules, as thumbnails todo: Hard coded. Remove
 *
 * @param availableTemplateGroups
 */
function displayBusinessRules() {
    ReactDOM.render(
        <BusinessRulesModifier/>, document.getElementById("root"))
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
 * Displays a form to fill in data for given properties, in order to create a Business Rule
 *
 * @param ruleTemplate Given Rule Template object, which the Business Rule uses
 * @param properties Default elements for templated properties, as specified in the Rule Template
 */
function displayForm(ruleTemplate, properties) {
    ReactDOM.render(
        <BusinessRuleForm
            templateGroup={ruleTemplate.templateGroup}
            ruleTemplate={ruleTemplate}
            properties={getProperties(ruleTemplate.templateGroup.name, ruleTemplate.name)}
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
        if ((!(businessRuleEnteredProperties[property] != null)) || (businessRuleEnteredProperties[property] == "")) {
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

// runBusinessRuleCreator();
runBusinessRules();