const axios = require("axios");

const authenticate = async () => {
    try {
        const response = await axios.post("http://20.244.56.144/test/auth", {
            companyName: "YourActualCompanyName",
            clientID: "be784c8f-4690-46aa-975e-7ce3b6e603cc",
            clientSecret: "gMDVtlAkHQMSrfSg",
            ownerName: "Nikhil C",
            ownerEmail: "dcet2300028@reva.edu.in",
            rollNo: "R23EA803",
        });

        console.log("Authentication Successful:", response.data);
    } catch (error) {
        console.error("Error Authenticating:", error.response ? error.response.data : error.message);
    }
};

authenticate();
