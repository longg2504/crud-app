import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import Spinner from "../layout/Spinner";
import StudentSerivce from "../../service/studentService";

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [action, setAction] = useState("next");

  useEffect(() => {
    try {
      setLoading(true);
      async function getData(currentPage) {
        let studentRes = await StudentSerivce.getStudents(currentPage);
        console.log(studentRes.data.data);
        setStudentList(studentRes.data.data);
        setLoading(false);
        setTotalPage(
          Math.ceil(
            Number(studentRes.data.pagination._totalRows) /
              Number(studentRes.data.pagination._limit)
          )
        );
      }
      getData(currentPage);
    } catch (error) {}
  }, [currentPage]);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      async function deleteData(id) {
        let studentRes = await StudentSerivce.deleteStudent(id);
        setLoading(false);
      }
      deleteData(id);
      const updatedList = studentList.filter((student) => student.id !== id);
      setStudentList(updatedList);
      alert("xoá student thành công");
    } catch (error) {}
  };

  const handlePageChange = (action) => {
    if (action === "first") {
      setCurrentPage(1);
    } else if (action === "previous") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (action === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (action === "last") {
      setCurrentPage(totalPage);
    }
  };

  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-warning me-3">Student List</h3>
          <Link
            className="btn btn-sm btn-outline-success"
            to={"/student/create"}
          >
            <i className="fa fa-plus me-2" />
            Add Student
          </Link>
        </div>
        <p className="fst-italic">
          Deserunt ut pariatur tempor aute incididunt Lorem esse. Pariatur
          dolore aute esse eu pariatur voluptate in amet excepteur occaecat
          culpa eiusmod. Non qui labore anim do dolore magna deserunt amet
          commodo Lorem aliquip.
        </p>
      </section>
      <section className="mt-2">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <table className="table table-striped table-hover">
              <thead className="table-warning">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Mark</th>
                  <th colSpan={3}>Actionts</th>
                </tr>
              </thead>
              <tbody>
                {studentList.length &&
                  studentList.map((std) => (
                    <tr>
                      <td>{std.id}</td>
                      <td>{std.name}</td>
                      <td>{std.age}</td>
                      <td>{std.gender}</td>
                      <td>{std.city}</td>
                      <td>{std.mark}</td>
                      <td>
                        <Link to={`/student/detail/${std.id}`}>
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/student/edit/${std.id}`}>
                        <i className="fa-solid fa-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleDelete(std.id)}
                        >
                          <i class="fa-solid fa-user-slash"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange("first")}
                  >
                    First
                  </button>
                </li>
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange("previous")}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link" disabled>
                    Page {currentPage} of {totalPage}
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === totalPage ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange("next")}
                  >
                    Next
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === totalPage ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange("last")}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </section>
    </>
  );
};

export default StudentList;
