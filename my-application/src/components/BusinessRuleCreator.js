import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import CreateButton from "./CreateButton";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import Header from "./Header";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";

/**
 * Allows to create a Business Rule either from scratch or from a Template
 */
class BusinessRuleCreator extends React.Component {
    render() {
        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <center>
                    <Typography type="headline">
                        Let's create a business rule
                    </Typography>
                    <br/>
                    <CreateButton
                        onClick={(e) => BusinessRulesFunctions.loadTemplateGroupSelector()}
                        text='From Template'
                    />
                    <CreateButton
                        onClick={(e) => BusinessRulesFunctions.loadBusinessRuleFromScratchCreator()}
                        text='From The Scratch'
                    />
                </center>
            </div>
        );
    }
}

export default BusinessRuleCreator;
