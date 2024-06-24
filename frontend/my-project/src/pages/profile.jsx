import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/updateSlice";

import { useParams } from "react-router-dom";

export const Profile = () => {
  const userProfile = useSelector((state) => state.user.user?.data ?? {});
  const dispatch = useDispatch();

  // State variables for edited values
  const [editedFirstName, setEditedFirstName] = useState(
    userProfile.user.firstName ?? ""
  );
  const [editedLastName, setEditedLastName] = useState(
    userProfile.user.lastName ?? ""
  );
  const [editedEmail, setEditedEmail] = useState(userProfile.user.email ?? "");

  // State variables to track if a field has been edited
  const [firstNameEdited, setFirstNameEdited] = useState(false);
  const [lastNameEdited, setLastNameEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);

  // State variable to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle changes in input fields
  const handleInputChange = (field, value) => {
    switch (field) {
      case "firstName":
        setEditedFirstName(value);
        setFirstNameEdited(true);
        break;
      case "lastName":
        setEditedLastName(value);
        setLastNameEdited(true);
        break;
      case "email":
        setEditedEmail(value);
        setEmailEdited(true);
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };


  const handleSaveClick = () => {
    const updateData = {};
    if (firstNameEdited) updateData.firstName = editedFirstName;
    if (lastNameEdited) updateData.lastName = editedLastName;
    if (emailEdited) updateData.email = editedEmail;
  
    // Only proceed if there's something to update
    if (Object.keys(updateData).length > 0) {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      dispatch(
        updateUser({ id: userId, userData: updateData, token: accessToken })
      )
        .unwrap()
        .then((res) => {
          if (res && res.status === "success") {
            setEditMode(false); // Exit edit mode on success
            // Reset edited flags
            setFirstNameEdited(false);
            setLastNameEdited(false);
            setEmailEdited(false);
          } else {
            console.error("Unexpected response structure or status:", res);
          }
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-serif mb-10">Profile</h1>

        <div className="flex gap-10">
          <div>
            <img
              src={userProfile.imgSrc}
              className="w-96 h-96 object-fill"
              alt=""
            />

            {editMode ? (
              <button
                onClick={handleSaveClick}
                className="bg-black text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl mt-4"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-black text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl mt-4"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div>
            <div className="flex">
              <span className="flex w-96 flex-col">
                <label
                  htmlFor="firstname"
                  className="font-serif text-base font-semibold"
                >
                  Firstname:
                </label>
                <input
                  value={
                    editMode ? editedFirstName : userProfile?.user?.firstName
                  }
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  readOnly={!editMode}
                  className="h-10 outline-none text-lg font-sans"
                />
              </span>

              <span className="flex flex-col w-96">
                <label
                  htmlFor="lastname"
                  className="font-serif text-base font-semibold"
                >
                  Last name:
                </label>
                <input
                  value={
                    editMode ? editedLastName : userProfile?.user?.lastName
                  }
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  readOnly={!editMode}
                  className="h-10 outline-none text-lg font-sans"
                />
              </span>
            </div>

            <div className="flex mt-10">
              <span className="flex w-96 flex-col">
                <label
                  htmlFor="email"
                  className="font-serif text-base font-semibold"
                >
                  Email:
                </label>
                <input
                  value={editMode ? editedEmail : userProfile?.user?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  readOnly={!editMode}
                  className="h-10 outline-none text-lg font-sans"
                />
              </span>

              <span className="flex flex-col w-96">
                <label
                  htmlFor="dateJoined"
                  className="font-serif text-base font-semibold"
                >
                  Date Joined:
                </label>
                <input
                  value={
                    userProfile?.user?.dateJoined
                      ? userProfile?.user?.dateJoined.slice(0, 10)
                      : ""
                  }
                  readOnly
                  className="h-10 outline-none text-lg font-sans"
                />
              </span>
            </div>

            <div className="flex mt-10">
              <span className="flex w-96 flex-col">
                <label
                  htmlFor="username"
                  className="font-serif text-base font-semibold"
                >
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  value={userProfile?.user?.username}
                  readOnly={true}
                  className="h-10 outline-none text-lg font-sans"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
