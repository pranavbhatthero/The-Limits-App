public class LimitsApp {
    
    @AuraEnabled
    public static void scheduleAlert(){ 
        String everyThirtyMinsCron = '0 0 * * * ?';
        String jobName = 'Limits_App_Hourly_Job';
        LimitsAppScheduler job = new LimitsAppScheduler();
        if(!Test.isRunningTest()){
            System.schedule(jobName, everyThirtyMinsCron, job);
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static String getLimitsRecordId() {
        String limitsRecordId;
        try {
            limitsRecordId = [SELECT Id FROM Limit_LimitsApp__c WHERE Latest__c = true].Id;
        } catch(QueryException e) {
            limitsRecordId = null; // set to null if there is no matching record
            // Log the error message for debugging purposes
            System.debug('Error querying LimitsApp record: ' + e.getMessage());
        }
        return limitsRecordId;
    }

    @AuraEnabled
    public static String getLimitsRecordIdOnClick() {
        String limitsRecordId;
        try {
            limitsRecordId = [SELECT Id FROM Limit_LimitsApp__c WHERE Latest__c = true].Id;
        } catch(QueryException e) {
            limitsRecordId = null; // set to null if there is no matching record
            // Log the error message for debugging purposes
            System.debug('Error querying LimitsApp record: ' + e.getMessage());
        }
        return limitsRecordId;
    }

    
    
    @future(callout=true) 
    public static void getLimits(){       
        List<String> limitsList = new List<String>{
            'SingleEmail',
                'StreamingApiConcurrentClients',
                'AnalyticsExternalDataSizeMB',
                'ConcurrentAsyncGetReportInstances',
                'ConcurrentSyncReportRuns',
                'HourlyAsyncReportRuns',
                'HourlySyncReportRuns',
                'HourlyDashboardRefreshes',
                'HourlyDashboardResults',
                'HourlyDashboardStatuses',
                'MassEmail',
                'DailyApiRequests',
                'DailyAsyncApexExecutions',
                'DailyAsyncApexTests',
                'DailyBulkApiBatches',
                'DailyBulkV2QueryFileStorageMB',
                'DailyBulkV2QueryJobs',
                'HourlyPublishedPlatformEvents',
                'HourlyPublishedStandardVolumePlatformEvents',
                'DailyStandardVolumePlatformEvents',
                'DailyDeliveredPlatformEvents',
                //'MonthlyPlatformEvents',  
                'MonthlyPlatformEventsUsageEntitlement',
                'PrivateConnectOutboundCalloutHourlyLimitMB',
                'HourlyLongTermIdMapping',
                'HourlyODataCallout',
                'HourlyShortTermIdMapping',
                'ActiveScratchOrgs',
                'DailyScratchOrgs',
                'Package2VersionCreates',
                'Package2VersionCreatesWithoutValidation',
                'DailyFunctionsApiCallLimit',
                'DataStorageMB',
                'FileStorageMB',
                'DailyDurableGenericStreamingApiEvents',
                'DailyDurableStreamingApiEvents',
                'DurableStreamingApiConcurrentClients',
                'DailyGenericStreamingApiEvents',
                'DailyStreamingApiEvents',
                'DailyWorkflowEmails',
                'HourlyTimeBasedWorkflow'};
                    
                    
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        HttpResponse httpResponse = new HttpResponse();
        httpReq.setMethod('GET');
        httpReq.setHeader('Content-Type', 'application/json');
        String actionsRestURL = 'callout:LimitsAppAPI_NC/services/data/v56.0/limits';
        
        httpReq.setEndpoint(actionsRestURL);
        httpResponse = http.send(httpReq);
        httpResponse.getStatusCode();            
        
        Map<String, Object> values = (Map<String, Object>)JSON.deserializeUntyped(httpResponse.getBody());                    
        System.debug('*****values --- '+ httpResponse.getBody());
        Limit_LimitsApp__c lla = new Limit_LimitsApp__c(Latest__c = True);
        
        for(String currentLimit : limitsList){
            Map<String, Object> dailyLimits = (Map<String, Object>)values.get(currentLimit);
            System.debug('*****currentLimit --- '+ currentLimit);
            
            String maxField = currentLimit + '_Max__c';
            if(maxField.length() > 40 ){
                maxField = maxField.substring(0, 40);
                maxField += '__c';
            }         
            String remainingField = currentLimit + '_Remaining__c';
            if(remainingField.length() > 40 ){
                remainingField = remainingField.substring(0, 40);
                remainingField += '__c';
            } 
            //StreamingApiConcurrentClients_Remaining___c
            //DailyBulkV2QueryFileStorageMB_Remaining___c 
            //HourlyPublishedPlatformEvents_Remaining___c 
            if(currentLimit == 'HourlyPublishedPlatformEvents'){
                maxField = 'HourlyPublishedPlatformEvents_Max__c'; 
                remainingField = 'HourlyPublishedPlatformEvents_Remaining__c'; 
            }if(currentLimit == 'DailyBulkV2QueryFileStorageMB'){
                maxField = 'DailyBulkV2QueryFileStorageMB_Max__c'; 
                remainingField = 'DailyBulkV2QueryFileStorageMB_Remaining__c'; 
            }if(currentLimit == 'StreamingApiConcurrentClients'){
                maxField = 'StreamingApiConcurrentClients_Max__c'; 
                remainingField = 'StreamingApiConcurrentClients_Remaining__c'; 
            }
            // other use cases of remnaming the fields 
            if(currentLimit == 'HourlyPublishedStandardVolumePlatformEvents'){
                maxField = 'HourlyPSVPlatformEvents_Max__c'; 
                remainingField = 'HourlyPSVPlatformEvents_Rem__c'; 
            }
            if(currentLimit == 'PrivateConnectOutboundCalloutHourlyLimitMB'){
                maxField = 'PrivateConnectOutboundCalloutHourly_Max__c';
                remainingField = 'PrivateConnectOutboundCalloutHourly_Rem__c';
            }
            if(currentLimit == 'Package2VersionCreatesWithoutValidation'){
                maxField = 'Package2VersionCreatesWOV_Max__c';
                remainingField = 'Package2VersionCreatesWOV_Rem__c';
            }
            if(currentLimit == 'DailyDeliveredPlatformEvents'){
                maxField = 'DailyDeliveredPlatformEvents_Max__c';
                remainingField = 'DailyDeliveredPlatformEvents_Remaining__c';
            }
            try {
                System.debug('*****dailyLimits.Max --- '+ dailyLimits.get('Max'));
                String max = (String)lla.put(maxField, (Integer)dailyLimits.get('Max'));
            } catch (Exception e){
                System.debug('***** ERROR Max ---  '+ e);
            }
            try {
                System.debug('*****dailyLimits.Remaining --- '+ dailyLimits.get('Remaining'));
                String remaining = (String)lla.put(remainingField,(Integer)dailyLimits.get('Remaining'));
            } catch (Exception e){
                System.debug('***** ERROR Remaining ---  '+ e);
            }
        }
        insert lla;           
        // Set all other limit values to latest = false
        try{
            for(List<Limit_LimitsApp__c> oldLimits : [SELECT Latest__c 
                                                      FROM Limit_LimitsApp__c
                                                      WHERE Id !=: lla.Id])
            {
                for(Limit_LimitsApp__c oldLimit : oldLimits){
                    oldLimit.Latest__c = false;
                }
                update oldLimits;
            }
        } catch(Exception e) {
            System.debug('***** ERROR Updating Existing Limits to Latest__c = False ---' + e);
        }
    }  
    
    
    public static Boolean limitCreatedInLastMinute(){
        
        List<Limit_LimitsApp__c> llas = [SELECT Minutes_Since_Created__c 
                                         FROM Limit_LimitsApp__c
                                         WHERE Latest__c = True
                                         AND Minutes_Since_Created__c  <= 1];
        Boolean createdInLastMin;
        if(llas.size() > 0){
            createdInLastMin = true;
        } else {
            createdInLastMin = false;
        }
        return createdInLastMin;
    }

    @InvocableMethod(label='Get Limits')
    public static List<Results> getLimitsAdHoc(){ 
        
        List<Results> results = new List<Results>();
        LimitsApp.Results lar = new LimitsApp.Results();
        Boolean limitCreated = limitCreatedInLastMinute();
        results.add(lar);
        results[0].limitCreatedInLastMinute = limitCreated;
        
        if(limitCreated == false){            
            List<String> limitsList = new List<String>{
                'SingleEmail',
                    'StreamingApiConcurrentClients',
                    'AnalyticsExternalDataSizeMB',
                    'ConcurrentAsyncGetReportInstances',
                    'ConcurrentSyncReportRuns',
                    'HourlyAsyncReportRuns',
                    'HourlySyncReportRuns',
                    'HourlyDashboardRefreshes',
                    'HourlyDashboardResults',
                    'HourlyDashboardStatuses',
                    'MassEmail',
                    'DailyApiRequests',
                    'DailyAsyncApexExecutions',
                    'DailyAsyncApexTests',
                    'DailyBulkApiBatches',
                    'DailyBulkV2QueryFileStorageMB',
                    'DailyBulkV2QueryJobs',
                    'HourlyPublishedPlatformEvents',
                    'HourlyPublishedStandardVolumePlatformEvents',
                    'DailyStandardVolumePlatformEvents',
                    'DailyDeliveredPlatformEvents',
                    //'MonthlyPlatformEvents',  
                    'MonthlyPlatformEventsUsageEntitlement',
                    'PrivateConnectOutboundCalloutHourlyLimitMB',
                    'HourlyLongTermIdMapping',
                    'HourlyODataCallout',
                    'HourlyShortTermIdMapping',
                    'ActiveScratchOrgs',
                    'DailyScratchOrgs',
                    'Package2VersionCreates',
                    'Package2VersionCreatesWithoutValidation',
                    'DailyFunctionsApiCallLimit',
                    'DataStorageMB',
                    'FileStorageMB',
                    'DailyDurableGenericStreamingApiEvents',
                    'DailyDurableStreamingApiEvents',
                    'DurableStreamingApiConcurrentClients',
                    'DailyGenericStreamingApiEvents',
                    'DailyStreamingApiEvents',
                    'DailyWorkflowEmails',
                    'HourlyTimeBasedWorkflow'};                     
                        
            Http http = new Http();
            HttpRequest httpReq = new HttpRequest();
            HttpResponse httpResponse = new HttpResponse(); 
            
            httpReq.setMethod('GET');
            
            httpReq.setHeader('Content-Type', 'application/json');
            String actionsRestURL = 'callout:LimitsAppAPI_NC/services/data/v56.0/limits';
            
            httpReq.setEndpoint(actionsRestURL);
            httpResponse = http.send(httpReq);
            httpResponse.getStatusCode();            
            
            Map<String, Object> values = (Map<String, Object>)JSON.deserializeUntyped(httpResponse.getBody());                    
            System.debug('*****values --- '+ httpResponse.getBody());
            Limit_LimitsApp__c lla = new Limit_LimitsApp__c(Latest__c = True);
            
            for(String currentLimit : limitsList){
                Map<String, Object> dailyLimits = (Map<String, Object>)values.get(currentLimit);
                System.debug('*****currentLimit --- '+ currentLimit);
                
                String maxField = currentLimit + '_Max__c';
                if(maxField.length() > 40 ){
                    maxField = maxField.substring(0, 40);
                    maxField += '__c';
                }         
                String remainingField = currentLimit + '_Remaining__c';
                if(remainingField.length() > 40 ){
                    remainingField = remainingField.substring(0, 40);
                    remainingField += '__c';
                } 
                //StreamingApiConcurrentClients_Remaining___c
                //DailyBulkV2QueryFileStorageMB_Remaining___c 
                //HourlyPublishedPlatformEvents_Remaining___c 
                if(currentLimit == 'HourlyPublishedPlatformEvents'){
                    maxField = 'HourlyPublishedPlatformEvents_Max__c'; 
                    remainingField = 'HourlyPublishedPlatformEvents_Remaining__c'; 
                }if(currentLimit == 'DailyBulkV2QueryFileStorageMB'){
                    maxField = 'DailyBulkV2QueryFileStorageMB_Max__c'; 
                    remainingField = 'DailyBulkV2QueryFileStorageMB_Remaining__c'; 
                }if(currentLimit == 'StreamingApiConcurrentClients'){
                    maxField = 'StreamingApiConcurrentClients_Max__c'; 
                    remainingField = 'StreamingApiConcurrentClients_Remaining__c'; 
                }
                // other use cases of remnaming the fields 
                if(currentLimit == 'HourlyPublishedStandardVolumePlatformEvents'){
                    maxField = 'HourlyPSVPlatformEvents_Max__c'; 
                    remainingField = 'HourlyPSVPlatformEvents_Rem__c'; 
                }
                if(currentLimit == 'PrivateConnectOutboundCalloutHourlyLimitMB'){
                    maxField = 'PrivateConnectOutboundCalloutHourly_Max__c';
                    remainingField = 'PrivateConnectOutboundCalloutHourly_Rem__c';
                }
                if(currentLimit == 'Package2VersionCreatesWithoutValidation'){
                    maxField = 'Package2VersionCreatesWOV_Max__c';
                    remainingField = 'Package2VersionCreatesWOV_Rem__c';
                }
                if(currentLimit == 'DailyDeliveredPlatformEvents'){
                    maxField = 'DailyDeliveredPlatformEvents_Max__c';
                    remainingField = 'DailyDeliveredPlatformEvents_Remaining__c';
                }
                try {
                    System.debug('*****dailyLimits.Max --- '+ dailyLimits.get('Max'));
                    String max = (String)lla.put(maxField, (Integer)dailyLimits.get('Max'));
                } catch (Exception e){
                    System.debug('***** ERROR Max ---  '+ e);
                }
                try {
                    System.debug('*****dailyLimits.Remaining --- '+ dailyLimits.get('Remaining'));
                    String remaining = (String)lla.put(remainingField,(Integer)dailyLimits.get('Remaining'));
                } catch (Exception e){
                    System.debug('***** ERROR Remaining ---  '+ e);
                }
            }
            insert lla;           
            // Set all other limit values to latest = false
            try{
                for(List<Limit_LimitsApp__c> oldLimits : [SELECT Latest__c 
                                                          FROM Limit_LimitsApp__c
                                                          WHERE Id !=: lla.Id])
                {
                    for(Limit_LimitsApp__c oldLimit : oldLimits){
                        oldLimit.Latest__c = false;
                    }
                    update oldLimits;
                }
            } catch(Exception e) {
                System.debug('***** ERROR Updating Existing Limits to Latest__c = False ---' + e);
            }
        }
        return results;
    }  
    
    public class Results{
        
        @invocableVariable(label='Limit Created in Last Minute?' required=true)
        public Boolean limitCreatedInLastMinute;     
    }    
}