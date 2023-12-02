import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/updateSlice";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const userProfile = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();

  // State variables to hold the edited values
  const [editedFirstName, setEditedFirstName] = useState(userProfile.firstName);
  const [editedLastName, setEditedLastName] = useState(userProfile.lastName);
  const [editedEmail, setEditedEmail] = useState(userProfile.email);
  const [editedUsername, setEditedUsername] = useState(userProfile.username);
  const { userId } = useParams();

  // State variable to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle changes in input fields
  const handleInputChange = (field, value) => {
    switch (field) {
      case "firstName":
        setEditedFirstName(value);
        break;
      case "lastName":
        setEditedLastName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      case "username":
        setEditedUsername(value);
        break;
      default:
        break;
    }
  };

  // Function to handle "Edit" button click
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Function to handle "Save" button click
  const handleSaveClick = () => {
    // Call your updateUser function here with the edited values
    const updateData = {
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail,
      username: editedUsername,
      // Add other fields if needed
    };

    try {
      // Assuming updateUser is an asynchronous function
      dispatch(
        updateUser({
          id: userProfile.id,
          userData: {
            firstName: editedFirstName,
            lastName: editedLastName,
            email: editedEmail,
            username: editedUsername,
          },
        })
      );
      setEditMode(false); // Switch back to view mode after saving
    } catch (error) {
      console.error(error);
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
                  value={editMode ? editedFirstName : userProfile.firstName}
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
                  value={editMode ? editedLastName : userProfile.lastName}
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
                  value={editMode ? editedEmail : userProfile.email}
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
                  value={userProfile.dateJoined.slice(0, 10)}
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
                  value={editMode ? editedUsername : userProfile.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  readOnly={!editMode}
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
