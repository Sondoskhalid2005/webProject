import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Profile() {
  return (
    <>
      <div className="eduweb-navbar-wrapper">
        <nav className="eduweb-nav">
          <Link to="/info">Info</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </div>

      <div className="eduweb-container">
        <header className="eduweb-header">
          <h1>Your Profile</h1>
          <p>Manage your account, track progress, and update details.</p>
        </header>

        <section className="profile-section">
          <h2>Basic Information</h2>
          <div className="profile-card">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Member Since:</strong> January 2024</p>
            <Link to="/edit-profile" className="cta-button">Edit Profile</Link>
          </div>
        </section>

        <section className="profile-section">
          <h2>Enrolled Courses</h2>
          <div className="eduweb-cards">
            <div className="edu-card">
              <h2>React for Beginners</h2>
              <p>Progress: 65%</p>
              <Link to="/course/react" className="cta-button">Continue</Link>
            </div>
            <div className="edu-card">
              <h2>Python Programming</h2>
              <p>Progress: 30%</p>
              <Link to="/course/python" className="cta-button">Continue</Link>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>Account Settings</h2>
          <div className="settings-card">
            <Link to="/change-password" className="cta-button">Change Password</Link>
            <Link to="/logout" className="cta-button">Logout</Link>
          </div>
        </section>
      </div>

      <footer className="eduweb-footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>EduWeb</h3>
            <p>Your gateway to learning. Explore courses, enhance skills, and grow your career with us.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/info">Info</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@eduweb.com</p>
            <p>Phone: +20 1000000000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduWeb. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
