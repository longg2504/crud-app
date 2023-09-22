import React ,{ useState, useEffect} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StudentSerivce from "../../service/studentService";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditSchema = yup.object({
  name: yup
    .string()
    .required("Username là bắt buộc, vui lòng không để trống!")
    .min(5, "Tên đăng nhập phải từ 5 ký tự!")
    .max(30),
  age: yup
    .number()
    .required("Tuổi là bắt buộc, vui lòng không để trống!")
    .positive()
    .max(100)
    .typeError("Invalid Age"),
  mark: yup
    .number()
    .required("Điểm là bắt buộc, vui lòng không để trống!")
    .min(0, "điểm nhập vào phải ở trong khoảng 0 đến 10")
    .max(10, "điểm nhập vào phải ở trong khoảng 0 đến 10")
    .typeError("Invalid Mark"),
  city: yup.string().required("Thành phố là bắt buộc, vui lòng không để trống"),
});

const EditStudent = () => {
  const { studentId } = useParams();
  const [studentEdit, setStudentEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(EditSchema),
    values:studentEdit
  });

  useEffect(() => {
    try {
      setLoading(true);
      async function getData() {
        let studentRes = await StudentSerivce.getStudent(studentId);
        setStudentEdit(studentRes.data);
        console.log(studentRes);
        setLoading(false);
      }
      getData();
    } catch (error) {}
  }, [studentId]);


  const handleEdit = (values) => {
    try {
      async function postData(values) {
        let studentRes = await StudentSerivce.editStudent(studentId,values);
        
        alert("Cập nhật thành công");
        navigate("/");
      }
      postData(values);
    } catch (error) {}
  };


  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-primary me-3">Edit Student Form</h3>
          <Link className="btn btn-sm btn-outline-primary" to={"/student/list"}>
            <i className="fa fa-arrow-left me-2" />
            Back To Student List
          </Link>
        </div>
        <p className="fst-italic">
          Sit sint eiusmod reprehenderit nulla sunt incididunt. Excepteur ex
          aliqua ipsum eiusmod qui minim proident occaecat nulla velit occaecat.
          Ex cupidatat mollit exercitation et proident Lorem sunt duis magna
          exercitation dolor pariatur. Reprehenderit Lorem culpa ullamco
          cupidatat laborum laborum nulla. Et mollit occaecat voluptate laboris
          et eiusmod anim. Excepteur incididunt reprehenderit eu excepteur.
          Ipsum sit consectetur ad quis ex laborum officia dolor.
        </p>
      </section>

      <section>
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="mb-2 form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name here"
                {...register('name')}
              />
              <span className="text-danger">{errors?.name?.message}</span>
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 form-label" htmlFor="age">
                Age
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your age here"
                {...register('age')}
              />
              <span className="text-danger">{errors?.age?.message}</span>
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 form-label" htmlFor="gender">
                Gender
              </label>
              <select className="form-select" {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 form-label" htmlFor="city">
                City
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your city here"
                {...register('city')}
              />
              <span className="text-danger">{errors?.city?.message}</span>
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 form-label" htmlFor="mark">
                Mark
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your mark here"
                {...register('mark')}
              />
              <span className="text-danger">{errors?.mark?.message}</span>
            </div>
            <div className="form-group mb-3">
              <button
                // onClick={handleAdd}
                type="submit"
                className="btn btn-outline-success me-3"
              >
                Edit Student
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditStudent;
