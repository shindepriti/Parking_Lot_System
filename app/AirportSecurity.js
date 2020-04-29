let parkingFull;
class AirportSecurity{
    
    constructor(){
        this.parkingFull=false
    }
    
    isFull(){
       return this.parkingFull = true;
    }
}
module.exports = new AirportSecurity