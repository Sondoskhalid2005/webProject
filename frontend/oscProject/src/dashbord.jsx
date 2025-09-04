import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const courseFromEnroll = location.state?.course || null;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  useEffect(() => {
    if (courseFromEnroll) {
      
      if (!enrolledCourses.find(c => c.id === courseFromEnroll.id)) {
        setEnrolledCourses(prev => [...prev, { ...courseFromEnroll, progress: 0 }]);
      }
      setSelectedCourse(courseFromEnroll);
    }
  }, [courseFromEnroll]);

  return (
    <div className="dashboard">
      {sidebarVisible && (
        <div className="dashboard-sidebar">
          <h2>My Courses</h2>
          <ul>
            {enrolledCourses.length === 0 && <li>No courses enrolled yet</li>}
            {enrolledCourses.map(course => (
              <li
                key={course.id}
                className={selectedCourse?.id === course.id ? "active" : ""}
                onClick={() => setSelectedCourse(course)}
              >
                {course.title}
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${course.progress}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="dashboard-main">
        <button
          className="toggle-btn"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          {sidebarVisible ? "Hide Lessons" : "Show Lessons"}
        </button>

        {selectedCourse ? (
          <div className="course-detail">
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <iframe
              src={selectedCourse.videoUrl}
              title={selectedCourse.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>Select a Lesson from the left to view it here.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;