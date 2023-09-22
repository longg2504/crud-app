import axios from "axios";
import LeftSideBar from '../components/layout/LeftSideBar';


class StudentSerivce {
    static getStudents(currentPage) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`)
    }
    static getStudent(id) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    static addStudent(data) {
        return axios.post('https://js-post-api.herokuapp.com/api/students' , data)
    }
    static deleteStudent(id) {
        return axios.delete(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    static editStudent(id,data) {
        return axios.patch(`https://js-post-api.herokuapp.com/api/students/${id}` , data)
    }
}

export default StudentSerivce