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

    // Renders available TemplateGroups as thumbnails
    render() {
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
                <div>{templateGroups}</div>
            </div>
        );
    }
}

class TemplateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            ruleTemplates: props.ruleTemplates,
            // 'thumbnail' when displaying available TemplateGroups
            // 'parent' when displaying available RuleTemplates under this
            viewAs: props.viewAs
        }
    }

    // Handles Click on thumbnail
    loadRuleTemplates() {
        //load("ruleTemplates", this, this.state.name)
        // Get RuleTemplates of this TemplateGroup
        var ruleTemplates = getRuleTemplates(this.state.name)
        load("ruleTemplates", this, this.state.name)
    }

    // Renders each available TemplateGroup as thumbnail, or
    // RuleTemplates under a given TemplateGroup as thumbnails (TemplateGroup as parent)
    render() {
        // View available TemplateGroups as Thumbnails
        if (this.state.viewAs === "thumbnail") {
            return (
                <div className="templateGroupCard" onClick={(e) => this.loadRuleTemplates(e)}>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}</p>
                </div>
            );
        } else {
            // View RuleTemplates, available under this TemplateGroup
            const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
                <RuleTemplate
                    key={ruleTemplate.name}
                    templateGroupName={this.state.name}
                    name={ruleTemplate.name}
                    type={ruleTemplate.type}
                    instanceCount={ruleTemplate.instanceCount}
                    script={ruleTemplate.script}
                    description={ruleTemplate.description}
                    templates={ruleTemplate.templates}
                    properties={ruleTemplate.properties}
                    viewAs="thumbnail"
                />
            );

            return (
                <div>
                    <h2>Rule Templates</h2>
                    <p>{this.state.name}</p>
                    <div>{ruleTemplates}</div>
                </div>
            );
        }
    }

}

class RuleTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroupName: props.templateGroupName,
            name: props.name,
            type: props.type,
            instanceCount: props.instanceCount,
            script: props.script,
            description: props.description,
            templates: props.templates,
            properties: props.properties,
            // 'thumbnail' when displaying available RuleTemplates
            // 'form' when filling the values for Templates
            viewAs: props.viewAs
        }
    }

    // Button Click
    loadRuleTemplateForm() {
        load("ruleTemplateForm", this, this.state.name) //todo: replace 'some' with proper one
    }

    // Renders properties of the RuleTemplate as a form, or
    // each RuleTemplate as a thumbnail
    render() {
        // View as a form
        if (this.state.viewAs === "form") {
            // Convert objects, to an objects array
            var propertiesArray = []
            for (var propertyKey in this.state.properties) {
                var propertyKeyString = propertyKey.toString()
                // Push as an object,
                // that has the original object's Key & Value
                // denoted by new Keys : 'propertyName' & 'propertyObject'
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
                    <h3>Property values for Template</h3>
                    <p>
                        {this.state.templateGroupName} > {this.state.name}
                    </p>
                    <form>
                        {properties}<br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            );
        } else {
            // View as thumbnail
            return (
                <div className="ruleTemplateCard" onClick={(e) => this.loadRuleTemplateForm(e)}>
                    <h3>{this.state.name}</h3>
                    <p>
                        {this.state.description}
                        <br/>
                        <br/>
                        Type : {this.state.type}
                        <br/>
                        Instance Count : {this.state.instanceCount}
                    </p>
                </div>
            );
        }
    }
}

class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Templated element with passed props
            property: {
                name: props.name,
                description: props.description,
                defaultValue: props.defaultValue,
                type: props.type,
                options: props.options
            }
        }
    }

    // Renders each element either as a TextField or Select box
    render() {
        var htmlSource = "";
        htmlSource += this.state.property.description + " : <br/>";
        if (this.state.property.type === "options") {
            // Options : List view
            htmlSource += "<select name=" + this.state.property.name + " value=" + this.state.property.defaultValue + ">";

            // Each given option
            for (let option of this.state.property.options) {
                htmlSource += "<option value=" + option + ">" + option + "</option>";
            }

            htmlSource += "</select>";
        } else {
            // Text Field
            htmlSource += "<input type=text name=" + this.state.property.name + " value=" + this.state.property.defaultValue + " required >";
        }
        htmlSource += "<br/><br/>"
        return (
            <div dangerouslySetInnerHTML={this.toHTML(htmlSource)}/>
        );
    }

    /**
     * Converts a given string to HTML
     * @param inputString Given string
     * @returns {{__html: *}} Converted HTML
     */
    toHTML(inputString) {
        return {
            __html: inputString
        }
    }

}

/**
 * Gets available TemplateGroups from the API and returns them todo: implement with API
 * @returns {{templateGroups: [null,null]}} JSON array, containing TemplateGroups
 */
function getTemplateGroups() {
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

    return receivedTemplateGroups
}

/**
 * Gives RuleTemplates, available under given TemplateGroup todo: implement with API
 * @param templateGroupName
 * @returns {*|Array}
 */
function getRuleTemplates(templateGroupName){
    var templateGroups = getTemplateGroups().templateGroups
    for(var templateGroup in templateGroups){
        if(templateGroup.name === templateGroupName){
            return templateGroup.ruleTemplates
        }
    }
}

/**
 * Gives Properties of a given RuleTemplate, which belongs to a given TemplateGroup
 * @param templateGroupName
 * @param ruleTemplateName
 * @returns {*|Array}
 */
function getProperties(templateGroupName,ruleTemplateName){
    var ruleTemplates = getRuleTemplates(templateGroupName);
    for(var ruleTemplate in ruleTemplates){
        if(ruleTemplate.name === ruleTemplateName){
            return ruleTemplate.properties
        }
    }
}

/**
 * Renders an element / a list of elements, as specified
 *
 * @param elementTypeToLoad Type of element (templateGroups, ruleTemplates, ruleTemplateForm)
 * @param parent The object, from which the elementTypeToLoad's details are loaded
 * @param parentName Name of the parent
 */
function load(elementTypeToLoad, content, parentName) {
    if (elementTypeToLoad === "templateGroups") {
        /**
         * content : Contains array of TemplateGroup Objects
         * parentName : null
         */
        ReactDOM.render(<BusinessRules templateGroups={content.templateGroups}/>, document.getElementById("root"));
    } else if (elementTypeToLoad === "ruleTemplates") {
        // content is the TemplateGroup Object
        /**
         * content : The TemplateGroup object, that contains array of RuleTemplate objects
         * parentName : null (extracted from the TemplateGroup object) todo: haven't done. Do
         */
        ReactDOM.render(
            <TemplateGroup
                name={content.state.name}
                description={content.state.description}
                ruleTemplates={content.state.ruleTemplates}
                viewAs="parent"/>, document.getElementById("root"));
    } else if (elementTypeToLoad === "ruleTemplateForm") {
        // content is the RuleTemplate Object
        /**
         * content : The RuleTemplate object, of which the properties are going to be loaded
         * parentName : TemplateGroup object's name
         */
        ReactDOM.render(
            <RuleTemplate
                templateGroupName={content.state.templateGroupName}
                name={content.state.name}
                type={content.state.type}
                instanceCount={content.state.instanceCount}
                script={content.state.script}
                description={content.state.description}
                templates={content.state.templates}
                properties={content.state.properties}
                viewAs="form"/>, document.getElementById("root"));
    }
}

// Renders given Template Groups
function loadTemplateGroups(templateGroups){
    const mappedTemplateGroups = templateGroups.map((templateGroup) =>
        <TemplateGroup
            key={templateGroup.name}
            name={templateGroup.name}
            description={templateGroup.description}
            ruleTemplates={templateGroup.ruleTemplates}
            viewAs="thumbnail"
        />
    );
}

/**
 * Starts BusinessRulesCreator
 */
function startBusinessRules() {
    // Recieve TemplateGroups from API
    var receivedTemplateGroups = getTemplateGroups()
    ReactDOM.render(<BusinessRules
        templateGroups={receivedTemplateGroups.templateGroups}/>, document.getElementById("root"));
}

startBusinessRules();