const axios = require("axios");

const register = async () => {
    try {
        const response = await axios.post("http://20.244.56.144/test/register", {
            companyName: "YourActualCompanyName",
            ownerName: "Nikhil C",
            rollNo: "R23EA803",
            ownerEmail: "dcet2300028@reva.edu.in",
            accessCode: "xgZYHM"
        });

        console.log("Registration Successful:", response.data);
    } catch (error) {
        console.error("Error Registering:", error.response ? error.response.data : error.message);
    }
};

register();
