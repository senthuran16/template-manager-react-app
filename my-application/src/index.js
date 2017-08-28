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
            ruleTemplates: props.ruleTemplates
        }
    }

    // Button Click
    loadRuleTemplates() {
        console.log(this.state.name + " Clicked");
        greet()
    }

    // Renders a RuleCollection
    render() {
        const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
            <RuleTemplate
                key={ruleTemplate.name}
                name={ruleTemplate.name}
                type={ruleTemplate.type}
                instanceCount={ruleTemplate.instanceCount}
                script={ruleTemplate.script}
                description={ruleTemplate.description}
                templates={ruleTemplate.templates}
                // todo: map it
            />
        );
        return (
            <div>
                <button onClick={(e) => this.loadRuleTemplates(e)}>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}</p>
                </button>
            </div>
        );
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

    render() {
        // View as a form
        if (this.state.viewAs === "form") {
            const properties = this.state.properties.map((property) =>
                <Property
                    key={property.toString}
                    name={property.toString}
                    description={property.description}
                    defaultValue={property.defaultValue}
                    type={property.type}
                    options={property.options}
                />
            );
            return (
                <div>
                    {properties}
                </div>
            );
        } else {
            // View as thumbnail
            return (
                <div>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}
                        <br/>
                        <hr/>
                        Type : {this.state.instanceCount}
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
            htmlSource += "<input type=text name=" + property.name + " value=" + property.defaultValue + ">";
        }
        return (htmlSource);
    }

    render() {
        return (
            this.returnElement()
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
                "name": "SensorDataAnalysis",
                "description": "Domain for sensor data analysis",
                "ruleTemplates": [
                    {
                        "name": "SensorAnalytics",
                        "type": "app",
                        "instanceCount": "many",
                        "script": "<script> (optional)",
                        "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
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
                        "name": "SensorLoggings",
                        "type": "<app>",
                        "instanceCount": "many",
                        "script": "<script> (optional)",
                        "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
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
                "description": "Domain for sensor data analysis",
                "ruleTemplates": [
                    {
                        "name": "SensorAnalytics",
                        "type": "app",
                        "instanceCount": "many",
                        "script": "<script> (optional)",
                        "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
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
                        "name": "SensorLoggings",
                        "type": "<app>",
                        "instanceCount": "many",
                        "script": "<script> (optional)",
                        "description": "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
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
    ReactDOM.render(<TemplateManager ruleCollections={myObj.ruleCollections}/>, document.getElementById("root"));
}

// For testing
function greet(){
    console.log("Greet")
}


function load(elementTypeToLoad, parent){
    if(elementTypeToLoad === "ruleCollections"){
        // Parent contains array of RuleCollections
        ReactDOM.render(<TemplateManager ruleCollections={parent.ruleCollections}/>, document.getElementById("root"));
    }else if(elementTypeToLoad === "ruleTemplates"){
        // Parent is the RuleCollection
        ReactDOM.render(<TemplateManager ruleCollections={parent.ruleTemplates}/>, document.getElementById("root"));
    }else if(elementTypeToLoad === "ruleTemplate"){

    }
}

function loadRuleCollections(){

}

function loadRuleTemplates(){

}

function loadRuleTemplate(){

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
