import React from "react";
import PSI from "./PSI"
import LinearProgress from '@mui/material/LinearProgress';

class Test extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    
   
    // ComponentDidMount is used to
    // execute the code 
//     componentDidMount() {
//         fetch(
// "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com?key=scratched for interview")
//             .then((res) => res.json())
//             .then((json) => {
//                 // console.log(json)
//                 this.setState({
//                     items: json,
//                     DataisLoaded: true
//                 });
//             })
//     }
    render() {
        // const { DataisLoaded, items } = this.state;
        // if (!DataisLoaded) return <div>
        //     <h1><LinearProgress color="success" /> </h1> </div> ;
   
        return (
        <div className = "App">
            <h1> Testing API </h1> 
             {/* {
                items.map((item) => ( 
                <ol key = { item.id } >
                    User_Name: { item.username }, 
                    Full_Name: { item.name }, 
                    User_Email: { item.email } 
                    </ol>
                ))
            } */}
        </div>
    );
}
}
   
export default Test;