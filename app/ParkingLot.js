var parkingLotObserver = require("../app/ParkingLotObserver")

const parkingLotMaximumCapacity = 4

class ParkingLot{

    constructor(){
        this.parkingLotCapacity = []
    }
    
    park=(vehicle)=>{
        if (vehicle == null || vehicle == undefined) {
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        if(this.parkingLotCapacity.length == parkingLotMaximumCapacity){
            parkingLotObserver.addVehicle();
            parkingLotObserver.getNotificationFull();        
            throw new Error("Parking Lot Is Full")
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
                delete this.parkingLotCapacity[car]
                parkingLotObserver.addVehicle();
                parkingLotObserver.getNotificationEmpty();
                return true;
            }
        }
        throw new Error("Vehicle Already Unparked")     
    }

}
module.exports =  ParkingLot;