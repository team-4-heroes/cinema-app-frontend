import { getSeats } from "../../fetch-facade.js"
 //Get endpoint w. seats
    //Stream through list of seats
    //For each rowLetter = new row 
    //For each seat = new button 
        //If seat.reservation != null
            //checkbox grayed out
        //seat.reservation == null
            //checkbox enabled
    //Onclick = add seat id to request body

    //Button reserve = send request
        //Confirmation msg if request succesful (seats unoccupied)

const seatcheckbox = ""
export function showSeats() {
    console.log("Called getSeats")
    getSeats()
    .then(res => res.json())
        .then(reservedSeat => 
            {console.log(reservedSeat)

            for (var i = 1; i < 10; i++) {
                    seatcheckbox = data.map(reservedSeat =>
                        {if (reservedSeat.reservation == null) {
                            "<input type = 'checkbox'>"
                        }
                        if (i / 10 == 0) {
                            "\n"
                        }
                        else {
                            "<td>"
                                "<input type = 'checkbox' id={reservedSeat.id} disabled>"
                            
                            "</td>"
                        }    
                    }).join("\n")
                        
                }
            }
        )
        .catch(err => {
            console.log(err)
          })
          .finally(e => console.log("Done with showSeats"))
        document.getElementById("seat-table").innerHTML = seatcheckbox;
    }


        
    

