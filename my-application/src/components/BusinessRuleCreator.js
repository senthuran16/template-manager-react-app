import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import CreateButton from "./CreateButton";
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import Header from "./Header";

/**
 * Allows to create a Business Rule either from scratch or from a Template
 */
class BusinessRuleCreator extends React.Component {
    styles = {
        containerDiv: {
            maxWidth: 500,
        }
    }

    render() {
        return (
            <div>
                <Header
                    title="Business Rule Manager"
                />
                <br/>
                <center>
                    <Typography type="headline">
                        Let's create a business rule
                    </Typography>
                    <br/>
                    <div style={this.styles.containerDiv}>
                        <CreateButton
                            onClick={(e) => BusinessRulesFunctions.loadTemplateGroupSelector()}
                            text='From Template'
                        />
                        <CreateButton
                            onClick={(e) => BusinessRulesFunctions.loadBusinessRuleFromScratchCreator()}
                            text='From The Scratch'
                        />
                    </div>
                </center>
            </div>
        );
    }
}

export default BusinessRuleCreator;
