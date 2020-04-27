class ParkingLot{

    park=(vehicle)=>{
        this.parkVehicle = vehicle
        return true;
    }

    unPark=(vehicle)=>{
        if(this.parkVehicle == vehicle){
            return true;
        }
        throw new error("Vehicle Not Present");
            
    }
}
module.exports = ParkingLot;