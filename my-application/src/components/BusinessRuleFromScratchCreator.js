import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import Header from "./Header";
import BusinessRuleFromScratchForm from "./BusinessRuleFromScratchForm";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";

/**
 * Allows to select a Rule Template, of a given type ('template', 'input' or 'output')
 * which will then display the form with Rule Template's properties
 */
class BusinessRuleFromScratchCreator extends React.Component {
    /**
     * Updates selected Rule Template in the state,
     * when Rule Template is selected from the list
     * @param name
     */
    handleRuleTemplateSelected = name => event => {
        let state = this.state
        // Get selected rule template & update in the state
        // state['selectedRuleTemplate'] = BusinessRulesFunctions.getRuleTemplate(this.state.selectedTemplateGroup.uuid, event.target.value.uuid)
        state['selectedRuleTemplate'] = BusinessRulesFunctions.getRuleTemplate(this.state.selectedTemplateGroup.uuid, event.target.value)
        // This always binds to the event. target. value
        // state['something'] = event.target.value
        this.setState(state)
    }
    /**
     * Updates selected Rule Template in the state,
     * when Rule Template is selected from the list
     * @param name
     */
    handleTemplateGroupSelected = event => {
        let state = this.state
        // Get selected template group & update in the state
        state['selectedTemplateGroup'] = BusinessRulesFunctions.getTemplateGroup(event.target.value)
        this.setState(state)
    }

    constructor(props) {
        super(props);
        this.state = {
            templateGroups: props.templateGroups
        }
    }

    /**
     * Renders a drop down which displays available Rule Templates of filtered types,
     * And displays a form on selecting a Rule Template
     */
    render() {
        // To display the business Rule form
        var businessRuleForm =
            <BusinessRuleFromScratchForm
                formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE}
                templateGroups={this.state.templateGroups}
            />


        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <br/>
                <Typography type="headline">Create a business rule from scratch</Typography>
                <Typography type="subheading">
                    Select a Template Group for choosing rule templates for input and output from
                </Typography>
                <br/>
                {businessRuleForm}
            </div>
        )
    }
}

export default BusinessRuleFromScratchCreator;
