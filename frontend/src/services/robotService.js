import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';

// export const fetchRobots = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/robots`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching robots:', error);
//     return [];
//   }
// };

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
export const fetchRobots = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/robots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching robots:', error);
        return [];
    }
};
