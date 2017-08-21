import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Property extends React.Component {
    // Render each Property as a TextField
    render() {
        return(
            <label>
                {this.props.name} : &nbsp;
                <input type="text" placeholder={this.props.defaultValue} />
                <br/><br/>
            </label>
        );
    }
}

class Template extends React.Component {
    constructor(){
        super();
        this.state = {
            // Templated elements for this Template
            properties : [
                {name: "property1" , defaultValue: "sensorName", description: "Unique identifier for sensor", type: "option", options: ["sensorName", "sensorId"]},
                {name: "property2" , defaultValue: "sensorValue", description: "Type of value, measured by sensor", type: "String"}
            ]
        }
    }
    render() {
        // Fields, to be generated from Templated Elements
        const propertyFields = this.state.properties.map((property) =>
            <Property
                name={property.name}
                defaultValue={property.defaultValue}
                description={property.description}
                type={property.type} // todo: need to do for options
            />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create Business Rule from Template</h2>
                <ul>
                    {propertyFields}
                </ul>
                <input type="submit" value="Create" />
            </form>
        );

    }

    // Form Submit function
    handleSubmit(){
        alert("hello");
    }
}

// class RuleTemplate extends React.Component {
//     render() {
//         return (
//             <div className="rule-template">
//             </div>
//         );
//     }
// }

// class RuleCollection extends React.Component {
//     render() {
//         return (
//             <div className="rule-collection">
//             </div>
//         );
//     }

    // renderRuleTemplate(ruleTemplateName) {
    //     return (
    //         <RuleTemplate
    //             value={this.props.ruleTemplates./*getKey*/}
    //             onClick={}
    //         />
    //     );
    // }
// }

// class TemplateManager extends React.Component {
//     renderRuleCollection(ruleCollectionName) {
//         return (
//             <RuleCollection
//                 value={}
//                 onClick={}
//             />
//         );
//     }
// }

// {/*<RuleCollection>*/}
//     {/*<name></name>*/}
//     {/*<description></description>*/}
//     {/*<RuleTemplates>*/}
//         {/*<RuleTemplate>*/}
//             {/*<name></name>*/}
//             {/*<type></type>*/}
//             {/*<instanceCount></instanceCount>*/}
//             {/*<script></script>*/}
//             {/*<description></description>*/}
//             {/*<templates>*/}
//                 {/*<template>*/}
//                     {/*<type></type>*/}
//                     {/*<content></content>*/}
//                 {/*</template>*/}
//             {/*</templates>*/}
//             {/*<properties>*/}
//                 {/*<property></property>*/}
//             {/*</properties>*/}
//         {/*</RuleTemplate>*/}
//     {/*</RuleTemplates>*/}
// {/*</RuleCollection>*/}

ReactDOM.render(<Template />, document.getElementById("root"));
