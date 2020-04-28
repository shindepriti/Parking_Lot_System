var parkingLotOwner = require("../app/ParkingLotOwner")

const parkingLotMaximumCapacity = 4
var parkingLotCapacity = 0;
class ParkingLot{

    park=(vehicle)=>{
        if(this.parkingLotCapacity == parkingLotMaximumCapacity){
            parkingLotOwner.isFull()
            throw new Error("Parking Lot Is Full")
        }
        this.parkVehicle = vehicle
        parkingLotCapacity++;
        return true;
    }

    unPark=(vehicle)=>{
        if(this.parkVehicle == vehicle){
            return true;
        } 
        throw new Error("Vehicle Not Present")     
    }
}
module.exports = ParkingLot;