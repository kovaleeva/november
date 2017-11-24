
const participant = {
    firstName: '',
    lastName: '',
    seniorityLevel: ''

}

const project = {
    participants: [],
    pricing: {}, //pricing{ 'junior': 10, etc}
    isBusy: false , 

    getInstance() { return this },    

    init(participants, pricing) {  
        if(participants==undefined||pricing==undefined){
            return;
        }
        this.participants=participants;
        this.pricing=pricing;    

    },

    findParticipant(functor, callbackFunction) {
        if(this.participants.find(functor) === undefined){
            return callbackFunction(null);
        } 

        setTimeout(this.isBusy=false);
        this.isBusy=true;        
        callbackFunction(this.participants.find(functor));
        
    },

    findParticipants(functor, callbackFunction) {
          var tempArr=[];       
        for(let i=0;i<this.participants.length;i++){
            if(functor(this.participants[i])){
                tempArr.push(this.participants[i]);
            }
        }
        callbackFunction(tempArr);
    },

    addParticipant(participantObject, callbackFunction) {
        var check = false;
        if(participantObject.seniorityLevel){
            check=true;
            this.participants.push(participantObject);            
        }
        if(check==true){
            callbackFunction(undefined);            
        }
        else{
            callbackFunction(!undefined);            
        }
     },

    removeParticipant(participantObject, callbackFunction) {
        var check = false;
        for(var x of project.participants){
            if(x==participantObject){
                check=true;
            }
        }
        if(check==true){
            this.participants.pop(participantObject);
            callbackFunction(participantObject);
        }
        else{
            callbackFunction(null);
        }
                
     },

    setPricing(participantPriceObject, callbackFunction) {
        this.pricing=participantPriceObject;
        callbackFunction(this.pricing);
    },

    calculateSalary(periodInDays) {
        var salary= 0;
        var check = 0;
        for(var key of project.participants){
            for(var i in key){
                for(var iter in project.pricing){
                    if(key[i]==iter){
                        salary+=8*project.pricing[iter];
                        check++;
                    }
                }
        
            }
         
        }
        if(check<project.participants.length){
            throw Error;
        }
        salary*=periodInDays;
        return salary;
    }
};

module.exports = {
    firstName: 'Vadim',
    lastName: 'Pismenitskiy',
    task: project
};