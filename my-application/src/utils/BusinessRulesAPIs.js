import React from 'react';
// import './index.css';
// Material-UI
// axios
import axios from 'axios';

/**
 * Used to call APIs, related to Business Rules
 */
class BusinessRulesAPIs {
    constructor(url) {
        this.url = url
    }

    /**
     * Returns the axios http client
     */
    getHTTPClient() {
        let httpClient = axios.create({
            baseURL: this.url + '/business-rule',
            timeout: 30000
        });
        //httpClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        return httpClient;
    }

    /**
     * Returns available template groups
     */
    getTemplateGroups() {
        let client = this.getHTTPClient()
        //return client.get('/template-groups')
        return this.getHTTPClient().get('/template-groups')
    }

    /**
     * Returns the template group that has the given ID
     * @param templateGroupID
     */
    getTemplateGroup(templateGroupID) {
        return this.getHTTPClient().get('/template-groups/' + templateGroupID)
    }

    /**
     * Returns rule templates available under the given template group
     * @param templateGroupID
     */
    getRuleTemplates(templateGroupID) {
        return this.getHTTPClient().get('/template-groups/' + templateGroupID + '/templates')
    }

    /**
     * Returns the rule template that has the given ruleTemplateID and belongs to the template group
     * with the given templateGroupID
     *
     * @param templateGroupID
     * @param ruleTemplateID
     */
    getRuleTemplate(templateGroupID, ruleTemplateID) {
        return this.getHTTPClient().get('/template-groups/' + templateGroupID + '/templates/' + ruleTemplateID)
    }

    /**
     * Creates a business rule with the given business rule JSON.
     * Deploying enabled or disabled according to the given deployStatus
     *
     * @param businessRuleJSON
     * @param deployStatus Deploy if true, Do not deploy if false
     * @returns {AxiosPromise}
     */
    createBusinessRule(businessRuleJSON, deployStatus) {
        // Hold sent JSON against the key 'businessRule' in form data
        var formData = new FormData();
        formData.append("businessRule", (businessRuleJSON));

        // Send as multipart/form-data
        let httpClient = this.getHTTPClient()
        return httpClient.post('/instances?deploy='+deployStatus,formData,
            {headers:{'Content-Type': 'multipart/form-data'}})
    }

    /**
     * Returns available business rules
     */
    getBusinessRules() {
        return this.getHTTPClient().get('/instances')
    }

    /**
     * Returns the business rule with the given ID
     * @param businessRuleID
     */
    getBusinessRule(businessRuleID) {
        return this.getHTTPClient().get('/instances/' + businessRuleID)
    }

    /**
     * Updates the business rule with the given ID, with the given JSON of a business rule
     *
     * @param businessRuleID
     * @param businessRuleJSON
     * @returns {AxiosPromise}
     */
    updateBusinessRule(businessRuleID, businessRuleJSON) {
        return this.getHTTPClient().put(businessRuleID, businessRuleJSON)
    }

    /**
     * Deletes the business rule with the given ID.
     * Un-deploys SiddhiApps of the business rule only if force deletion status is false
     *
     * @param businessRuleID
     * @param forceDeleteStatus
     */
    deleteBusinessRule(businessRuleID, forceDeleteStatus) {
        return this.getHTTPClient()
            .delete('/instances/' + businessRuleID + '?force-delete=' + forceDeleteStatus);
    }
}

export default BusinessRulesAPIs;
