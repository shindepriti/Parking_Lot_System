var parkingLotObserver = require("../app/ParkingLotObserver")

const parkingLotMaximumCapacity = 9

class ParkingLot{

    constructor(){
        this.parkingLots = [];
        this.initSlots(3,[3,3,6]);
        this.counter = 0;
        this.prevParkedLot = -1;
    }
    
    park=(vehicle)=>{
        let lotNum;
        if (vehicle == null ||  typeof vehicle != "object" ) {
            throw new Error("Vehicle Is Not Null Or Vehicle Must be Object")
        }
        if(this.parkingLotFull()){
            throw new Error("Parking Lot Is Full");
        }
        if(vehicle.driverType == "Handicap"){
            lotNum = this.findParkigLotForHandicap();
            
        }else if(vehicle.vehicleType == "Large"){
            lotNum = this.findParkingLotHavingMaxSpace()
            
        }else if(vehicle.driverType == "Normal" || vehicle.vehicleType == "Small"){
            lotNum = this.findParkingLotNum();
        }
        for(let lot=0;lot<this.parkingLots[lotNum].length;lot++){
            if(this.parkingLots[lotNum][lot] == null){
                this.parkingLots[lotNum][lot] = vehicle;
                break;
            }
        }
        this.prevParkedLot = lotNum;
        this.counter++;
        return lotNum;
    }

    
    unPark=(vehicle)=>{
        if(vehicle == null || vehicle == undefined){
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        for(let lot = 0;lot < this.parkingLots.length;lot++){
            for(let slot = 0;slot < this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == vehicle){
                    this.parkingLots[lot][slot] = null
                    parkingLotObserver.addObject();
                    parkingLotObserver.getNotificationEmpty();
                    this.prevParkedLot= lot-1;
                    this.counter--;
                    return true;
                }
            }
        }
        throw new Error("Vehicle Already Unparked")     
    }

    parkingLotFull=()=>{
        if(this.counter == parkingLotMaximumCapacity){
            parkingLotObserver.addObject();
            parkingLotObserver.getNotificationFull();        
            return true
        }
    }

    getEmptySlots=()=>{
        for(let lot=0;lot<this.parkingLots.length;lot++){
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == null){
                    let emptyslots = {slot:slot,lot:lot}
                    return emptyslots; 
                              
                }
            }
        }
        throw new Error("Parking Slot Is Not Empty")
    }

    findMyCar=(vehicle)=>{
        for(let lot=0;lot<this.parkingLots.length;lot++){
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == vehicle){
                    let carSlot = {slot:slot,lot:lot}
                    return carSlot;           
                }
            }
        }
       return false;
    }

    findParkingLotNum=()=>{
        let lotNumber = -1;
        if(this.prevParkedLot+1 == this.parkingLots.length)
            lotNumber = 0;
        else
            lotNumber = this.prevParkedLot+1;
            return lotNumber;
        }

    initSlots=(slotsCnt,lotCapArr)=>{
        this.parkingLots=[];
        this.prevParkedLot= -1;
        for(let i=0;i<slotsCnt;i++)
            this.parkingLots[i] = new Array(lotCapArr[i]);
    }

    findParkigLotForHandicap=()=>{
        for(let lot=0;lot<this.parkingLots.length;lot++){
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == null){
                    return lot;
                }
            }
        }
    }

    findParkingLotHavingMaxSpace=()=>{
        let prevLotNum = -1;
        let prevLotEmptySlots = -1;
        for(let lot=0;lot<this.parkingLots.length;lot++){
            let emptySlots = -1;
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == null){
                    emptySlots++;
                }
            }
            if(prevLotNum == -1){
                prevLotNum = lot;
                prevLotEmptySlots = emptySlots;
            }
            else if(prevLotEmptySlots < emptySlots){
                prevLotNum = lot;
                prevLotEmptySlots = emptySlots;
            }
        }
        return prevLotNum;
    }

    findVehicleByGivenFilter=(filter)=>{
        let vehicleArr = []
        let filterKeys = Object.keys(filter);
        for(let lot=0;lot<this.parkingLots.length;lot++){
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] != null){
                     let isMatching = true;
                     for(let i = 0; i<filterKeys.length;i++){
                        if((this.parkingLots[lot][slot])[filterKeys[i]] != filter[filterKeys[i]]){
                            isMatching = false;
                            break;
                         }
                     }
                    if(isMatching){
                        let carSlot = {lot:lot,slot:slot}
                        vehicleArr.push(carSlot)
                    }
                }
            }
        }
        return vehicleArr;
    }

    findVehicleParkedInLastGivenMinutes=(timeInMinute)=>{
        this.vehicleArr = []
        let currentTimeInMinute = new Date().getMinutes()
        if(timeInMinute != undefined ){
            for(let lot=0;lot<this.parkingLots.length;lot++){
                for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                    if(this.parkingLots[lot][slot] != null){
                        if(currentTimeInMinute - this.parkingLots[lot][slot].parkedTime <= timeInMinute){
                            let carSlot = {lot:lot,slot:slot}
                            this.vehicleArr.push(carSlot)
                        }                    
                    }
                }
            }
        }
        return this.vehicleArr;
    }  
    
}
module.exports = ParkingLot;