import React from 'react';
import ReactDOM from 'react-dom';
import BusinessRulesFunctions from "./utils/BusinessRulesFunctions";
import BusinessRuleModifier from "./components/BusinessRuleModifier";
import BusinessRuleCreator from "./components/BusinessRuleCreator";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

ReactDOM.render(<BusinessRuleModifier businessRules={BusinessRulesFunctions.getBusinessRules()}/>, document.getElementById("root"))
// ReactDOM.render(<BusinessRuleCreator/>, document.getElementById("root"))