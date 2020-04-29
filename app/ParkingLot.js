var parkingLotOwner = require("../app/ParkingLotOwner")
var airportSecurity = require("../app/AirportSecurity")
const parkingLotMaximumCapacity = 4

class ParkingLot{
    constructor(){
        this.parkingLotCapacity = []
    }
    
    park=(vehicle)=>{
        if(this.parkingLotCapacity.length == parkingLotMaximumCapacity){
            parkingLotOwner.isFull();
            airportSecurity.isFull();
            throw new Error("Parking Lot Is Full")
        }
        this.parkingLotCapacity.push(vehicle)
        return true;
    }

    unPark=(vehicle)=>{

        for(let car = 0;car < this.parkingLotCapacity.length;car++){
            if(this.parkingLotCapacity[car] == vehicle){
                delete this.parkingLotCapacity[car]
                return true;
            }
        }
        throw new Error("Vehicle Already Unparked")     
    }
}
module.exports =  ParkingLot;