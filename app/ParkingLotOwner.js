let parkingFull ;
class ParkingLotOwner{

    isFull(){
        parkingFull = true
            console.log("Parking Lot Owner :- Parking Lot Full");
            return parkingFull;
        }

    spaceAvailable(){
        parkingFull = false
            console.log("Parking Lot Owner :- Parking Lot Available");
            return parkingFull;
        
        }
    
}
module.exports = new ParkingLotOwner;