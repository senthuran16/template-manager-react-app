import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BusinessRulesFunctions from "./utils/BusinessRulesFunctions";
import BusinessRuleModifier from "./components/BusinessRuleModifier";
import BusinessRuleCreator from "./components/BusinessRuleCreator";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import BusinessRulesAPIs from "./utils/BusinessRulesAPIs";
import BusinessRulesConstants from "./utils/BusinessRulesConstants";
import {Typography} from "material-ui";
import BusinessRulesMessageStringConstants from "./utils/BusinessRulesMessageStringConstants";

function test(){
    let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
    let templateGroups = apis.getTemplateGroups();
    console.log("TEMPLATE GROUPS")
    console.log(templateGroups)
    templateGroups.then(function(response){
        console.log("RESPONSE")
        console.log(response.data)
    });
}

// test();

const styles = {
    progress: {
        margin: 10
    },
    progress: {
        backgroundColor: '#EF6C00'
    },
}

// Load business rule modifier, initially without any snackbar
BusinessRulesFunctions.loadBusinessRuleModifier(false,'');

// // Load available Business Rules
// let businessRulesPromise = BusinessRulesFunctions.getBusinessRules()
// businessRulesPromise.then(function(response){
//     console.log("BUSINESS RULES MANAGER STARTED")
//     ReactDOM.render(
//         <BusinessRuleModifier businessRules={response.data}/>, document.getElementById("root"))
// }).catch(function(error){
//     console.log(error)
//     ReactDOM.render(
//         <Typography type="title">
//             {BusinessRulesMessageStringConstants.CONNECTION_FAILURE}
//         </Typography>, document.getElementById("root"))
// })

// ReactDOM.render(
//     <div>
//         <CircularProgress color="accent" style={styles.progress} size={50} />
//     </div>, document.getElementById("root"))

// ReactDOM.render(<BusinessRuleModifier businessRules={BusinessRulesFunctions.getBusinessRules()}/>,
// document.getElementById("root"))
// ReactDOM.render(<BusinessRuleCreator/>, document.getElementById("root"))

// class Hello extends React.Component{
//     render(){
//         this.test()
//         return(
//             <div value='test'>
//                 HELLO
//             </div>
//         )
//     }
//
//     test(){
//         let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
//         let templateGroups = apis.getTemplateGroups();
//         console.log("TEMPLATE GROUPS")
//         console.log(templateGroups)
//         templateGroups.then(function(response){
//             console.log("RESPONSE")
//             console.log(response.data)
//         });
//     }
//
// }
//
// ReactDOM.render(<Hello/>, document.getElementById('root'))