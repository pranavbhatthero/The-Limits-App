import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getLimitsRecordId from '@salesforce/apex/LimitsApp.getLimitsRecordId';
import getLimitsRecordIdOnClick from '@salesforce/apex/LimitsApp.getLimitsRecordIdOnClick';

export default class LimitsAppViewLatestLimit extends LightningElement {
    @track recordId;
    @track recordData;
    @track error;

    @wire(getLimitsRecordId)
    wiredRecordId({ error, data }) {
        if (data) {
            this.recordId = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.error(error);
            this.recordId = undefined;
        }
    }

    handleLoad() {
        getLimitsRecordIdOnClick()
            .then(result => {
                this.recordId = result;
                console.log(this.recordId);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                console.error(error);
            });
    }

    @wire(getRecord, { recordId: '$recordId', fields: [Name, Latest__c, SingleEmail_Max__c , SingleEmail_Remaining__c , StreamingApiConcurrentClients_Max__c , StreamingApiConcurrentClients_Remaining__c , AnalyticsExternalDataSizeMB_Max__c , AnalyticsExternalDataSizeMB_Remaining__c , ConcurrentAsyncGetReportInstances_Max__c , ConcurrentAsyncGetReportInstances_Remain__c , ConcurrentSyncReportRuns_Max__c , ConcurrentSyncReportRuns_Remaining__c , HourlyAsyncReportRuns_Max__c , HourlyAsyncReportRuns_Remaining__c , HourlySyncReportRuns_Max__c , HourlySyncReportRuns_Remaining__c , HourlyDashboardRefreshes_Max__c , HourlyDashboardRefreshes_Remaining__c , HourlyDashboardResults_Max__c , HourlyDashboardResults_Remaining__c , HourlyDashboardStatuses_Max__c , HourlyDashboardStatuses_Remaining__c , MassEmail_Max__c , MassEmail_Remaining__c , DailyApiRequests_Max__c , DailyApiRequests_Remaining__c , DailyAsyncApexExecutions_Max__c , DailyAsyncApexExecutions_Remaining__c , DailyAsyncApexTests_Max__c , DailyAsyncApexTests_Remaining__c , DailyBulkApiBatches_Max__c , DailyBulkApiBatches_Remaining__c , DailyBulkV2QueryFileStorageMB_Max__c , DailyBulkV2QueryFileStorageMB_Remaining__c , DailyBulkV2QueryJobs_Max__c , DailyBulkV2QueryJobs_Remaining__c , HourlyPublishedPlatformEvents_Max__c , HourlyPublishedPlatformEvents_Remaining__c , HourlyPSVPlatformEvents_Max__c , HourlyPSVPlatformEvents_Rem__c , DailyStandardVolumePlatformEvents_Max__c , DailyStandardVolumePlatformEvents_Remain__c , DailyDeliveredPlatformEvents_Max__c , DailyDeliveredPlatformEvents_Remaining__c , 
        MonthlyPlatformEventsUsageEntitlement_Ma__c , MonthlyPlatformEventsUsageEntitlement_Re__c , PrivateConnectOutboundCalloutHourly_Max__c , PrivateConnectOutboundCalloutHourly_Rem__c , HourlyLongTermIdMapping_Max__c , HourlyLongTermIdMapping_Remaining__c , HourlyODataCallout_Max__c , HourlyODataCallout_Remaining__c , HourlyShortTermIdMapping_Max__c , HourlyShortTermIdMapping_Remaining__c , ActiveScratchOrgs_Max__c , ActiveScratchOrgs_Remaining__c , DailyScratchOrgs_Max__c , DailyScratchOrgs_Remaining__c , Package2VersionCreates_Max__c , Package2VersionCreates_Remaining__c , Package2VersionCreatesWOV_Max__c , Package2VersionCreatesWOV_Rem__c , DailyFunctionsApiCallLimit_Max__c , DailyFunctionsApiCallLimit_Remaining__c , DataStorageMB_Max__c , DataStorageMB_Remaining__c , FileStorageMB_Max__c , FileStorageMB_Remaining__c , DailyDurableGenericStreamingApiEvents_Ma__c , DailyDurableGenericStreamingApiEvents_Re__c , DailyDurableStreamingApiEvents_Max__c , DailyDurableStreamingApiEvents_Remaining__c , DurableStreamingApiConcurrentClients_Max__c , DurableStreamingApiConcurrentClients_Rem__c , DailyGenericStreamingApiEvents_Max__c , DailyGenericStreamingApiEvents_Remaining__c , DailyStreamingApiEvents_Max__c , DailyStreamingApiEvents_Remaining__c , DailyWorkflowEmails_Max__c , DailyWorkflowEmails_Remaining__c , HourlyTimeBasedWorkflow_Max__c , HourlyTimeBasedWorkflow_Remaining__c] })
    wiredRecord({ error, data }) {
        if (data) {
            this.recordData = data;

            this.SingleEmail_progress = Math.round(((data.fields.TheLimitsApp__SingleEmail_Max__c.value)-(data.fields.TheLimitsApp__SingleEmail_Remaining__c.value))/data.fields.TheLimitsApp__SingleEmail_Max__c.value*100);
            this.StreamingApiConcurrentClients_progress = Math.round(((data.fields.TheLimitsApp__StreamingApiConcurrentClients_Max__c.value)-(data.fields.TheLimitsApp__StreamingApiConcurrentClients_Remaining__c.value))/data.fields.TheLimitsApp__StreamingApiConcurrentClients_Max__c.value*100);
            this.AnalyticsExternalDataSizeMB_progress = Math.round(((data.fields.TheLimitsApp__AnalyticsExternalDataSizeMB_Max__c.value)-(data.fields.TheLimitsApp__AnalyticsExternalDataSizeMB_Remaining__c.value))/data.fields.TheLimitsApp__AnalyticsExternalDataSizeMB_Max__c.value*100);
            this.ConcurrentAsyncGetReportInstances_progress = Math.round(((data.fields.TheLimitsApp__ConcurrentAsyncGetReportInstances_Max__c.value)-(data.fields.TheLimitsApp__ConcurrentAsyncGetReportInstances_Remain__c.value))/data.fields.TheLimitsApp__ConcurrentAsyncGetReportInstances_Max__c.value*100);
            this.ConcurrentSyncReportRuns_progress = Math.round(((data.fields.TheLimitsApp__ConcurrentSyncReportRuns_Max__c.value)-(data.fields.TheLimitsApp__ConcurrentSyncReportRuns_Remaining__c.value))/data.fields.TheLimitsApp__ConcurrentSyncReportRuns_Max__c.value*100);
            this.HourlyAsyncReportRuns_progress = Math.round(((data.fields.TheLimitsApp__HourlyAsyncReportRuns_Max__c.value)-(data.fields.TheLimitsApp__HourlyAsyncReportRuns_Remaining__c.value))/data.fields.TheLimitsApp__HourlyAsyncReportRuns_Max__c.value*100);
            this.HourlySyncReportRuns_progress = Math.round(((data.fields.TheLimitsApp__HourlySyncReportRuns_Max__c.value)-(data.fields.TheLimitsApp__HourlySyncReportRuns_Remaining__c.value))/data.fields.TheLimitsApp__HourlySyncReportRuns_Max__c.value*100);
            this.HourlyDashboardRefreshes_progress = Math.round(((data.fields.TheLimitsApp__HourlyDashboardRefreshes_Max__c.value)-(data.fields.TheLimitsApp__HourlyDashboardRefreshes_Remaining__c.value))/data.fields.TheLimitsApp__HourlyDashboardRefreshes_Max__c.value*100);
            this.HourlyDashboardResults_progress = Math.round(((data.fields.TheLimitsApp__HourlyDashboardResults_Max__c.value)-(data.fields.TheLimitsApp__HourlyDashboardResults_Remaining__c.value))/data.fields.TheLimitsApp__HourlyDashboardResults_Max__c.value*100);
            this.HourlyDashboardStatuses_progress = Math.round(((data.fields.TheLimitsApp__HourlyDashboardStatuses_Max__c.value)-(data.fields.TheLimitsApp__HourlyDashboardStatuses_Remaining__c.value))/data.fields.TheLimitsApp__HourlyDashboardStatuses_Max__c.value*100);
            this.MassEmail_progress = Math.round(((data.fields.TheLimitsApp__MassEmail_Max__c.value)-(data.fields.TheLimitsApp__MassEmail_Remaining__c.value))/data.fields.TheLimitsApp__MassEmail_Max__c.value*100);
            this.DailyApiRequests_progress = Math.round(((data.fields.TheLimitsApp__DailyApiRequests_Max__c.value)-(data.fields.TheLimitsApp__DailyApiRequests_Remaining__c.value))/data.fields.TheLimitsApp__DailyApiRequests_Max__c.value*100);
            this.DailyAsyncApexExecutions_progress = Math.round(((data.fields.TheLimitsApp__DailyAsyncApexExecutions_Max__c.value)-(data.fields.TheLimitsApp__DailyAsyncApexExecutions_Remaining__c.value))/data.fields.TheLimitsApp__DailyAsyncApexExecutions_Max__c.value*100);
            this.DailyAsyncApexTests_progress = Math.round(((data.fields.TheLimitsApp__DailyAsyncApexTests_Max__c.value)-(data.fields.TheLimitsApp__DailyAsyncApexTests_Remaining__c.value))/data.fields.TheLimitsApp__DailyAsyncApexTests_Max__c.value*100);
            this.DailyBulkApiBatches_progress = Math.round(((data.fields.TheLimitsApp__DailyBulkApiBatches_Max__c.value)-(data.fields.TheLimitsApp__DailyBulkApiBatches_Remaining__c.value))/data.fields.TheLimitsApp__DailyBulkApiBatches_Max__c.value*100);
            this.DailyBulkV2QueryFileStorageMB_progress = Math.round(((data.fields.TheLimitsApp__DailyBulkV2QueryFileStorageMB_Max__c.value)-(data.fields.TheLimitsApp__DailyBulkV2QueryFileStorageMB_Remaining__c.value))/data.fields.TheLimitsApp__DailyBulkV2QueryFileStorageMB_Max__c.value*100);
            this.DailyBulkV2QueryJobs_progress = Math.round(((data.fields.TheLimitsApp__DailyBulkV2QueryJobs_Max__c.value)-(data.fields.TheLimitsApp__DailyBulkV2QueryJobs_Remaining__c.value))/data.fields.TheLimitsApp__DailyBulkV2QueryJobs_Max__c.value*100);
            this.HourlyPublishedPlatformEvents_progress = Math.round(((data.fields.TheLimitsApp__HourlyPublishedPlatformEvents_Max__c.value)-(data.fields.TheLimitsApp__HourlyPublishedPlatformEvents_Remaining__c.value))/data.fields.TheLimitsApp__HourlyPublishedPlatformEvents_Max__c.value*100);
            this.HourlyPublishedStandardVolumePlatformEvents_progress = Math.round(((data.fields.TheLimitsApp__HourlyPSVPlatformEvents_Max__c.value)-(data.fields.TheLimitsApp__HourlyPSVPlatformEvents_Rem__c.value))/data.fields.TheLimitsApp__HourlyPSVPlatformEvents_Max__c.value*100);
            this.DailyStandardVolumePlatformEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyStandardVolumePlatformEvents_Max__c.value)-(data.fields.TheLimitsApp__DailyStandardVolumePlatformEvents_Remain__c.value))/data.fields.TheLimitsApp__DailyStandardVolumePlatformEvents_Max__c.value*100);
            this.DailyDeliveredPlatformEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyDeliveredPlatformEvents_Max__c.value)-(data.fields.TheLimitsApp__DailyDeliveredPlatformEvents_Remaining__c.value))/data.fields.TheLimitsApp__DailyDeliveredPlatformEvents_Max__c.value*100);
            this.MonthlyPlatformEventsUsageEntitlement_progress = Math.round(((data.fields.TheLimitsApp__MonthlyPlatformEventsUsageEntitlement_Ma__c.value)-(data.fields.TheLimitsApp__MonthlyPlatformEventsUsageEntitlement_Re__c.value))/data.fields.TheLimitsApp__MonthlyPlatformEventsUsageEntitlement_Ma__c.value*100);
            this.PrivateConnectOutboundCalloutHourlyLimitMB_progress = Math.round(((data.fields.TheLimitsApp__PrivateConnectOutboundCalloutHourly_Max__c.value)-(data.fields.TheLimitsApp__PrivateConnectOutboundCalloutHourly_Rem__c.value))/data.fields.TheLimitsApp__PrivateConnectOutboundCalloutHourly_Max__c.value*100);
            this.HourlyLongTermIdMapping_progress = Math.round(((data.fields.TheLimitsApp__HourlyLongTermIdMapping_Max__c.value)-(data.fields.TheLimitsApp__HourlyLongTermIdMapping_Remaining__c.value))/data.fields.TheLimitsApp__HourlyLongTermIdMapping_Max__c.value*100);
            this.HourlyODataCallout_progress = Math.round(((data.fields.TheLimitsApp__HourlyODataCallout_Max__c.value)-(data.fields.TheLimitsApp__HourlyODataCallout_Remaining__c.value))/data.fields.TheLimitsApp__HourlyODataCallout_Max__c.value*100);
            this.HourlyShortTermIdMapping_progress = Math.round(((data.fields.TheLimitsApp__HourlyShortTermIdMapping_Max__c.value)-(data.fields.TheLimitsApp__HourlyShortTermIdMapping_Remaining__c.value))/data.fields.TheLimitsApp__HourlyShortTermIdMapping_Max__c.value*100);
            this.ActiveScratchOrgs_progress = Math.round(((data.fields.TheLimitsApp__ActiveScratchOrgs_Max__c.value)-(data.fields.TheLimitsApp__ActiveScratchOrgs_Remaining__c.value))/data.fields.TheLimitsApp__ActiveScratchOrgs_Max__c.value*100);
            this.DailyScratchOrgs_progress = Math.round(((data.fields.TheLimitsApp__DailyScratchOrgs_Max__c.value)-(data.fields.TheLimitsApp__DailyScratchOrgs_Remaining__c.value))/data.fields.TheLimitsApp__DailyScratchOrgs_Max__c.value*100);
            this.Package2VersionCreates_progress = Math.round(((data.fields.TheLimitsApp__Package2VersionCreates_Max__c.value)-(data.fields.TheLimitsApp__Package2VersionCreates_Remaining__c.value))/data.fields.TheLimitsApp__Package2VersionCreates_Max__c.value*100);
            this.Package2VersionCreatesWithoutValidation_progress = Math.round(((data.fields.TheLimitsApp__Package2VersionCreatesWOV_Max__c.value)-(data.fields.TheLimitsApp__Package2VersionCreatesWOV_Rem__c.value))/data.fields.TheLimitsApp__Package2VersionCreatesWOV_Max__c.value*100);
            this.DailyFunctionsApiCallLimit_progress = Math.round(((data.fields.TheLimitsApp__DailyFunctionsApiCallLimit_Max__c.value)-(data.fields.TheLimitsApp__DailyFunctionsApiCallLimit_Remaining__c.value))/data.fields.TheLimitsApp__DailyFunctionsApiCallLimit_Max__c.value*100);
            this.DataStorageMB_progress = Math.round(((data.fields.TheLimitsApp__DataStorageMB_Max__c.value)-(data.fields.TheLimitsApp__DataStorageMB_Remaining__c.value))/data.fields.TheLimitsApp__DataStorageMB_Max__c.value*100);
            this.FileStorageMB_progress = Math.round(((data.fields.TheLimitsApp__FileStorageMB_Max__c.value)-(data.fields.TheLimitsApp__FileStorageMB_Remaining__c.value))/data.fields.TheLimitsApp__FileStorageMB_Max__c.value*100);
            this.DailyDurableGenericStreamingApiEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyDurableGenericStreamingApiEvents_Ma__c.value)-(data.fields.TheLimitsApp__DailyDurableGenericStreamingApiEvents_Re__c.value))/data.fields.TheLimitsApp__DailyDurableGenericStreamingApiEvents_Ma__c.value*100);
            this.DailyDurableStreamingApiEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyDurableStreamingApiEvents_Max__c.value)-(data.fields.TheLimitsApp__DailyDurableStreamingApiEvents_Remaining__c.value))/data.fields.TheLimitsApp__DailyDurableStreamingApiEvents_Max__c.value*100);
            this.DurableStreamingApiConcurrentClients_progress = Math.round(((data.fields.TheLimitsApp__DurableStreamingApiConcurrentClients_Max__c.value)-(data.fields.TheLimitsApp__DurableStreamingApiConcurrentClients_Rem__c.value))/data.fields.TheLimitsApp__DurableStreamingApiConcurrentClients_Max__c.value*100);
            this.DailyGenericStreamingApiEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyGenericStreamingApiEvents_Max__c.value)-(data.fields.TheLimitsApp__DailyGenericStreamingApiEvents_Remaining__c.value))/data.fields.TheLimitsApp__DailyGenericStreamingApiEvents_Max__c.value*100);
            this.DailyStreamingApiEvents_progress = Math.round(((data.fields.TheLimitsApp__DailyStreamingApiEvents_Max__c.value)-(data.fields.TheLimitsApp__DailyStreamingApiEvents_Remaining__c.value))/data.fields.TheLimitsApp__DailyStreamingApiEvents_Max__c.value*100);
            this.DailyWorkflowEmails_progress = Math.round(((data.fields.TheLimitsApp__DailyWorkflowEmails_Max__c.value)-(data.fields.TheLimitsApp__DailyWorkflowEmails_Remaining__c.value))/data.fields.TheLimitsApp__DailyWorkflowEmails_Max__c.value*100);
            this.HourlyTimeBasedWorkflow_progress = Math.round(((data.fields.TheLimitsApp__HourlyTimeBasedWorkflow_Max__c.value)-(data.fields.TheLimitsApp__HourlyTimeBasedWorkflow_Remaining__c.value))/data.fields.TheLimitsApp__HourlyTimeBasedWorkflow_Max__c.value*100);
            
        } else if (error) {
            console.error(error);
        }
    }
    
    @track SingleEmail_progress;
    @track StreamingApiConcurrentClients_progress;
    @track AnalyticsExternalDataSizeMB_progress;
    @track ConcurrentAsyncGetReportInstances_progress;
    @track ConcurrentSyncReportRuns_progress;
    @track HourlyAsyncReportRuns_progress;
    @track HourlySyncReportRuns_progress;
    @track HourlyDashboardRefreshes_progress;
    @track HourlyDashboardResults_progress;
    @track HourlyDashboardStatuses_progress;
    @track MassEmail_progress;
    @track DailyApiRequests_progress;
    @track DailyAsyncApexExecutions_progress;
    @track DailyAsyncApexTests_progress;
    @track DailyBulkApiBatches_progress;
    @track DailyBulkV2QueryFileStorageMB_progress;
    @track DailyBulkV2QueryJobs_progress;
    @track HourlyPublishedPlatformEvents_progress;
    @track HourlyPublishedStandardVolumePlatformEvents_progress;
    @track DailyStandardVolumePlatformEvents_progress;
    @track DailyDeliveredPlatformEvents_progress;
    @track MonthlyPlatformEventsUsageEntitlement_progress;
    @track PrivateConnectOutboundCalloutHourlyLimitMB_progress;
    @track HourlyLongTermIdMapping_progress;
    @track HourlyODataCallout_progress;
    @track HourlyShortTermIdMapping_progress;
    @track ActiveScratchOrgs_progress;
    @track DailyScratchOrgs_progress;
    @track Package2VersionCreates_progress;
    @track Package2VersionCreatesWithoutValidation_progress;
    @track DailyFunctionsApiCallLimit_progress;
    @track DataStorageMB_progress;
    @track FileStorageMB_progress;
    @track DailyDurableGenericStreamingApiEvents_progress;
    @track DailyDurableStreamingApiEvents_progress;
    @track DurableStreamingApiConcurrentClients_progress;
    @track DailyGenericStreamingApiEvents_progress;
    @track DailyStreamingApiEvents_progress;
    @track DailyWorkflowEmails_progress;
    @track HourlyTimeBasedWorkflow_progress;

}

import Name from '@salesforce/schema/Limit_LimitsApp__c.Name'; 
import Latest__c from '@salesforce/schema/Limit_LimitsApp__c.Latest__c'; 

import SingleEmail_Max__c from '@salesforce/schema/Limit_LimitsApp__c.SingleEmail_Max__c'; 
import StreamingApiConcurrentClients_Max__c from '@salesforce/schema/Limit_LimitsApp__c.StreamingApiConcurrentClients_Max__c'; 
import AnalyticsExternalDataSizeMB_Max__c from '@salesforce/schema/Limit_LimitsApp__c.AnalyticsExternalDataSizeMB_Max__c'; 
import ConcurrentAsyncGetReportInstances_Max__c from '@salesforce/schema/Limit_LimitsApp__c.ConcurrentAsyncGetReportInstances_Max__c'; 
import ConcurrentSyncReportRuns_Max__c from '@salesforce/schema/Limit_LimitsApp__c.ConcurrentSyncReportRuns_Max__c'; 
import HourlyAsyncReportRuns_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyAsyncReportRuns_Max__c'; 
import HourlySyncReportRuns_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlySyncReportRuns_Max__c'; 
import HourlyDashboardRefreshes_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardRefreshes_Max__c'; 
import HourlyDashboardResults_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardResults_Max__c'; 
import HourlyDashboardStatuses_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardStatuses_Max__c'; 
import MassEmail_Max__c from '@salesforce/schema/Limit_LimitsApp__c.MassEmail_Max__c'; 
import DailyApiRequests_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyApiRequests_Max__c'; 
import DailyAsyncApexExecutions_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyAsyncApexExecutions_Max__c'; 
import DailyAsyncApexTests_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyAsyncApexTests_Max__c'; 
import DailyBulkApiBatches_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkApiBatches_Max__c'; 
import DailyBulkV2QueryFileStorageMB_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkV2QueryFileStorageMB_Max__c'; 
import DailyBulkV2QueryJobs_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkV2QueryJobs_Max__c'; 
import HourlyPublishedPlatformEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyPublishedPlatformEvents_Max__c'; 
import HourlyPSVPlatformEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyPSVPlatformEvents_Max__c'; 
import DailyStandardVolumePlatformEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyStandardVolumePlatformEvents_Max__c'; 
import DailyDeliveredPlatformEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDeliveredPlatformEvents_Max__c'; 
import MonthlyPlatformEventsUsageEntitlement_Ma__c from '@salesforce/schema/Limit_LimitsApp__c.MonthlyPlatformEventsUsageEntitlement_Ma__c'; 
import PrivateConnectOutboundCalloutHourly_Max__c from '@salesforce/schema/Limit_LimitsApp__c.PrivateConnectOutboundCalloutHourly_Max__c'; 
import HourlyLongTermIdMapping_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyLongTermIdMapping_Max__c'; 
import HourlyODataCallout_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyODataCallout_Max__c'; 
import HourlyShortTermIdMapping_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyShortTermIdMapping_Max__c'; 
import ActiveScratchOrgs_Max__c from '@salesforce/schema/Limit_LimitsApp__c.ActiveScratchOrgs_Max__c'; 
import DailyScratchOrgs_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyScratchOrgs_Max__c'; 
import Package2VersionCreates_Max__c from '@salesforce/schema/Limit_LimitsApp__c.Package2VersionCreates_Max__c'; 
import Package2VersionCreatesWOV_Max__c from '@salesforce/schema/Limit_LimitsApp__c.Package2VersionCreatesWOV_Max__c'; 
import DailyFunctionsApiCallLimit_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyFunctionsApiCallLimit_Max__c'; 
import DataStorageMB_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DataStorageMB_Max__c'; 
import FileStorageMB_Max__c from '@salesforce/schema/Limit_LimitsApp__c.FileStorageMB_Max__c'; 
import DailyDurableGenericStreamingApiEvents_Ma__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDurableGenericStreamingApiEvents_Ma__c'; 
import DailyDurableStreamingApiEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDurableStreamingApiEvents_Max__c'; 
import DurableStreamingApiConcurrentClients_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DurableStreamingApiConcurrentClients_Max__c'; 
import DailyGenericStreamingApiEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyGenericStreamingApiEvents_Max__c'; 
import DailyStreamingApiEvents_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyStreamingApiEvents_Max__c'; 
import DailyWorkflowEmails_Max__c from '@salesforce/schema/Limit_LimitsApp__c.DailyWorkflowEmails_Max__c'; 
import HourlyTimeBasedWorkflow_Max__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyTimeBasedWorkflow_Max__c'; 

import SingleEmail_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.SingleEmail_Remaining__c'; 
import StreamingApiConcurrentClients_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.StreamingApiConcurrentClients_Remaining__c'; 
import AnalyticsExternalDataSizeMB_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.AnalyticsExternalDataSizeMB_Remaining__c'; 
import ConcurrentAsyncGetReportInstances_Remain__c from '@salesforce/schema/Limit_LimitsApp__c.ConcurrentAsyncGetReportInstances_Remain__c'; 
import ConcurrentSyncReportRuns_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.ConcurrentSyncReportRuns_Remaining__c'; 
import HourlyAsyncReportRuns_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyAsyncReportRuns_Remaining__c'; 
import HourlySyncReportRuns_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlySyncReportRuns_Remaining__c'; 
import HourlyDashboardRefreshes_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardRefreshes_Remaining__c'; 
import HourlyDashboardResults_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardResults_Remaining__c'; 
import HourlyDashboardStatuses_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyDashboardStatuses_Remaining__c'; 
import MassEmail_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.MassEmail_Remaining__c'; 
import DailyApiRequests_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyApiRequests_Remaining__c'; 
import DailyAsyncApexExecutions_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyAsyncApexExecutions_Remaining__c'; 
import DailyAsyncApexTests_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyAsyncApexTests_Remaining__c'; 
import DailyBulkApiBatches_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkApiBatches_Remaining__c'; 
import DailyBulkV2QueryFileStorageMB_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkV2QueryFileStorageMB_Remaining__c'; 
import DailyBulkV2QueryJobs_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyBulkV2QueryJobs_Remaining__c'; 
import HourlyPublishedPlatformEvents_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyPublishedPlatformEvents_Remaining__c'; 
import HourlyPSVPlatformEvents_Rem__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyPSVPlatformEvents_Rem__c'; 
import DailyStandardVolumePlatformEvents_Remain__c from '@salesforce/schema/Limit_LimitsApp__c.DailyStandardVolumePlatformEvents_Remain__c'; 
import DailyDeliveredPlatformEvents_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDeliveredPlatformEvents_Remaining__c'; 
import MonthlyPlatformEventsUsageEntitlement_Re__c from '@salesforce/schema/Limit_LimitsApp__c.MonthlyPlatformEventsUsageEntitlement_Re__c'; 
import PrivateConnectOutboundCalloutHourly_Rem__c from '@salesforce/schema/Limit_LimitsApp__c.PrivateConnectOutboundCalloutHourly_Rem__c'; 
import HourlyLongTermIdMapping_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyLongTermIdMapping_Remaining__c'; 
import HourlyODataCallout_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyODataCallout_Remaining__c'; 
import HourlyShortTermIdMapping_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyShortTermIdMapping_Remaining__c'; 
import ActiveScratchOrgs_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.ActiveScratchOrgs_Remaining__c'; 
import DailyScratchOrgs_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyScratchOrgs_Remaining__c'; 
import Package2VersionCreates_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.Package2VersionCreates_Remaining__c'; 
import Package2VersionCreatesWOV_Rem__c from '@salesforce/schema/Limit_LimitsApp__c.Package2VersionCreatesWOV_Rem__c'; 
import DailyFunctionsApiCallLimit_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyFunctionsApiCallLimit_Remaining__c'; 
import DataStorageMB_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DataStorageMB_Remaining__c'; 
import FileStorageMB_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.FileStorageMB_Remaining__c'; 
import DailyDurableGenericStreamingApiEvents_Re__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDurableGenericStreamingApiEvents_Re__c'; 
import DailyDurableStreamingApiEvents_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyDurableStreamingApiEvents_Remaining__c'; 
import DurableStreamingApiConcurrentClients_Rem__c from '@salesforce/schema/Limit_LimitsApp__c.DurableStreamingApiConcurrentClients_Rem__c'; 
import DailyGenericStreamingApiEvents_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyGenericStreamingApiEvents_Remaining__c'; 
import DailyStreamingApiEvents_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyStreamingApiEvents_Remaining__c'; 
import DailyWorkflowEmails_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.DailyWorkflowEmails_Remaining__c'; 
import HourlyTimeBasedWorkflow_Remaining__c from '@salesforce/schema/Limit_LimitsApp__c.HourlyTimeBasedWorkflow_Remaining__c'; 
