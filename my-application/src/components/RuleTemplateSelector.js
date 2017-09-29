import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import Header from "./Header";
import BusinessRuleFromTemplateForm from "./BusinessRuleFromTemplateForm";

/**
 * Allows to select a Rule Template, of a given type ('template', 'input' or 'output')
 * which will then display the form with Rule Template's properties
 */
class RuleTemplateSelector extends React.Component {
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

    constructor(props) {
        super(props);
        this.state = {
            selectedTemplateGroup: props.selectedTemplateGroup,
            ruleTemplateTypeFilter: props.ruleTemplateTypeFilter, // 'template', 'input' or 'output'
            ruleTemplates: props.ruleTemplates,
            // selectedRuleTemplate: null, // Initialize with no Rule Template selected
            selectedRuleTemplate: {name: '', uuid: ''}, // Initialize with no Rule Template selected
            // something: ''
        }
    }

    /**
     * Renders a drop down which displays available Rule Templates of filtered types,
     * And displays a form on selecting a Rule Template
     */
    render() {
        // Only add Rule Templates of required type
        var filteredRuleTemplates = []
        for (let ruleTemplate of this.state.ruleTemplates) {
            if (ruleTemplate.type === this.state.ruleTemplateTypeFilter) {
                filteredRuleTemplates.push(ruleTemplate)
            }
        }

        var ruleTemplatesToDisplay = filteredRuleTemplates.map((ruleTemplate) =>
            <MenuItem key={ruleTemplate.uuid} value={ruleTemplate.uuid}>
                {ruleTemplate.name}
            </MenuItem>
        )

        // To display helper text, for the drop down to select Rule Template
        var ruleTemplateSelectionHelperText;

        // To store Business Rule form of the selected Rule Template
        var businessRuleForm;

        if (this.state.selectedRuleTemplate.name != '') {
            ruleTemplateSelectionHelperText = this.state.selectedRuleTemplate.description
            businessRuleForm = <BusinessRuleFromTemplateForm
                businessRuleType={BusinessRulesConstants.BUSINESS_RULE_TYPE_TEMPLATE}
                formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE}
                templateGroup={this.state.selectedTemplateGroup}
                ruleTemplate={this.state.selectedRuleTemplate}/>
        } else {
            // Otherwise, show default helper text
            ruleTemplateSelectionHelperText = "Select a rule template of type - " + this.state.ruleTemplateTypeFilter
            businessRuleForm = <div></div>
        }

        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <Typography type="headline">{this.state.selectedTemplateGroup.name}</Typography>
                <Typography type="subheading">
                    Select a template and fill in the form to create a business rule
                </Typography>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="ruleTemplate">RuleTemplate</InputLabel>
                    <Select
                        value={this.state.selectedRuleTemplate.uuid}
                        onChange={this.handleRuleTemplateSelected('selectedRuleTemplate')}
                        input={<Input id="ruleTemplate"/>}
                    >
                        {ruleTemplatesToDisplay}
                    </Select>
                    <FormHelperText>{ruleTemplateSelectionHelperText}</FormHelperText>
                </FormControl>
                <br/>
                {businessRuleForm}
            </div>
        )
    }
}

export default RuleTemplateSelector;
