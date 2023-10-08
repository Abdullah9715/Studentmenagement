import React, { useEffect, useState } from 'react';
import { Modal, Input, Select } from 'antd';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

const initialState = {
  uniqueId: Math.random().toString(32).substring(2),
  name: '',
  rollNo: '',
  course: '',
  city: '',
  address: '',
  phoneNumber: '',
  idCard: '',
  attendence:'absent'
};



const Add = () => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(initialState);
  const [courses, setCourses] = useState([]);
  const { Option } = Select;

  const fetchCourses = async () => {
    try {
      const courseCollection = collection(firestore, 'courses');
      const courseSnapshot = await getDocs(courseCollection);
      const courseData = courseSnapshot.docs.map(doc => ({ ...doc.data(), courseId: doc.id }));
      setCourses(courseData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Fetch courses when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setStudent(initialState);
    setOpen(false);
  };

  const handleOk = async () => {
    if (student.name.length < 3) {
      window.notify('Please enter a valid name!', 'info');
      return;
    }

    if (student.rollNo.length < 1) {
      window.notify('Please enter a valid roll number!', 'info');
      return;
    }

    try {
      const todo = { ...student };
      await setDoc(doc(firestore, 'students', todo.uniqueId), todo);
      setOpen(false);
      window.notify('Student details saved successfully', 'success');
      setStudent(initialState);
    } catch (err) {
      window.notify('Failed to save student details', 'error');
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{minHeight:'40px' ,backgroundColor:"gray"}} onClick={showModal}>
          <a style={{backgroundColor:"gray"}} className="Plus nav-link p-2 rounded">ADD Student</a>
        </div>
      </div>

      <Modal title="Student Details" visible={open} onOk={handleOk} onCancel={handleCancel}>
        <div className="row">
          <div className="col">
            <label htmlFor="uniqueId" className="fw-bold">
              Unique ID
            </label>
            <br />
            <Input
              type="text"
              placeholder="Unique ID"
              id="uniqueId"
              className="w-100"
              value={student.uniqueId}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="name" className="fw-bold">
              Name
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter name"
              id="name"
              className="w-100"
              value={student.name}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="rollNo" className="fw-bold">
              Roll Number
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter roll number"
              id="rollNo"
              className="w-100"
              value={student.rollNo}
              name="rollNo"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="course" className="fw-bold">
              Course
            </label>
            <br />
            <Select
              placeholder="Select course"
              id="course"
              className="w-100"
              value={student.course}
              name="course"
              onChange={value => setStudent(prevStudent => ({ ...prevStudent, course: value }))}
            >
              {courses.map(course => (
                <Option key={course.courseId} value={course.name}>
                  {course.courseName}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="city" className="fw-bold">
              City
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter city"
              id="city"
              className="w-100"
              value={student.city}
              name="city"
              onChange={handleChange}
            />
          </div>
        </div>      <div className="row">
          <div className="col">
            <label htmlFor="Address" className="fw-bold">
              Address
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter Address"
              id="city"
              className="w-100"
              value={student.address}
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="phoneNumber" className="fw-bold">
              Phone Number
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter phone number"
              id="phoneNumber"
              className="w-100"
              value={student.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="idCard" className="fw-bold">
              ID Card
            </label>
            <br />
            <Input
              type="number"
              placeholder="Enter ID card details"
              id="idCard"
              className="w-100"
              value={student.idCard}
              name="idCard"
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Add;
