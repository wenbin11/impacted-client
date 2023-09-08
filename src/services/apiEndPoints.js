import http from "../../http-common";

class ApiEndPoints {
    getAboutData() {
        return http.get("/about");
    }
}

export default new ApiEndPoints();