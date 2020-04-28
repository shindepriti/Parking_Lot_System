class ParkingLot{
    constructor(){
        this.parkingLotCapacity = []
    }

    park=(vehicle)=>{
        this.parkVehicle = vehicle
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