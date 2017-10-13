import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// Material-UI
import Typography from 'material-ui/Typography';
import Card, {CardContent, CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Cake from 'material-ui-icons/Cake'
import Menu from 'material-ui-icons/Menu'
import Code from 'material-ui-icons/Code'
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TemplateGroupSelector from "../components/TemplateGroupSelector";

/**
 * Has values for all the string constants related to displaying messages to the user
 */
const BusinessRulesMessageStringConstants = {
    // Common errors
    CONNECTION_FAILURE: 'Error connecting to the server',
    SELECT_TEMPLATE_GROUP: 'Please select a template group',
    // Business Rule from scratch
    RULE_TEMPLATE_NOT_SELECTED: 'Please select a rule template',
    // Filter component
    RULE_LOGIC_HELPER_TEXT: "Enter the Rule Logic, referring filter rule numbers. Eg: (1 OR 2) AND (NOT(3))",
    RULE_LOGIC_WARNING: "Rule logic contains invalid number(s) for filter rules",
    // Output component
    MAPPING_NOT_AVAILABLE: 'Please select both input & output rule templates',
}

export default BusinessRulesMessageStringConstants;
