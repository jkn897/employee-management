import axios from "axios";

const API_URL = "http://localhost:8181/api/v1/";

class AuthService {
    async login(username, password) {
        // console.log(username + "\t" + password);
        return axios
            .post(API_URL + "login", { username, password })
            .then((response) => {
                console.log('auth service login success');
                console.log(response);
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    let roles = [];
                    response.data?.user?.authorities?.forEach((authorityObj, index) => {
                        roles.push(authorityObj?.authority);
                    });
                    roles.length > 0 && localStorage.setItem("roles", roles);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
    }

    async register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();
