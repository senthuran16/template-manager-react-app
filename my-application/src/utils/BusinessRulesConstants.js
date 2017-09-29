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
 * Has values for all the constants related to Business Rules web app
 */
const BusinessRulesConstants = {
    // Rule Template types
    RULE_TEMPLATE_TYPE_TEMPLATE: "template",
    RULE_TEMPLATE_TYPE_INPUT: "input",
    RULE_TEMPLATE_TYPE_OUTPUT: "output",

    // Mode of Business Rule form
    BUSINESS_RULE_FORM_MODE_CREATE: "create",
    BUSINESS_RULE_FORM_MODE_EDIT: "edit",

    // Business Rule types
    BUSINESS_RULE_TYPE_TEMPLATE: "template",
    BUSINESS_RULE_TYPE_SCRATCH: "scratch",

    // Business Rule from scratch property types
    BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_INPUT: "inputData",
    BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_OUTPUT: "outputData",
    BUSINESS_RULE_FROM_SCRATCH_PROPERTY_TYPE_RULE_COMPONENTS: "ruleComponents",

    // Business Rule deployment statuses
    BUSINESS_RULE_DEPLOYMENT_STATUS_DEPLOYED: "deployed",
    BUSINESS_RULE_DEPLOYMENT_STATUS_NOT_DEPLOYED: "notDeployed",

    // Business Rule Filter Rule operators
    BUSINESS_RULE_FILTER_RULE_OPERATORS: ['<','<=','>','>=','==','!=']
}

export default BusinessRulesConstants;
