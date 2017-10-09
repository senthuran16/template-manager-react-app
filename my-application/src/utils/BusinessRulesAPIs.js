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
        console.log("APIS CONSTRUCTOR CALLED WITH URL : " + url)
    }

    /**
     * Returns the axios http client
     */
    getHTTPClient() {
        let httpClient = axios.create({
            baseURL: this.url + '/business-rule',
            timeout: 2000
        });
        httpClient.defaults.headers.post['Content-Type'] = 'application/json';
        return httpClient
    }

    /**
     * Returns available template groups
     */
    getTemplateGroups() {
        console.log("GET TEMPLATE GROUPS CALLED")
        console.log("HTTP CLIENT IS : ")
        let client = this.getHTTPClient()
        console.log(client)
        return client.get('/template-groups')
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
     * Creates a business rule with the given business rule JSON
     *
     * @param businessRuleJSON
     * @returns {AxiosPromise}
     */
    createBusinessRule(businessRuleJSON) {
        return this.getHTTPClient().post('/instances', businessRuleJSON)
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
     * @param businessRuleID
     * @param businessRuleJSON
     * @returns {AxiosPromise}
     */
    updateBusinessRule(businessRuleID, businessRuleJSON) {
        return this.getHTTPClient().put(businessRuleID, businessRuleJSON)
    }

    /**
     * Deletes the busingess rule with the given ID.
     * Undeploys siddhiApps of the business rule only if force deletion status is false
     *
     * @param businessRuleID
     * @param forceDeleteStatus
     */
    deleteBusinessRule(businessRuleID, forceDeleteStatus) {
        return this.getHTTPClient().delete(businessRuleID)
    }
}

export default BusinessRulesAPIs;
