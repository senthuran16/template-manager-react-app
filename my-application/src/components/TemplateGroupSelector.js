import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import TemplateGroup from './TemplateGroup';
import Header from "./Header";
import Grid from 'material-ui/Grid';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";

/**
 * Allows to select a Template Group, among Template Groups displayed as thumbnails
 */
class TemplateGroupSelector extends React.Component {
    styles = {
        containerDiv: {
            maxWidth: 750
        },
        root: {
            flexGrow: 1,
        },
        control: {
            padding: 5,
        },
        spacing: '0'
    }

    constructor(props) {
        super(props);
        this.state = {
            templateGroups: props.templateGroups // Available Template Groups
        }
    }

    render() {
        var templateGroups = this.state.templateGroups.map((templateGroup) =>

            <Grid item key={templateGroup.uuid}>
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
            </Grid>
        )

        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <center>
                    <br/>
                    <Typography type="headline">
                        Select a Template Group
                    </Typography>
                    <br/>
                    {/*<div>*/}
                        {/*{templateGroups}*/}
                    {/*</div>*/}

                    <Grid container style={this.styles.root}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={Number(this.styles.spacing)}>
                                {templateGroups}
                            </Grid>
                        </Grid>
                    </Grid>

                </center>
            </div>
        )
    }
}

export default TemplateGroupSelector;
