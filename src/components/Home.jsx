
import axios from 'axios';
import { useState, useEffect } from 'react'
import getAllVaccines from '../data/vaccinedata'

function Home() {
    const [vaccines, setVaccines] = useState([]);
    let data = async () => {
        try {
            data = await getAllVaccines();
          
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    };


    data()  
    useEffect(() => {
        // setVaccines(data);
    }, [vaccines])

    return (
        <ul>
            {/* <li>{vaccines[0]}</li> */}
        </ul>

    )
}

export default Home;