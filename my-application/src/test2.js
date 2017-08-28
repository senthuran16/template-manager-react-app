import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TemplateManager extends React.Component{
    constructor(){
        super();
        this.state = {
            jsonObject : {
                "ruleCollection" : {
                    "name" : "SensorDataAnalysis",
                    "description" : "Domain for sensor data analysis",
                    "ruleTemplates" : [
                        {
                            "name" : "SensorAnalytics" ,
                            "type" : "app",
                            "instanceCount" : "many",
                            "script" : "<script> (optional)",
                            "description" : "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                            "templates" : [
                                { "type" : "siddhiApp", "content" : "<from ${inStream1} select ${property1} insert into ${outStream1}>" },
                                { "type" : "siddhiApp", "content" : "<from ${inStream1} select ${property2} insert into ${outStream2}>" }
                            ],
                            "properties" : {
                                "inStream1" : {"description" : "Input Stream", "defaultValue" : "myInputStream1", "type" : "options", "options" : ["myInputStream1","myInputStream2"]},
                                "property1" : {"description" : "Unique Identifier for the sensor", "defaultValue" : "sensorName" , "type" : "options", "options" : ["sensorID","sensorName"]},
                                "property2" : {"description" : "Type of value, the sensor measures", "defaultValue" : "sensorValue" , "type" : "String"},
                                "outStream1" : {"description" : "Output Stream 1", "defaultValue" : "myOutputStream1", "type" : "options", "options" : ["myOutputStream1","myOutputStream2"]},
                                "outStream2" : {"description" : "Output Stream 2", "defaultValue" : "myOutputStream2", "type" : "options", "options" : ["myOutputStream1","myOutputStream2"]}
                            }
                        },
                        {
                            "name" : "SensorLoggings" ,
                            "type" : "<app>",
                            "instanceCount" : "many",
                            "script" : "<script> (optional)",
                            "description" : "Configure a sensor analytics scenario to display statistics for a given stream of your choice",
                            "templates" : [
                                { "type" : "siddhiApp", "content" : "<from ${inStream1} select ${property1} insert into ${outStream1}>" }
                            ],
                            "properties" : {
                                "inStream1" : {"description" : "Input Stream", "defaultValue" : "myInputStream1", "type" : "options", "options" : ["myInputStream1","myInputStream2"]},
                                "property1" : {"description" : "Unique Identifier for the sensor", "defaultValue" : "sensorName" , "type" : "options", "options" : ["sensorID","sensorName"]},
                                "outStream1" : {"description" : "Output Stream 1", "defaultValue" : "myOutputStream1", "type" : "options", "options" : ["myOutputStream1","myOutputStream2"]}
                            }
                        }
                    ]
                }
            }
        }

    }

    render(){
        var myObj = this.state.jsonObject
        var ruleCollectionObject = myObj.ruleCollection
        var ruleTemplates = ruleCollectionObject.ruleTemplates
        return (
            console.log(ruleTemplates)

        );
    }
}

// class Test extends React.Component{
//
//     render(){
//         var name = this.props.name;
//         return(
//           <h1>{name}</h1>
//         );
//     }
// }
//
ReactDOM.render(<TemplateManager/>, document.getElementById("root"));

