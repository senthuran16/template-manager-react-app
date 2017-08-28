import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Property extends React.Component {
    // Return a TextField with this.props.elements
    render() {
        return (
            <label>
                {this.props.description} : <br/>
                <input type="text" placeholder={this.props.defaultValue} required/>
                <br/><br/>
            </label>
        );
    }

}

class Templates extends React.Component {
    // no need
}

class Properties extends React.Component {
    constructor() {
        super();
        this.state.properties =

    }
}


class RuleTemplate1 extends React.Component {
    constructor() {
        super();
        this.state = {
            // Properties for a Template todo: remove hardcode
            properties: [
                {
                    name: "property1",
                    defaultValue: "sensorName",
                    description: "Unique identifier for sensor",
                    type: "option",
                    options: ["sensorName", "sensorId"]
                },
                {
                    name: "property2",
                    defaultValue: "sensorValue",
                    description: "Type of value, measured by sensor",
                    type: "String"
                }
            ]
        }
    }

    // Map each from properties to a <Property/>
    // Render RuleTemplate as a complete form (Collection of Properties)
    render() {
        // Fields, to be generated from Templated Elements
        const propertyFields = this.state.properties.map((property) =>
            <Property
                key={property.name}
                defaultValue={property.defaultValue}
                description={property.description}
                type={property.type} // todo: need to do for options
                options={property.options}
            />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create Business Rule from Template</h2>
                <p>Please enter the default values</p>

                {propertyFields}

                <input type="submit" value="Create"/>
            </form>
        );

    }

    // Form Submit function
    handleSubmit() {
        alert("Successfully created Business Rule");
    }


}

class RuleCollection1 extends React.Component {
    constructor() {
        super();
        this.state = {
            // Rule Templates of a RuleCollection todo: remove hardcode
            ruleTemplates: [
                {
                    name: "SensorAnalytics",
                    type: "app",
                    instanceCount: "many",
                    script: "<script> (optional)",
                    description: "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                },
                {
                    name: "SensorLoggings",
                    type: "<app>",
                    instanceCount: "many",
                    script: "<script> (optional)",
                    description: "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                }
            ]

        }
    }

    // Map each from ruleTemplates to a <RuleTemplate/>
    // Render Collection of RuleTemplate s
    render() {
        // RuleTemplates
        const ruleTemplateThumbnails = this.state.ruleTemplates.map((ruleTemplate) =>
            <RuleTemplate
                key={ruleTemplate.name}
                name={ruleTemplate.name}
                type={ruleTemplate.defaultValue}
                instanceCount={ruleTemplate.description}
                description={ruleTemplate.type}
            />
        );

        return (
            {ruleTemplateThumbnails}
        );
    }
}

class RuleTemplate extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <a>{this.props.description}</a>
                <hr/>
            </div>
        )
    }
}

class RuleCollection extends React.Component {
    constructor() {
        super();
        this.state = {
            // Rule Templates of a RuleCollection todo: remove hardcode
            ruleTemplates: [
                {
                    name: "SensorAnalytics",
                    type: "app",
                    instanceCount: "many",
                    script: "<script> (optional)",
                    description: "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                    templates: [
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        },
                        {
                            "type": "siddhiApp",
                            "content": "<from ${inStream1} select ${property2} insert into ${outStream2}>"
                        }
                    ],
                    properties: [
                        {
                            name: "inStream1",
                            description: "Input Stream",
                            "defaultValue": "myInputStream1",
                            "type": "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        {
                            name: "property1",
                            description: "Unique Identifier for the sensor",
                            "defaultValue": "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        {
                            name: "property2",
                            description: "Type of value, the sensor measures",
                            "defaultValue": "sensorValue",
                            "type": "String"
                        },
                        {
                            name: "outStream1",
                            description: "Output Stream 1",
                            "defaultValue": "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        },
                        {
                            name: "outStream2",
                            description: "Output Stream 2",
                            "defaultValue": "myOutputStream2",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    ]
                },
                {
                    name: "SensorLoggings",
                    type: "<app>",
                    instanceCount: "many",
                    script: "<script> (optional)",
                    description: "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                    templates: [
                        {
                            type: "siddhiApp",
                            content: "<from ${inStream1} select ${property1} insert into ${outStream1}>"
                        }
                    ],
                    properties: [
                        {
                            name: "inStream1",
                            description: "Input Stream",
                            defaultValue: "myInputStream1",
                            type: "options",
                            "options": ["myInputStream1", "myInputStream2"]
                        },
                        {
                            name: "property1",
                            description: "Unique Identifier for the sensor",
                            defaultValue: "sensorName",
                            "type": "options",
                            "options": ["sensorID", "sensorName"]
                        },
                        {
                            name: "outStream1",
                            description: "Output Stream 1",
                            defaultValue: "myOutputStream1",
                            "type": "options",
                            "options": ["myOutputStream1", "myOutputStream2"]
                        }
                    ]
                }
            ]

        }
    }

    render() {
        const ruleTemplates = this.state.ruleTemplates.map((ruleTemplate) =>
            <RuleTemplate
                key={ruleTemplate.name}
                name={ruleTemplate.name}
                type={ruleTemplate.type}
                instanceCount={ruleTemplate.instanceCount}
                script={ruleTemplate.script}
                description={ruleTemplate.description}>
                <Templates>
                    {ruleTemplate.templates}
                </Templates>
                <Properties>
                    {ruleTemplate.properties}
                </Properties>
            </RuleTemplate>
        );

        return (
            <div>
                {ruleTemplates}
            </div>
        );
    }
}

ReactDOM.render(<RuleCollection/>, document.getElementById("root"));

