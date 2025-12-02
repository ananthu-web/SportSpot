import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import "../Styles/ProfilePage.css";
import API from "../API";

function ProfilePage() {
  const { user, updateUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess("");
    setError("");
  };

  const handleSave =async () => {
    // Basic profile validation
    if (!profile.name || !profile.email) {
      setError("Name and Email are required");
      return;
    }

    // Password validation
    if (profile.newPassword || profile.confirmPassword) {
      if (!profile.currentPassword) {
        setError("Please enter your current password");
        return;
      }
      if (profile.newPassword !== profile.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
      if (profile.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }
    }
    try{
      const response = await API.put("/api/admin/addcourts",
        profile,{
          headers: {
          Authorization: `Bearer ${user.token}`,
        },
        }
      )
       // Update user context / call API
    updateUser(response.data);

    // Clear password fields after saving
    setProfile((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    setSuccess("Profile updated successfully!");
    setEditing(false);

    }catch(err){
      setError(err.response?.data?.message || "Profile updation failed");

    }

  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">
          <span className="text-warning">My</span>{" "}
          <span className="profile-text">Profile</span>
        </h2>

        <div className={`profile-grid ${editing ? "editing" : ""}`}>
          {/* Profile fields */}
          {["name", "email", "phone", "address", "city", "state", "country", "postalCode"].map(
            (field) => (
              <input
                key={field}
                name={field}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={profile[field]}
                onChange={handleChange}
                readOnly={!editing}
              />
            )
          )}

          {/* Password fields always visible */}
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={profile.currentPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={profile.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={profile.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="profile-btn-container">
          {!editing ? (
            <button className="profile-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <button className="profile-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>

        {error && <p className="profile-error">{error}</p>}
        {success && <p className="profile-success">{success}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;