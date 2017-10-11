import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// Material-UI
import TemplateGroupSelector from "../components/TemplateGroupSelector";
import BusinessRulesConstants from "./BusinessRulesConstants";
import RuleTemplateSelector from "../components/RuleTemplateSelector";
import BusinessRuleEditor from "../components/BusinessRuleEditor";
import BusinessRuleFromScratchCreator from "../components/BusinessRuleFromScratchCreator";
import BusinessRuleCreator from "../components/BusinessRuleCreator";
import BusinessRulesAPIs from "./BusinessRulesAPIs";


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
     * Loads the edit form for the given Business Rule
     *
     * @param businessRuleUUID
     */
    static loadBusinessRuleEditor(businessRuleUUID) {
        ReactDOM.render(
            <BusinessRuleEditor
                businessRule={this.getBusinessRule(businessRuleUUID)}
            />, document.getElementById('root'));
    }

    static loadBusinessRuleCreator() {
        ReactDOM.render(
            <BusinessRuleCreator/>,
            document.getElementById('root')
        );
    }

    /**
     * Shows available Template Groups to select one,
     * for creating a Business Rule from template
     */
    static loadTemplateGroupSelector() {
        let responseData = this.getTemplateGroups()
        responseData.then(function(response){
            ReactDOM.render(<TemplateGroupSelector
                templateGroups={response.data}
            />, document.getElementById('root'))
        }).catch(error => {
            console.log(error);
        });
    }

    /**
     * Shows form to create a BusinessRule from scratch,
     * by selecting input & output rule templates from a list of available ones
     */
    static loadBusinessRuleFromScratchCreator() {
        let responseData = this.getTemplateGroups()
        responseData.then(function(response){
            ReactDOM.render(
                <BusinessRuleFromScratchCreator
                    templateGroups={response.data}/>,
                document.getElementById('root')
            )
        });
    }

    /**
     * Shows available Rule Templates of given type under given templateGroup,
     * to select one and generate a form out of that
     */
    static loadRuleTemplateSelector(templateGroupUUID, ruleTemplateTypeFilter) {
        let templateGroupPromise = this.getTemplateGroup(templateGroupUUID)
        templateGroupPromise.then(function(templateGroupResponse){
            console.log("TEMPLATE GROUP PROMISE")
            console.log(templateGroupResponse.data)
            let ruleTemplatesPromise = BusinessRulesFunctions.getRuleTemplates(templateGroupUUID)
            ruleTemplatesPromise.then(function(ruleTemplatesResponse){
                console.log("RULE TEMPLATE RESPONSE DATA")
                console.log(ruleTemplatesResponse.data)
                ReactDOM.render(<RuleTemplateSelector
                    selectedTemplateGroup={templateGroupResponse.data}
                    ruleTemplateTypeFilter={ruleTemplateTypeFilter}
                    ruleTemplates={ruleTemplatesResponse.data}
                />, document.getElementById('root'));
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
        // let apis = new BusinessRulesAPIs(BusinessRulesConstants.APIS_URL);
        // let gotBusinessRules = apis.getBusinessRules();
        //
        // return gotBusinessRules;

        // todo: remove hardcode *****************************
        var receivedBusinessRules = [
            {
                "uuid": "my-stock-data-analysis",
                "name": "My Stock Data Analysis",
                "templateGroupUUID": "stock-exchange",
                "ruleTemplateUUID": "stock-data-analysis",
                "type": "template",
                "properties": {
                    "sourceTopicList": "StockStream",
                    "sourceMapType": "xml",
                    "sinkTopic": "resultTopic",
                    "sinkMapType": "xml",
                    "minShareVolumesMargin": "20",
                    "maxShareVolumesMargin": "10000"
                }
            },
            {
                "uuid": "custom-stock-exchange-analysis-for-wso2",
                "name": "Custom Stock Exchange Analysis for WSO2",
                "templateGroupUUID": "stock-exchange",
                "inputRuleTemplateUUID": "stock-exchange-input",
                "outputRuleTemplateUUID": "stock-exchange-output",
                "type": "scratch",
                "properties": {
                    "inputData": {
                        "topicList": "SampleStockStream2",
                        "topicList2": "StockStream"
                    },
                    "ruleComponents": {
                        "filterRules": ["price > 1000", "volume < 50", "name == 'WSO2 Inc'"],
                        "ruleLogic": ["1 OR (2 AND 3)"]
                    },
                    "outputData": {
                        "resultTopic": "SampleResultTopic2",
                        "resultTopic2": "SampleResultTopic2_1"
                    },
                    "outputMappings": {
                        "companyName": "name",
                        "companySymbol": "symbol",
                        "sellingPrice": "price"
                    }
                }
            }
        ]

        return receivedBusinessRules
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
        // todo: remove hardcode ******************************
        for (let businessRule of this.getBusinessRules()) {
            if (businessRuleUUID === businessRule.uuid) {
                return businessRule
            }
        }
        // todo: *********************************************
        // todo: Get BusinessRule from API *******************

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
}

export default BusinessRulesFunctions;
