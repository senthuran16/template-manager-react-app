import React from 'react';
import ReactDOM from 'react-dom';
import BusinessRulesFunctions from "./utils/BusinessRulesFunctions";
import BusinessRuleModifier from "./components/BusinessRuleModifier";
import BusinessRuleCreator from "./components/BusinessRuleCreator";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

ReactDOM.render(<BusinessRuleModifier businessRules={BusinessRulesFunctions.getBusinessRules()}/>, document.getElementById("root"))
// ReactDOM.render(<BusinessRuleCreator/>, document.getElementById("root"))

// class Hello extends React.Component{
//     render(){
//         return(
//             <div value='test' onClick={(e) =>this.test('x','y')}>
//                 HELLO
//             </div>
//         )
//     }
//
//     test(a,b){
//         console.log(a+" "+b)
//     }
//
// }
//
// ReactDOM.render(<Hello/>, document.getElementById('root'))