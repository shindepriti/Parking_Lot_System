var parkingLotObserver = require("../app/ParkingLotObserver")

const parkingLotMaximumCapacity = 9

class ParkingLot{

    constructor(){
        this.parkingLots = [];
        this.initSlots(3,[3,3,3]);
        this.counter = 0;
        this.prevParkedLot = -1;
    }
    
    park(vehicle,driver){
        let lotNum;
        if (vehicle == null ||  typeof vehicle != "object" ) {
            throw new Error("Vehicle Is Not Null Or Vehicle Must be Object")
        }
        if(this.parkingLotFull()){
            throw new Error("Parking Lot Is Full");
        }
        if(driver == "Handicap"){
            lotNum = this.findParkigLotForHandicap();
        }else(driver == "Normal")
            lotNum = this.findParkingLotNum();
        for(let lot=0;lot<this.parkingLots[lotNum].length;lot++){
            if(this.parkingLots[lotNum][lot] == undefined)
                this.parkingLots[lotNum][lot] = vehicle;
        }
        this.prevParkedLot = lotNum;
        this.counter++;
        return true;
    }

    unPark(vehicle){
        if(vehicle == null || vehicle == undefined){
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        for(let lot = 0;lot < this.parkingLots.length;lot++){
            for(let slot = 0;slot < this.parkingLots.length;slot++){
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

    parkingLotFull(){
        if(this.counter == parkingLotMaximumCapacity){
            parkingLotObserver.addObject();
            parkingLotObserver.getNotificationFull();        
            return true
        }
    }

    getEmptySlots(){
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

    findMyCar(vehicle){
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

    findParkingLotNum(){
        let lotNumber = -1;
        if(this.prevParkedLot+1 == this.parkingLots.length)
            lotNumber = 0;
        else
            lotNumber = this.prevParkedLot+1;
            return lotNumber;
        }

    initSlots(slotsCnt,lotCapArr){
        this.parkingLots=[];
        this.prevParkedLot= -1;
        for(let i=0;i<slotsCnt;i++)
            this.parkingLots[i] = new Array(lotCapArr[i]);
    }

    findParkigLotForHandicap(){
        for(let lot=0;lot<this.parkingLots.length;lot++){
            for(let slot=0;slot<this.parkingLots[lot].length;slot++){
                if(this.parkingLots[lot][slot] == null){
                    return slot;
                }
            }
        }
    }
}
module.exports =  ParkingLot;