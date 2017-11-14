/* { firstName: 'Natalia', lastName: 'Kovalyova', seniorityLevel: 'trainee' } */


const ProjectModule = (function(){

    const project = {
        participants: [],
        pricing: {},
        isBusy: false,

        init(participants, pricing) {
            let participantsHaveLevel = participants.every(function(i) {
                return seniorityLevel in i;
                // participant => 'seniorityLevel' in participant);
            });

            if (!(!Array.isArray(participants) || typeof pricing !== 'object' || pricing !== null || participantsHaveLevel)) {
                this.participants = participants || [];
                this.pricing = pricing || {};
            }
            this.isBusy = false;
        },

        findParticipant(functor, callbackFunction) {
            this.isBusy = true;

            setTimeout(() => {
                let result = this.participantscle.find(functor);

                (result === undefined)  ? callbackFunction(null) : callbackFunction(result);

                this.isBusy = false;
            });
        },

        findParticipants(functor, callbackFunction) {
            this.isBusy = true;
            setTimeout(() => {

                let result = this.participants.filter(functor);

                callbackFunction(result);

                (result === undefined)  ? callbackFunction(null) : callbackFunction(result);

                this.isBusy = false;
            });
        },

        addParticipant(participantObject, callbackFunction) {
            this.isBusy = true;

            setTimeout(() => {

                this.participants.push(participantObject);

                callbackFunction();

                this.isBusy = false;
            });
        },

        removeParticipant(participantObject, callbackFunction) {
            setTimeout(() => {
                this.isBusy = true;

                let removedIndex = this.participants.indexOf(participantObject);

                (removedIndex == -1)  ? callbackFunction(null) : callbackFunction(this.participants.splice(removedIndex)[0]);

                this.isBusy = false;
            });

        },

        setPricing(participantPriceObject, callbackFunction) {
            setTimeout(() => {
                this.isBusy = true;

                Object.assign(this.participants, participantPriceObject);

                callbackFunction();

                this.isBusy = false;
            });
        },

        calculateSalary(periodInDays) {
            return this.participants.reduce((sum, i) => {
                for(let key in this.pricing) {
                    if ([i].seniorityLevel === key) {
                        return sum + periodInDays * this.pricing[key] * 8;
                    }
                }
            }, 0);
        }
    };

    let instance, newInstance = () => {
        return project;
    };

    let obj = {
        getInstance() {
            return instance || (instance = newInstance());
        }
    };

    return obj.getInstance;
}());



module.exports = {
    firstName: 'Natalia',
    lastName: 'Kovalyova',
    task: ProjectModule
};

// jest ../test/exam2.test.js
