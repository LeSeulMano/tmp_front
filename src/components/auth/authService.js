import axios from "axios";

function checkAdminPermission() {
    return new Promise((resolve) => {
        axios.get("http://localhost:5000/admin", {
            withCredentials: true,
            validateStatus: function (status) {
                return status === 200 || status === 401; // Accepter uniquement les codes 200 (OK) et 401 (Non autorisé)
            }
        }).then((res) => {
            if (res.status == 401) {
                resolve(false);
            } else{
                resolve(true);
            }
        })
    })

}

export {checkAdminPermission};