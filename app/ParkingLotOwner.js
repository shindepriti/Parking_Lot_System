let parkingFull ;
class ParkingLotOwner{

    isFull(){
        parkingFull = true
            console.log("Parking Lot Owner :- Parking Lot Full");
            return parkingFull;
        }
    
}
module.exports = new ParkingLotOwner;