import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BusinessRulesFunctions from "./utils/BusinessRulesFunctions";
import BusinessRuleModifier from "./components/BusinessRuleModifier";
import BusinessRuleCreator from "./components/BusinessRuleCreator";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import BusinessRulesAPIs from "./utils/BusinessRulesAPIs";
import BusinessRulesConstants from "./utils/BusinessRulesConstants";

// ReactDOM.render(<BusinessRuleModifier businessRules={BusinessRulesFunctions.getBusinessRules()}/>, document.getElementById("root"))
// ReactDOM.render(<BusinessRuleCreator/>, document.getElementById("root"))

class Hello extends React.Component{
    render(){
        this.test()
        return(
            <div value='test'>
                HELLO
            </div>
        )
    }

    test(){
        // axios.get('http://localhost:9090/business-rule/template-groups')
        //     .then(function(response){
        //         console.log("TADA")
        //         console.log(response.data); // ex.: { user: 'Your User'}
        //         console.log(response.status); // ex.: 200
        //     });

        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let templateGroups = apis.getTemplateGroups();
        console.log("TEMPLATE GROUPS")
        console.log(templateGroups)
        templateGroups.then(function(response){
            console.log("HOHO")
            console.log(response)
        });
    }

}

ReactDOM.render(<Hello/>, document.getElementById('root'))