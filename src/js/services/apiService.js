const axios = require('axios');

const apiService = {
    fetchShipments: function () {
        return axios.get('http://localhost:3000/api/shipments')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error; // Re-throw to handle it in the calling function
            });
    }
};

module.exports = apiService;
