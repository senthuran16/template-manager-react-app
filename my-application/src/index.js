import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Entire TemplateManager is considered as this class
class TemplateManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleCollections: props.ruleCollections
        }
    }

    // Renders available RuleCollections
    render() {
        const ruleCollections = this.state.ruleCollections.map((ruleCollection) =>
            <RuleCollection
                key={ruleCollection.name}
                name={ruleCollection.name}
                description={ruleCollection.description}
                ruleTemplates={ruleCollection.ruleTemplates}
                viewAs="thumbnail"
            />
        );

        return (
            <div>
                <h2>Rule Collections</h2>
                <div>{ruleCollections}</div>
            </div>
        );
    }

    // render() {
    //     console.log(this.state.ruleCollections);
    //     const rc = this.state.ruleCollections[0].ruleTemplates[0].properties;
    //     console.log(rc);
    //     var keys = [];
    //     for(var key in rc)
    //         console.log(key);
    // }
}

class RuleCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            ruleTemplates: props.ruleTemplates,
            // 'thumbnail' when displaying available RuleCollections
            // 'parent' when displaying available RuleTemplates under this
            viewAs: props.viewAs
        }
    }

    // Button Click
    loadRuleTemplates() {
        console.log("Loaded Rule Templates from Rule Collection '" + this.state.name + "'");
        greet()
        load("ruleTemplates", this, "some") //todo: replace 'some' with proper one
    }

    // Renders a RuleCollection
    render() {
        // View available RuleCollections as Thumbnails
        if (this.state.viewAs === "thumbnail") {
            return (
                <div>
                    <button onClick={(e) => this.loadRuleTemplates(e)}>
                        <h3>{this.state.name}</h3>
                        <p>{this.state.description}</p>
                    </button>
                </div>
            );
        } else {
            console.log("RuleCollection view as 'parent'")
            console.log("State ruleTemplates : ")
            console.log(this.state.ruleTemplates)
            // View RuleTemplates, available under this RuleCollection
            const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
                <RuleTemplate
                    key={ruleTemplate.name}
                    ruleCollectionName={ruleTemplate.ruleCollectionName}
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
            console.log("const ruleTemplates : ")
            console.log(ruleTemplates)

            return (
                <div>
                    <h2>Rule Templates</h2>
                    <div>{ruleTemplates}</div>
                </div>
            );
        } //todo: Continue from here
    }

}

class RuleTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleCollectionName: props.ruleCollectionName,
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
        console.log("Loaded Form for Rule Template '" + this.state.name + "'");
        greet()
        load("ruleTemplateForm", this, "some") //todo: replace 'some' with proper one
    }

    render() {
        // View as a form
        if (this.state.viewAs === "form") {
            console.log("view as form")
            console.log("this.state.properties : ")
            console.log(this.state.properties)

            // Tricky Foreach key comes here

            // Convert objects, to an objects array
            var propertiesArray = []
            for (var propertyKey in this.state.properties) {
                var propertyKeyString = propertyKey.toString()
                console.log("A property : ")
                console.log(this.state.properties[propertyKeyString])
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

            console.log("propertiesArray : ")
            console.log(propertiesArray)

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


            console.log("Const properties : ")
            console.log(properties)
            return (
                <div>
                    <form>
                        {properties}
                    </form>
                </div>
            );
        } else {
            // View as thumbnail
            console.log("view as thumbnail")
            return (
                <div>
                    <button onClick={(e) => this.loadRuleTemplateForm(e)}>
                        <h3>{this.state.name}</h3>
                        <p>
                            {this.state.description}
                            <br/>
                            Type : {this.state.instanceCount}
                            <br/>
                            Instance Count : {this.state.instanceCount}
                        </p>
                    </button>
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

    /**
     * Gives out the required HTML element for the Property
     * @returns {string} HTML element as a string
     */
    returnElement() {
        var property = this.state.property;
        var htmlSource = "";
        if (property.type === "options") {
            // Options : List view
            htmlSource += "<select name=" + property.name + " value=" + property.defaultValue + ">";

            // Each given option
            for (let option of property.options) {
                htmlSource += "<option value=" + option + ">" + option + "</option>";
            }

            htmlSource += "</select>";
        } else {
            // Text Field
            htmlSource += "<input type=text name=" + property.name + " value=" + property.defaultValue + "/>";
        }
        return (htmlSource);
    }

    renderBackup() {
        var property = this.state.property;
        var htmlSource = "";
        if (property.type === "options") {
            // Options : List view
            htmlSource += "<select name=" + property.name + " value=" + property.defaultValue + ">";

            // Each given option
            for (let option of property.options) {
                htmlSource += "<option value=" + option + ">" + option + "</option>";
            }

            htmlSource += "</select>";
        } else {
            // Text Field
            htmlSource += "<input type=text name=" + property.name + " value=" + property.defaultValue + "/>";
        }
        return (
            <div>{htmlSource}</div>
        );
    }

    render() {
        var htmlSource = "";
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
            htmlSource += "<input type=text name=" + this.state.property.name + " value=" + this.state.property.defaultValue + "/>";
        }
        return (
            <div>{htmlSource}</div>
        );
    }

}

// Simple Button Click test /////////////////////////////////
class Hello extends React.Component {
    render() {
        return (
            <h2>
                <button onClick={(e) => this.handleClick(e)}>{this.props.name}</button>
            </h2>
        );
    }

    handleClick() {
        console.log("Test Click");
        ReactDOM.render(<Hello name="TestClicked"/>, document.getElementById("root"));
    }
}

function show() {
    var myObj = {
        ruleCollections: [
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
    //ReactDOM.render(<Hello name={myObj.myArray[0].name}/>, document.getElementById("root"));
    console.log("MyObj is : " + myObj)
    ReactDOM.render(<TemplateManager ruleCollections={myObj.ruleCollections}/>, document.getElementById("root"));
}

// For testing
function greet() {
    console.log("Greet")
}

/**
 * Renders an element / a list of elements, as specified
 *
 * @param elementTypeToLoad Type of element (ruleCollections, ruleTemplates, ruleTemplateForm)
 * @param parent The object, from which the elementTypeToLoad's details are loaded
 * @param parentName Name of the parent
 */
function load(elementTypeToLoad, content, parentName) {
    if (elementTypeToLoad === "ruleCollections") {
        /**
         * content : Contains array of RuleCollection Objects
         * parentName : null
         */
        ReactDOM.render(<TemplateManager ruleCollections={content.ruleCollections}/>, document.getElementById("root"));
    } else if (elementTypeToLoad === "ruleTemplates") {
        // content is the RuleCollection Object
        /**
         * content : The RuleCollection object, that contains array of RuleTemplate objects
         * parentName : null (extracted from the RuleCollection object) todo: haven't done. Do
         */
        console.log("Went into 'load'");
        console.log("Content is : ");
        console.log(content);
        console.log("props")
        console.log("name : " + content.state.name);
        console.log("description : " + content.state.description);
        console.log("ruleTemplates : ");
        console.log(content.state.ruleTemplates);

        ReactDOM.render(
            <RuleCollection
                name={content.state.name}
                description={content.state.description}
                ruleTemplates={content.state.ruleTemplates}
                viewAs="parent"/>, document.getElementById("root"));
    } else if (elementTypeToLoad === "ruleTemplateForm") {
        // content is the RuleTemplate Object
        /**
         * content : The RuleTemplate object, of which the properties are going to be loaded
         * parentName : RuleCollection object's name
         */
        ReactDOM.render(
            <RuleTemplate
                ruleCollectionName={parentName}
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

show();
//////////////////////////////////////////////////////////////


// ReactDOM.render(
//     <TemplateManager
//         ruleCollections={[
//             {
//                 "name": "SensorDataAnalysis",
//                 "description": "Domain for sensor data analysis",
//                 "ruleTemplates": [
//                     {
//                         "name": "SensorAnalytics",
//                         "type": "app",
//                         "instanceCount": "many",
//                         "script": "<script> (optional)",
//                         "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
//                         "templates": [
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
//                             },
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property2} insert into ${outStream2}>"
//                             }
//                         ],
//                         "properties": {
//                             "inStream1": {
//                                 "description": "Input Stream",
//                                 "defaultValue": "myInputStream1",
//                                 "type": "options",
//                                 "options": ["myInputStream1", "myInputStream2"]
//                             },
//                             "property1": {
//                                 "description": "Unique Identifier for the sensor",
//                                 "defaultValue": "sensorName",
//                                 "type": "options",
//                                 "options": ["sensorID", "sensorName"]
//                             },
//                             "property2": {
//                                 "description": "Type of value, the sensor measures",
//                                 "defaultValue": "sensorValue",
//                                 "type": "String"
//                             },
//                             "outStream1": {
//                                 "description": "Output Stream 1",
//                                 "defaultValue": "myOutputStream1",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             },
//                             "outStream2": {
//                                 "description": "Output Stream 2",
//                                 "defaultValue": "myOutputStream2",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             }
//                         }
//                     },
//                     {
//                         "name": "SensorLoggings",
//                         "type": "<app>",
//                         "instanceCount": "many",
//                         "script": "<script> (optional)",
//                         "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
//                         "templates": [
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
//                             }
//                         ],
//                         "properties": {
//                             "inStream1": {
//                                 "description": "Input Stream",
//                                 "defaultValue": "myInputStream1",
//                                 "type": "options",
//                                 "options": ["myInputStream1", "myInputStream2"]
//                             },
//                             "property1": {
//                                 "description": "Unique Identifier for the sensor",
//                                 "defaultValue": "sensorName",
//                                 "type": "options",
//                                 "options": ["sensorID", "sensorName"]
//                             },
//                             "outStream1": {
//                                 "description": "Output Stream 1",
//                                 "defaultValue": "myOutputStream1",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 "name": "SensorDataAnalysis2",
//                 "description": "Domain for sensor data analysis",
//                 "ruleTemplates": [
//                     {
//                         "name": "SensorAnalytics",
//                         "type": "app",
//                         "instanceCount": "many",
//                         "script": "<script> (optional)",
//                         "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
//                         "templates": [
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
//                             },
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property2} insert into ${outStream2}>"
//                             }
//                         ],
//                         "properties": {
//                             "inStream1": {
//                                 "description": "Input Stream",
//                                 "defaultValue": "myInputStream1",
//                                 "type": "options",
//                                 "options": ["myInputStream1", "myInputStream2"]
//                             },
//                             "property1": {
//                                 "description": "Unique Identifier for the sensor",
//                                 "defaultValue": "sensorName",
//                                 "type": "options",
//                                 "options": ["sensorID", "sensorName"]
//                             },
//                             "property2": {
//                                 "description": "Type of value, the sensor measures",
//                                 "defaultValue": "sensorValue",
//                                 "type": "String"
//                             },
//                             "outStream1": {
//                                 "description": "Output Stream 1",
//                                 "defaultValue": "myOutputStream1",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             },
//                             "outStream2": {
//                                 "description": "Output Stream 2",
//                                 "defaultValue": "myOutputStream2",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             }
//                         }
//                     },
//                     {
//                         "name": "SensorLoggings",
//                         "type": "<app>",
//                         "instanceCount": "many",
//                         "script": "<script> (optional)",
//                         "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
//                         "templates": [
//                             {
//                                 "type": "siddhiApp",
//                                 "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
//                             }
//                         ],
//                         "properties": {
//                             "inStream1": {
//                                 "description": "Input Stream",
//                                 "defaultValue": "myInputStream1",
//                                 "type": "options",
//                                 "options": ["myInputStream1", "myInputStream2"]
//                             },
//                             "property1": {
//                                 "description": "Unique Identifier for the sensor",
//                                 "defaultValue": "sensorName",
//                                 "type": "options",
//                                 "options": ["sensorID", "sensorName"]
//                             },
//                             "outStream1": {
//                                 "description": "Output Stream 1",
//                                 "defaultValue": "myOutputStream1",
//                                 "type": "options",
//                                 "options": ["myOutputStream1", "myOutputStream2"]
//                             }
//                         }
//                     }
//                 ]
//             }
//         ]}
//     />, document.getElementById("root")
// );
