import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import Header from "./Header";
import BusinessRuleFromTemplateForm from "./BusinessRuleFromTemplateForm";
import BusinessRuleFromScratchForm from "./BusinessRuleFromScratchForm";

/**
 * Allows to edit a Business Rule
 */
class BusinessRuleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessRule: props.businessRule
        }
    }

    render() {
        // Get the Template Group & Rule Template, from which the Business Rule has been created
        var templateGroup =
            BusinessRulesFunctions.getTemplateGroup(this.state.businessRule.templateGroupUUID)


        // If Business Rule has been created from a template
        if (this.state.businessRule.type === BusinessRulesConstants.BUSINESS_RULE_TYPE_TEMPLATE) {
            var ruleTemplate =
                BusinessRulesFunctions.getRuleTemplate(
                    this.state.businessRule.templateGroupUUID,
                    this.state.businessRule.ruleTemplateUUID
                )

            // To store Business Rule form of the selected Rule Template
            var businessRuleForm;

            businessRuleForm =
                <BusinessRuleFromTemplateForm
                    businessRuleType={BusinessRulesConstants.BUSINESS_RULE_TYPE_TEMPLATE}
                    formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT}
                    businessRuleName={this.state.businessRule.name}
                    businessRuleUUID={this.state.businessRule.uuid}
                    selectedTemplateGroup={templateGroup}
                    ruleTemplate={ruleTemplate}
                    businessRuleProperties={this.state.businessRule.properties}
                />
        } else {
            // Input & Output Rule Templates
            let inputRuleTemplate =
                BusinessRulesFunctions.getRuleTemplate(
                    this.state.businessRule.templateGroupUUID,
                    this.state.businessRule.inputRuleTemplateUUID)
            let outputRuleTemplate =
                BusinessRulesFunctions.getRuleTemplate(
                    this.state.businessRule.templateGroupUUID,
                    this.state.businessRule.outputRuleTemplateUUID)

            // Business Rule has been created from scratch
            businessRuleForm =
                <BusinessRuleFromScratchForm
                    businessRuleType={BusinessRulesConstants.BUSINESS_RULE_TYPE_SCRATCH}
                    formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT}
                    businessRuleName={this.state.businessRule.name}
                    businessRuleUUID={this.state.businessRule.uuid}
                    selectedTemplateGroup={templateGroup}
                    selectedInputRuleTemplate={inputRuleTemplate}
                    selectedOutputRuleTemplate={outputRuleTemplate}
                    businessRuleProperties={this.state.businessRule.properties}
                />
        }

        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <br/>
                <Typography type="headline">{this.state.businessRule.name}</Typography>
                <Typography type="subheading">
                    Enter new values for this business rule properties
                </Typography>
                <br/>
                {businessRuleForm}
            </div>
        )
    }
}

export default BusinessRuleEditor;
