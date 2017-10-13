import React from 'react';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import Property from './Property';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
import Collapse from 'material-ui/transitions/Collapse';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BusinessRulesFunctions from "../utils/BusinessRulesFunctions";
import BusinessRulesConstants from "../utils/BusinessRulesConstants";
import AddIcon from "material-ui-icons/Add"
import {IconButton} from "material-ui";
import Paper from 'material-ui/Paper';
import FilterRule from "./FilterRule";
import BusinessRulesAPIs from "../utils/BusinessRulesAPIs";
import List, {ListItem, ListItemText} from 'material-ui/List';
import Header from "./Header";
import BusinessRuleFromScratchForm from "./BusinessRuleFromScratchForm";
import BusinessRulesMessageStringConstants from "../utils/BusinessRulesMessageStringConstants";

/**
 * Represents the input component of the business rule from scratch form,
 * which will contain input rule template selection, input configuration and input exposed stream fields
 */
class OutputComponent extends React.Component {
    render() {
        let outputRuleTemplatesToDisplay
        let outputDataPropertiesToDisplay
        let exposedInputStreamFieldsToDisplay
        let outputMappingsToDisplay

        // Messages to display initially
        // Output rule template has not been selected
        outputDataPropertiesToDisplay =
            <Typography type="body2">
                {BusinessRulesMessageStringConstants.RULE_TEMPLATE_NOT_SELECTED}
            </Typography>

        // Output & Input rule templates has not been selected
        outputMappingsToDisplay =
            <Typography type="body2">
                {BusinessRulesMessageStringConstants.MAPPING_NOT_AVAILABLE}
            </Typography>

        // To display rule templates selection drop down
        let outputRuleTemplateElements = this.props.outputRuleTemplates.map((outputRuleTemplate) =>
            <MenuItem key={outputRuleTemplate.uuid} value={outputRuleTemplate.uuid}>
                {outputRuleTemplate.name}
            </MenuItem>
        )
        outputRuleTemplatesToDisplay =
            <FormControl>
                <InputLabel htmlFor="inputRuleTemplate">Rule Template</InputLabel>
                <Select
                    value={(!BusinessRulesFunctions.isEmpty(this.props.selectedOutputRuleTemplate)) ?
                        this.props.selectedOutputRuleTemplate.uuid : ''
                    }
                    onChange={(e) => this.props.handleOutputRuleTemplateSelected(e)} // todo: recheck
                    input={<Input id="inputRuleTemplate"/>}
                >
                    {outputRuleTemplateElements}
                </Select>
                <FormHelperText>
                    {(!BusinessRulesFunctions.isEmpty(this.props.selectedOutputRuleTemplate)) ?
                        this.props.selectedOutputRuleTemplate.description :
                        (BusinessRulesMessageStringConstants.RULE_TEMPLATE_NOT_SELECTED)
                    }
                </FormHelperText>
            </FormControl>

        // If an output rule template has been selected
        if (!BusinessRulesFunctions.isEmpty(this.props.selectedOutputRuleTemplate)) {
            // To display output data properties
            outputDataPropertiesToDisplay = this.props.reArrangePropertiesForDisplay(
                BusinessRulesConstants.BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT,
                this.props.mode)

            // To display Output Mappings

            // If an input rule template has been selected
            if (!BusinessRulesFunctions.isEmpty(this.props.selectedInputRuleTemplate)) {
                // Each field of the exposed output stream must be mapped with an available field of the exposed
                // input stream
                let exposedOutputStreamFieldNames =
                    this.props.getFieldNames(this.props.selectedOutputRuleTemplate['templates'][0]['exposedStreamDefinition'])

                let exposedInputStreamFieldNames =
                    this.props.getFieldNames(this.props.selectedInputRuleTemplate['templates'][0]['exposedStreamDefinition'])

                // Each drop down will have fields of the exposed input stream as options
                // Store as a 2 dimensional array of [fieldName, fieldType]s
                let inputStreamFields =
                    this.props.getFields(this.props.selectedInputRuleTemplate.templates[0]['exposedStreamDefinition'])
                let inputStreamFieldsToDisplay = []
                for (let field in inputStreamFields) {
                    inputStreamFieldsToDisplay.push([field, inputStreamFields[field]])
                }

                // todo: auto-complete
                let inputStreamFieldsToMap = exposedInputStreamFieldNames.map((fieldName, index) =>
                    <MenuItem key={index}
                              value={fieldName}>
                        {fieldName}
                    </MenuItem>
                )

                // To display a row for each output field map
                let outputMappingElementsToDisplay = exposedOutputStreamFieldNames.map((fieldName, index) =>
                    <TableRow key={index}>
                        <TableCell>
                            <FormControl>
                                <Select
                                    // No value when no mapping is specified
                                    // (used when a different output rule template is selected)
                                    value={(this.props.businessRuleProperties['outputMappings'][fieldName]) ?
                                        (this.props.businessRuleProperties['outputMappings'][fieldName]) : ''}
                                    onChange={(e) => this.props.handleOutputMappingChange(e, fieldName)} //todo: check
                                    // the method
                                    input={<Input id="templateGroup"/>}
                                >
                                    {inputStreamFieldsToMap}
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell>
                            As
                        </TableCell>
                        <TableCell>
                            {fieldName}
                        </TableCell>
                    </TableRow>
                )

                outputMappingsToDisplay =
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Input</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Output</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {outputMappingElementsToDisplay}
                        </TableBody>
                    </Table>
            }
        }

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography type="title">Output</Typography>
                        <IconButton
                            onClick={(e) => this.props.toggleExpansion()}
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Paper style={this.props.style.paper}>
                    <Collapse in={this.props.isExpanded} transitionDuration="auto" unmountOnExit>
                        {outputRuleTemplatesToDisplay}
                        <br/>
                        <br/>
                        <br/>
                        <Typography type="subheading">
                            Configurations
                        </Typography>
                        {outputDataPropertiesToDisplay}
                        <br/>
                        <br/>
                        <Typography type="subheading">
                            Mappings
                        </Typography>
                        {outputMappingsToDisplay}
                        <br/>
                    </Collapse>
                </Paper>
            </div>
        )

    }
}

export default OutputComponent;