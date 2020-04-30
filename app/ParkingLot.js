var parkingLotObserver = require("../app/ParkingLotObserver")

const parkingLotMaximumCapacity = 2

class ParkingLot{

    constructor(){
        this.parkingLotCapacity = []
    }
    
    park=(vehicle)=>{
        if (vehicle == null) {
            throw new Error("Vehicle Is Not Null")
        }
        if(this.parkingLotFull()){
            return false;
        }
        for(let car = 0; car < this.parkingLotCapacity.length;car++){
            if(this.parkingLotCapacity[car] == undefined){
                this.parkingLotCapacity.fill(vehicle,car,car+1)
                return true;
            }
        }
        this.parkingLotCapacity.push(vehicle);
        return true
    }

    unPark=(vehicle)=>{
        if(vehicle == null || vehicle == undefined){
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        for(let car = 0;car < this.parkingLotCapacity.length;car++){
            if(this.parkingLotCapacity[car] == vehicle){
                this.parkingLotCapacity.splice(car,1,null)
                parkingLotObserver.addObject();
                parkingLotObserver.getNotificationEmpty();
                return true;
            }
        }
        throw new Error("Vehicle Already Unparked")     
    }

    parkingLotFull=()=>{
        if(this.parkingLotCapacity.length == parkingLotMaximumCapacity){
            parkingLotObserver.addObject();
            parkingLotObserver.getNotificationFull();        
            throw new Error("Parking Lot Is Full")
        }
    }

    getEmptySlots=()=>{
        for(let slot=0;slot<this.parkingLotCapacity.length;slot++){
            if(this.parkingLotCapacity[slot] == null )
                return slot;           
        };
        throw new Error("Parking Slot Is Not Empty")
    }

    findMyCar=(vehicle)=>{
        for(let slot=0;slot<this.parkingLotCapacity.length;slot++){
           if(this.parkingLotCapacity[slot] == vehicle)
                return slot;
           
       }; 
       return false;

    }

}
module.exports =  ParkingLot;