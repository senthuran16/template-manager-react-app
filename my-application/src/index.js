import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BusinessRules extends React.Component {
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
                <h2>Template Groups</h2>
                <div>
                    {templateGroups}
                </div>
            </div>
        );
    }
}

/**
 * Represents a Template Group
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
                <div className="templateGroupCard" onClick={(e) => displayRuleTemplates(this.state)}>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}</p>
                </div>
            );
        } else {
            // View each Rule Template under this Template Group, as a thumbnail
            // todo: map and return Rule Templates under this
            const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
                <RuleTemplate
                    key={ruleTemplate.name}
                    templateGroup = {this.state}
                    // templateGroupName={this.state.name}
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
                    <h2>Rule Templates</h2>
                    <p><b>{this.state.name}</b><br/>
                        {this.state.description}</p>
                    <div>
                        {ruleTemplates}
                    </div>
                </div>);
        }
    }
}

/**
 * Represents a Rule Template
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
                <div className="ruleTemplateCard"
                     onClick={(e) =>
                         displayForm(
                             this.state,
                             this.state.properties)}>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}</p>
                    <p>
                        Type : {this.state.type}<br/>
                        Instance Count : {this.state.instanceCount}<br/>
                    </p>
                </div>
            );
        }
    }
}

class BusinessRuleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroup: props.templateGroup,
            ruleTemplate: props.ruleTemplate,
            templateGroupName: props.templateGroupName,
            ruleTemplateName: props.ruleTemplateName,
            properties: props.properties
        }
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
                <h3>Business Rule</h3>
                <p><b>{this.state.templateGroupName} > {this.state.ruleTemplateName}</b><br/>

                </p>
                <br/>
                <form>
                    {properties}<br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

}

/**
 * Represents a Property
 */
class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            defaultValue: props.defaultValue,
            type: props.type,
            options: props.options
        }
    }

    // Renders each element either as a TextField or Select box
    render() {
        var htmlSource = "";
        htmlSource += this.state.description + " : <br/>";
        if (this.state.type === "options") {
            // Options : List view
            htmlSource += "<select name=" + this.state.name + " value=" + this.state.defaultValue + ">";

            // Each given option
            for (let option of this.state.options) {
                htmlSource += "<option value=" + option + ">" + option + "</option>";
            }

            htmlSource += "</select>";
        } else {
            // Text Field
            htmlSource += "<input type=text name=" + this.state.name + " value=" + this.state.defaultValue + " required >";
        }
        htmlSource += "<br/><br/>"
        return (
            <div dangerouslySetInnerHTML={this.toHTML(htmlSource)}/>
        );
    }

    toHTML(inputString) {
        return {
            __html: inputString
        }
    }
}

/**
 * Get available TemplateGroups todo: from API
 *
 * @returns {Array}
 */
function getTemplateGroups() {
    var receivedTemplateGroups = { // todo: from API
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
    // todo: Rule Templates will be actually returned from API
}

/**
 * Get available RuleTemplates, belong to the given TemplateGroup todo: from API
 *
 * @param templateGroupName
 */
function getRuleTemplates(templateGroupName) {
    var templateGroups = getTemplateGroups()
    console.log(templateGroups)
    for (let templateGroup of templateGroups) { // todo: from API
        if (templateGroup.name === templateGroupName) {
            console.log("Returned RuleTemplates : ")
            console.log(templateGroup.ruleTemplates)

            return templateGroup.ruleTemplates
        }
    }
    // todo: Rule Templates will be actually returned from API
}

// Load available Template Groups and store
const availableTemplateGroups = getTemplateGroups()

/**
 * Starts and runs Business Rules
 */
function run() {
    console.log("[Started Business Rules]")
    console.log("Available Template Groups : ")
    console.log(availableTemplateGroups)

    // Pass available Template Groups into BusinessRules
    displayTemplateGroups(availableTemplateGroups)
}

/**
 * Displays available Template Groups, as thumbnails
 *
 * @param availableTemplateGroups
 */
function displayTemplateGroups(availableTemplateGroups) {
    ReactDOM.render(
        <BusinessRules
            templateGroups={availableTemplateGroups}
        />, document.getElementById("root"))
}

/**
 * Displays available Rule Templates that belong to the given Template Group name, as thumbnails
 *
 * @param templateGroupName
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
 * @param templateGroupName Given Template Group name, which the Business Rule uses
 * @param ruleTemplateName Given Rule Template name, which the Business Rule uses
 * @param properties Default elements for templated properties, as specified in the Rule Template
 */
function displayForm(ruleTemplate, properties) {
    ReactDOM.render(
        <BusinessRuleForm
            templateGroup={ruleTemplate.templateGroup}
            ruleTemplate={ruleTemplate}
            templateGroupName={ruleTemplate.templateGroup.name}
            ruleTemplateName={ruleTemplate.name}
            properties={properties}
        />, document.getElementById("root"));
}

run();