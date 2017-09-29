import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import TemplateGroup from './TemplateGroup';
import Header from "./Header";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";

/**
 * Allows to select a Template Group, among Template Groups displayed as thumbnails
 */
class TemplateGroupSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateGroups: props.templateGroups // Available Template Groups
        }
    }

    render() {
        var templateGroups = this.state.templateGroups.map((templateGroup) =>
            <TemplateGroup
                key={templateGroup.uuid}
                name={templateGroup.name}
                uuid={templateGroup.uuid}
                description={templateGroup.description}
                onClick={(e) =>
                    BusinessRulesFunctions.loadRuleTemplateSelector(
                        templateGroup.uuid, BusinessRulesConstants.RULE_TEMPLATE_TYPE_TEMPLATE)
                }
            />
        )

        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <center>
                    <Typography type="headline">
                        Select a Template Group
                    </Typography>
                    <br/>
                    {templateGroups}
                </center>
            </div>
        )
    }
}

export default TemplateGroupSelector;
