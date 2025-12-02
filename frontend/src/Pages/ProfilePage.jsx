import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import "../Styles/ProfilePage.css";
import API from "../API";

function ProfilePage() {
  const { user, updateUser } = useContext(UserContext);

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  // Messages
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Auto-remove message
  const autoClear = (setter) => {
    setTimeout(() => {
      setter("");
    }, 5000); // 5 seconds
  };

  // Load user into fields
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  // Profile input
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileError("");
    setProfileSuccess("");
  };

  // Password input
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordError("");
    setPasswordSuccess("");
  };

  // Save profile
  const handleProfileSave = async () => {
    if (!profile.name || !profile.email) {
      setProfileError("Name and Email are required");
      autoClear(setProfileError);
      return;
    }

    try {
      const response = await API.put(
        "/api/user/update-profile",
        profile,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      updateUser(response.data.user);
      setProfileSuccess("Profile updated successfully!");
      autoClear(setProfileSuccess);
      setEditingProfile(false);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Profile update failed");
      autoClear(setProfileError);
    }
  };

  // Save password
  const handlePasswordSave = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setPasswordError("Please fill all password fields");
      autoClear(setPasswordError);
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords do not match");
      autoClear(setPasswordError);
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      autoClear(setPasswordError);
      return;
    }

    try {
      await API.put(
        "/api/user/update-password",
        passwords,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordSuccess("Password changed successfully!");
      autoClear(setPasswordSuccess);
      setEditingPassword(false);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Password change failed");
      autoClear(setPasswordError);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">
          <span className="text-warning">My</span>{" "}
          <span className="profile-text">Profile</span>
        </h2>

        {/* Profile Section */}
        <div className={`profile-grid ${editingProfile ? "editing" : ""}`}>
          {[
            "name",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "country",
            "postalCode",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={profile[field]}
              onChange={handleProfileChange}
              readOnly={!editingProfile}
            />
          ))}
        </div>

        <div className="profile-btn-container">
          {!editingProfile ? (
            <button className="profile-btn" onClick={() => setEditingProfile(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="profile-btn" onClick={handleProfileSave}>
              Save Changes
            </button>
          )}
        </div>

        {/* Profile Messages */}
        {profileError && <p className="profile-error fade-out">{profileError}</p>}
        {profileSuccess && <p className="profile-success fade-out">{profileSuccess}</p>}

        {/* Password Section */}
        <div className="password-section">
          <h3>
            <span className="text-warning">Change</span> Password
          </h3>

          <div className={`password-grid ${editingPassword ? "editing" : ""}`}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              readOnly={!editingPassword}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              readOnly={!editingPassword}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              readOnly={!editingPassword}
            />
          </div>

          <div className="password-btn-container">
            {!editingPassword ? (
              <button className="password-btn" onClick={() => setEditingPassword(true)}>
                Change Password
              </button>
            ) : (
              <button className="password-btn" onClick={handlePasswordSave}>
                Save Password
              </button>
            )}
          </div>

          {/* Password Messages */}
          {passwordError && <p className="password-error fade-out">{passwordError}</p>}
          {passwordSuccess && <p className="password-success fade-out">{passwordSuccess}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;