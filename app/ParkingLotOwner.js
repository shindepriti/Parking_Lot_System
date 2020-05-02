let parkingFull ;
class ParkingLotOwner{
    
    constructor(){
        this.parkingFull= false
    }

    isFull(){
        return this.parkingFull = true;    
    }

    spaceAvailable(){
        this.parkingFull = false
        return "Parking Lot Space Available"
    }
    
}
module.exports = new ParkingLotOwner;