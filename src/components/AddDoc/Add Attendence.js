import React, { useState, useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

const AddAttendance = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);  // Updated state for courses
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const coursesCollection = firestore.collection('courses');
      const coursesSnapshot = await coursesCollection.get();
      const coursesData = coursesSnapshot.docs.map(doc => ({
        courseId: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  fetchCourses();
}, []);

  

  const handleChangeCourse = (courseId) => {
    const selectedCourse = courses.find(course => course.courseId === courseId);
    setCourse(selectedCourse);
    setStudents(selectedCourse.students || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setCourse({});
    setStudents([]);
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      // Save attendance data to Firestore
      const attendanceData = { ...course, students };
      await setDoc(doc(firestore, 'attendance', course.courseId), attendanceData);
      setOpen(false);
      window.notify('Attendance details saved successfully', 'success');
      setCourse({});
      setStudents([]);
    } catch (err) {
      window.notify('Failed to save attendance details', 'error');
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ minHeight: '40px', backgroundColor: "gray" }} onClick={showModal}>
          <a style={{ backgroundColor: "gray" }} className="Plus nav-link p-2 rounded">Attendece Mark</a>
        </div>
      </div>

      <Modal title="Course Details" visible={open} onOk={handleOk} onCancel={handleCancel}>
        <div className="row">
          <div className="col">
            <label htmlFor="courseId" className="fw-bold">
              Courses
            </label>
            <br />
            <Select
  placeholder="Courses"
  className="w-100"
  onChange={handleChangeCourse}
>
  {courses.map(course => (
    <Select.Option key={course.courseId} value={course.courseId}>
      {course.courseName} {/* Update with the actual field containing course names */}
    </Select.Option>
  ))}
</Select>

          </div>
        </div>
        {course.courseId && (
          <>
            <div className="row">
              <div className="col">
                <label htmlFor="name" className="fw-bold">
                  Students
                </label>
                <br />
                <Select
                  mode="multiple"
                  placeholder="Select students"
                  className="w-100"
                  value={students}
                  onChange={value => setStudents(value)}
                >
                  {students.map(student => (
                    <Select.Option key={student.studentId} value={student.studentId}>
                      {student.studentName}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="description" className="fw-bold">
                  Attendance
                </label>
                <br />
                <Select
                  mode="tags"
                  placeholder="Select attendance"
                  className="w-100"
                  onChange={handleChange}
                  value={course.attendance}
                  name="attendance"
                />
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddAttendance;
