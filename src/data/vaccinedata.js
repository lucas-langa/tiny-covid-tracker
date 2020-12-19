import axios from 'axios';

let  getAllVaccines = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://disease.sh/v3/covid-19/vaccine').then((res) => {
            if (res.status === 200) {
                resolve(res.data.data);
            }
        })
        .catch((err) => reject(err))
    });
} 

export default getAllVaccines;