class ParkingLot{

    park=(vehicle)=>{
        this.parkVehicle = vehicle
        return true;
    }

    unPark=(vehicle)=>{
        if(this.parkVehicle == vehicle){
            return true;
        }
        return false;
            
    
        
    }
}
module.exports = ParkingLot;