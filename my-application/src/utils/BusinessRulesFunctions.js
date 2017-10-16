import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// Material-UI
import TemplateGroupSelector from "../components/TemplateGroupSelector";
import BusinessRulesConstants from "./BusinessRulesConstants";
import RuleTemplateSelector from "../components/RuleTemplateSelector";
import BusinessRuleEditor from "../components/BusinessRuleEditor";
import BusinessRuleFromScratchCreator from "../components/BusinessRuleFromScratchCreator";
import {Typography} from "material-ui";
import { CircularProgress } from 'material-ui/Progress';
import BusinessRuleCreator from "../components/BusinessRuleCreator";
import BusinessRulesAPIs from "./BusinessRulesAPIs";
import BusinessRuleFromTemplateForm from "../components/BusinessRuleFromTemplateForm";
import BusinessRuleFromScratchForm from "../components/BusinessRuleFromScratchForm";
import BusinessRulesMessageStringConstants from "./BusinessRulesMessageStringConstants";
import BusinessRuleModifier from "../components/BusinessRuleModifier";
import ShowProgressComponent from "../components/ShowProgressComponent";
import {Router, Route} from 'react-router';


class BusinessRulesFunctions {
    // Load from API and store
    availableTemplateGroups = this.getTemplateGroups()
    /* Start of Methods related to API calls **************************************/
    availableBusinessRules = this.getBusinessRules()
    // Properties given in the form, for Creating a Business Rule
    businessRuleEnteredValues = {
        'uuid': '',
        'name': '',
        'templateGroupUUID': '',
        'ruleTemplateUUID': '',
        'type': '',
        'properties': {}
    }

    /**
     * Loads business rule form, for the business rule of the given id - for viewing / editing
     * The form is Editable or not, according to the given boolean value
     *
     * @param editable
     */
    static viewBusinessRuleForm(editable,businessRuleUUID){
        let businessRulePromise = this.getBusinessRule(businessRuleUUID)
        businessRulePromise.then(function(businessRuleResponse){
            let gotBusinessRule = businessRuleResponse.data

            // Get the template group
            let templateGroupPromise = BusinessRulesFunctions.getTemplateGroup(gotBusinessRule.templateGroupUUID)
            templateGroupPromise.then(function (response) {
                let templateGroup = response.data

                // Get rule templates
                let ruleTemplatesPromise = BusinessRulesFunctions.getRuleTemplates(templateGroup.uuid)
                ruleTemplatesPromise.then(function(ruleTemplatesResponse){
                    // Filter rule template types
                    let templateRuleTemplates = []
                    let inputRuleTemplates = []
                    let outputRuleTemplates = []
                    for(let ruleTemplate of ruleTemplatesResponse.data){
                        if(ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_TEMPLATE){
                            templateRuleTemplates.push(ruleTemplate)
                        }else if(ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_INPUT){
                            inputRuleTemplates.push(ruleTemplate)
                        } else {
                            outputRuleTemplates.push(ruleTemplate)
                        }
                    }

                    // If Business Rule has been created from a template
                    if (gotBusinessRule.type === BusinessRulesConstants.BUSINESS_RULE_TYPE_TEMPLATE) {
                        // Get 'template' type rule template, from which the Business Rule has been created
                        let ruleTemplatePromise = BusinessRulesFunctions.getRuleTemplate(
                            gotBusinessRule.templateGroupUUID,
                            gotBusinessRule.ruleTemplateUUID
                        )

                        ruleTemplatePromise.then(function(ruleTemplateResponse){
                            // Render the form
                            ReactDOM.render (
                                <BusinessRuleFromTemplateForm
                                    businessRuleType={BusinessRulesConstants.BUSINESS_RULE_TYPE_TEMPLATE}
                                    formMode={
                                        (editable)?(BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT):
                                            (BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_VIEW)
                                    }
                                    businessRuleName={gotBusinessRule.name}
                                    businessRuleUUID={gotBusinessRule.uuid}
                                    selectedTemplateGroup={templateGroup}
                                    selectedRuleTemplate={ruleTemplateResponse.data}
                                    templateRuleTemplates={templateRuleTemplates}
                                    businessRuleProperties={gotBusinessRule.properties}
                                />,
                                document.getElementById('root')
                            )
                        })
                    } else {
                        // If business rule has been created from scratch

                        // Get input rule template, from which the business rule has been created
                        let inputRuleTemplatePromise = BusinessRulesFunctions.getRuleTemplate(
                            gotBusinessRule.templateGroupUUID,
                            gotBusinessRule.inputRuleTemplateUUID
                        )
                        inputRuleTemplatePromise.then(function(inputRuleTemplateResponse){
                            let inputRuleTemplate = inputRuleTemplateResponse.data

                            // Get output rule template, from which the business rule has been created
                            let outputRuleTemplatePromise = BusinessRulesFunctions.getRuleTemplate(
                                gotBusinessRule.templateGroupUUID,
                                gotBusinessRule.outputRuleTemplateUUID
                            )
                            outputRuleTemplatePromise.then(function(outputRuleTemplateResponse){
                                let outputRuleTemplate = outputRuleTemplateResponse.data

                                // Render the form
                                ReactDOM.render (
                                    <BusinessRuleFromScratchForm
                                        businessRuleType={BusinessRulesConstants.BUSINESS_RULE_TYPE_SCRATCH}
                                        formMode={
                                            (editable)?(BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_EDIT):
                                                (BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_VIEW)
                                        }
                                        businessRuleName={gotBusinessRule.name}
                                        businessRuleUUID={gotBusinessRule.uuid}
                                        selectedTemplateGroup={templateGroup}
                                        selectedInputRuleTemplate={inputRuleTemplate}
                                        selectedOutputRuleTemplate={outputRuleTemplate}
                                        inputRuleTemplates={inputRuleTemplates}
                                        outputRuleTemplates={outputRuleTemplates}
                                        businessRuleProperties={gotBusinessRule.properties}
                                    />,
                                    document.getElementById('root')
                                )
                            })
                        })
                    }
                })
            })
        })
    }

    /**
     * Loads business rule creator, which allows to create a business rule from template, or scratch
     */
    static loadBusinessRuleCreator() {
        ReactDOM.render(
            <BusinessRuleCreator/>,
            document.getElementById('root')
        );
    }

    /**
     * Shows available Template Groups to select one,
     * for creating a Business Rule in the given mode
     */
    static loadTemplateGroupSelector(mode) {
        let responseData = this.getTemplateGroups()
        responseData.then(function (response) {
            ReactDOM.render(
                <TemplateGroupSelector
                    templateGroups={response.data}
                    mode={mode}
                />, document.getElementById('root'))
        }).catch(error => {
            console.log(error);
        });
    }

    /**
     * Shows form to create a BusinessRule from scratch,
     * by selecting input & output rule templates from a list of available ones
     */
    static loadBusinessRuleFromScratchCreator(templateGroupUUID) {
        let that = this
        let templateGroupPromise = this.getTemplateGroup(templateGroupUUID)
        templateGroupPromise.then(function(templateGroupResponse){
            // template group is loaded
            let templateGroup = templateGroupResponse.data //todo: what if this api call fails? no 'data'!
            let ruleTemplatesPromise = that.getRuleTemplates(templateGroupUUID)
            ruleTemplatesPromise.then(function(ruleTemplatesResponse){
                let inputRuleTemplates = []
                let outputRuleTemplates = []

                // Get input & output templates into different arrays
                for (let ruleTemplate of ruleTemplatesResponse.data) {
                    if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_INPUT) {
                        inputRuleTemplates.push(ruleTemplate)
                    } else if (ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_OUTPUT) {
                        outputRuleTemplates.push(ruleTemplate)
                    }
                }
                ReactDOM.render(
                    <BusinessRuleFromScratchForm
                        formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE}
                        selectedTemplateGroup={templateGroup}
                        inputRuleTemplates={inputRuleTemplates}
                        outputRuleTemplates={outputRuleTemplates}
                    />, document.getElementById('root'))
            });
        })
    }

    /**
     * Loads the business rule modifier (the landing page) after reading the available business rules,
     * and the snack bar when required (after submitting forms)
     *
     * @param displaySnackBar Status of displaying the snackbar (true-display / false-not)
     * @param snackbarMessageStatus Status code, that is after an API response
     */
    static loadBusinessRuleModifier(displaySnackBar, snackbarMessageStatus){
        let styles = {
            progress: {
                margin: 10
            },
            progress: {
                backgroundColor: '#EF6C00'
            },
        }

        // Load available Business Rules
        let businessRulesPromise = BusinessRulesFunctions.getBusinessRules()
        businessRulesPromise.then(function(response){
            console.log("BUSINESS RULES MANAGER STARTED")
            console.log(response)
            ReactDOM.render(
                <BusinessRuleModifier
                    businessRules={response.data}
                    displaySnackBar={displaySnackBar}
                    snackbarMessageStatus={snackbarMessageStatus}
                />, document.getElementById("root"))
        }).catch(function(error){
            ReactDOM.render(<ShowProgressComponent error={BusinessRulesMessageStringConstants.CONNECTION_FAILURE}/>,
                document.getElementById("root"))
        })
        // Show 'please wait'
        ReactDOM.render(<ShowProgressComponent/>, document.getElementById("root"))
    }

    /**
     * Loads the form for creating a business rule from template
     */
    static loadBusinessRulesFromTemplateCreator(templateGroupUUID) {
        // Get the template group
        let templateGroupPromise = this.getTemplateGroup(templateGroupUUID)
        templateGroupPromise.then(function(templateGroupResponse){
            let ruleTemplatesPromise = BusinessRulesFunctions.getRuleTemplates(templateGroupUUID)
            ruleTemplatesPromise.then(function(ruleTemplatesResponse){
                // Filter and get the rule templates, only of type 'template'
                let templateRuleTemplates = []
                for(let ruleTemplate of ruleTemplatesResponse.data){
                    if(ruleTemplate.type === BusinessRulesConstants.RULE_TEMPLATE_TYPE_TEMPLATE){
                        templateRuleTemplates.push(ruleTemplate)
                    }
                }

                ReactDOM.render(
                    <BusinessRuleFromTemplateForm
                        formMode={BusinessRulesConstants.BUSINESS_RULE_FORM_MODE_CREATE}
                        selectedTemplateGroup={templateGroupResponse.data}
                        templateRuleTemplates={templateRuleTemplates}
                    />,
                    document.getElementById('root')
                )

                //
                // ReactDOM.render(<RuleTemplateSelector
                //     selectedTemplateGroup={templateGroupResponse.data}
                //     ruleTemplates={ruleTemplatesResponse.data}
                // />, document.getElementById('root'));
            })
        })
        // let responseTemplateGroupData = this.getTemplateGroup(templateGroupUUID).then(function(response){
        //
        // });
        //
        // ReactDOM.render(<RuleTemplateSelector
        //     selectedTemplateGroup={foundTemplateGroup}
        //     ruleTemplateTypeFilter={ruleTemplateTypeFilter}
        //     ruleTemplates={availableRuleTemplates}
        // />, document.getElementById('root'));
    }

// API [4] is the POST for CreateBusinessRule

    /**
     * Returns promise for available Template Groups
     * @returns {*}
     */
    static getTemplateGroups() {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let gotTemplateGroups = apis.getTemplateGroups();
        return gotTemplateGroups;
    }

    /** [2]
     * Returns promise for available Rule Templates, belong to the given Template Group
     * todo: from API
     *
     * @param templateGroupName
     */
    static getRuleTemplates(templateGroupUUID) {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL)
        let gotRuleTemplates = apis.getRuleTemplates(templateGroupUUID)
        return gotRuleTemplates
    }

    /** [3]
     * Get available Properties, belong to the given Template Group and Rule Template
     * todo: from API
     *
     * @param templateGroupName
     * @param ruleTemplateName
     * @returns {*|Array}
     */
    static getRuleTemplateProperties(templateGroupName, ruleTemplateName) {
        // todo: remove hardcode ******************************
        var ruleTemplates
        for (let templateGroup of this.availableTemplateGroups) {
            if (templateGroup.name === templateGroupName) {
                ruleTemplates = templateGroup.ruleTemplates
                break
            }
        }
        for (let ruleTemplate of ruleTemplates) {
            if (ruleTemplate.name === ruleTemplateName) {
                return ruleTemplate.properties
            }
        }
        // todo: **********************************************
        // todo: Return Properties from API
    }

    /** [5]
     * Returns promise for BusinessRulesCreator
     * todo: from API
     *
     * @returns {[null,null]}
     */
    static getBusinessRules() {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let gotBusinessRules = apis.getBusinessRules();

        return gotBusinessRules;

        // todo: remove hardcode *****************************
        // var receivedBusinessRules = [
        //     {
        //         "uuid": "my-stock-data-analysis",
        //         "name": "My Stock Data Analysis",
        //         "templateGroupUUID": "stock-exchange",
        //         "ruleTemplateUUID": "stock-data-analysis",
        //         "type": "template",
        //         "properties": {
        //             "sourceTopicList": "StockStream",
        //             "sourceMapType": "xml",
        //             "sinkTopic": "resultTopic",
        //             "sinkMapType": "xml",
        //             "minShareVolumesMargin": "20",
        //             "maxShareVolumesMargin": "10000"
        //         }
        //     },
        //     {
        //         "uuid": "custom-stock-exchange-analysis-for-wso2",
        //         "name": "Custom Stock Exchange Analysis for WSO2",
        //         "templateGroupUUID": "stock-exchange",
        //         "inputRuleTemplateUUID": "stock-exchange-input",
        //         "outputRuleTemplateUUID": "stock-exchange-output",
        //         "type": "scratch",
        //         "properties": {
        //             "inputData": {
        //                 "topicList": "SampleStockStream2",
        //                 "topicList2": "StockStream"
        //             },
        //             "ruleComponents": {
        //                 "filterRules": ["price > 1000", "volume < 50", "name == 'WSO2 Inc'"],
        //                 "ruleLogic": ["1 OR (2 AND 3)"]
        //             },
        //             "outputData": {
        //                 "resultTopic": "SampleResultTopic2",
        //                 "resultTopic2": "SampleResultTopic2_1"
        //             },
        //             "outputMappings": {
        //                 "companyName": "name",
        //                 "companySymbol": "symbol",
        //                 "sellingPrice": "price"
        //             }
        //         }
        //     }
        // ]
        //
        // return receivedBusinessRules
        // todo: *********************************************
        // todo: Get BusinessRulesCreator from API ******************
    }

// End of Functions that have API calls unnecessarily //////////////////////////

    /* End of Methods related to API calls ****************************************/

    /** [6]
     * Gets the BusinessRule with the given UUID
     * todo: from API
     *
     * @param businessRuleUUID
     * @returns {null|null}
     */
    static getBusinessRule(businessRuleUUID) {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL)
        let gotBusinessRule = apis.getBusinessRule(businessRuleUUID)

        return gotBusinessRule
        // // todo: remove hardcode ******************************
        // for (let businessRule of this.getBusinessRules()) {
        //     if (businessRuleUUID === businessRule.uuid) {
        //         return businessRule
        //     }
        // }
        // // todo: *********************************************
        // // todo: Get BusinessRule from API *******************

    }

// Functions that have API calls unnecessarily /////////////////////////////////
    /**
     * Returns promise of the found Template Group with the given name
     * todo: from API (We have available templateGroups in front end itself)
     *
     * @param templateGroupName
     * @returns {*}
     */
    static getTemplateGroup(templateGroupUUID) {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let gotTemplateGroup = apis.getTemplateGroup(templateGroupUUID);

        return gotTemplateGroup;
    }

    /**
     * Returns promise of the Rule Template with the given name, that belongs to the given Template Group name
     * todo: from API (We have available templateGroups in front end itself)
     * todo: make sure to assign the belonging templateGroup for ruleTemplate
     *
     * @param templateGroupName
     * @param ruleTemplateName
     * @returns {*}
     */
    static getRuleTemplate(templateGroupUUID, ruleTemplateUUID) {
        let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        let gotRuleTemplate = apis.getRuleTemplate(templateGroupUUID, ruleTemplateUUID);

        return gotRuleTemplate;
    }

    /**
     * TODO : Implement
     * Gets the deployment status of a given Business Rule
     *
     * @param businessRuleUUID
     */
    static getBusinessRuleDeploymentStatus(businessRuleUUID) {
        // Generates a random status for now
        let statuses = [
            BusinessRulesConstants.BUSINESS_RULE_DEPLOYMENT_STATUS_DEPLOYED,
            BusinessRulesConstants.BUSINESS_RULE_DEPLOYMENT_STATUS_NOT_DEPLOYED
        ]

        return statuses[Math.floor(Math.random() * statuses.length)]
    }

    /* Roughly implemented functions *//////////////////////////////////////////////////////////////////////////////////////

    /* End of Roughly implemented functions *///////////////////////////////////////////////////////////////////////////////

    /**
     * Generates UUID for a given Business Rule name
     *
     * @param businessRuleName
     * @returns {string}
     */
    static generateBusinessRuleUUID(businessRuleName) {
        return businessRuleName.toLowerCase().split(' ').join('-')
    }

    /**
     * Checks whether a given object is empty or not
     *
     * @param object
     * @returns {boolean}
     */
    static isEmpty(object) {
        for(var key in object) {
            if(object.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}

export default BusinessRulesFunctions;
