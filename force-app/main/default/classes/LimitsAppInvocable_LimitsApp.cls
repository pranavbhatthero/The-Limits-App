public class LimitsAppInvocable_LimitsApp {

        public static Boolean limitRecordCreatedInLastHour(){
        
        List<Limit_LimitsApp__c> llas = [SELECT CreatedDate 
                                         FROM Limit_LimitsApp__c
                                         WHERE CreatedDate = :Datetime.now().addMinutes(-1)];
        Boolean createdInLastHour;
        if(llas.size() > 0){
            createdInLastHour = true;
        } else {
            createdInLastHour = false;
        }
        return createdInLastHour;
    }
    
    
    
    
    
    
}