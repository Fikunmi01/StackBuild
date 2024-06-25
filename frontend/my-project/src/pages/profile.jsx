import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/updateSlice";

export const Profile = () => {
  const userProfile = useSelector((state) => state.user.user?.data ?? {});
  const dispatch = useDispatch();

  const [editedFirstName, setEditedFirstName] = useState(
    userProfile.user.firstName ?? ""
  );
  const [editedLastName, setEditedLastName] = useState(
    userProfile.user.lastName ?? ""
  );
  const [editedEmail, setEditedEmail] = useState(userProfile.user.email ?? "");
  const [editedUsername, setEditedUsername] = useState(
    userProfile.user.username ?? ""
  );

  const [firstNameEdited, setFirstNameEdited] = useState(false);
  const [lastNameEdited, setLastNameEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [usernameEdited, setUsernameEdited] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [saveRequested, setSaveRequested] = useState(false);
  const [fetchUserRequested, setFetchUserRequested] = useState(false);

  useEffect(() => {
    if (saveRequested) {
      dispatch(
        updateUser({
          ...(firstNameEdited && { firstName: editedFirstName }),
          ...(lastNameEdited && { lastName: editedLastName }),
          ...(emailEdited && { email: editedEmail }),
          ...(usernameEdited && { email: editedUsername }),
        })
      )
        .unwrap()
        .then((res) => {
          if (res && res.status === "success") {
            console.log("Update Success:", res);
            setEditMode(false);
            setSaveRequested(false);
          } else {
            console.error("Unexpected response structure or status:", res);
          }
        })
        .catch((error) => {
          console.error("Update failed:", error);
          setSaveRequested(false);
        });
    }
  }, [
    saveRequested,
    firstNameEdited,
    lastNameEdited,
    emailEdited,
    usernameEdited,
    editedFirstName,
    editedLastName,
    editedEmail,
    editedUsername,
    dispatch,
  ]);

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
      case "username":
        setEditedUsername(value);
        setUsernameEdited(true);
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setSaveRequested(true); // Now, this triggers the useEffect for saving
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
                    firstNameEdited
                      ? editedFirstName
                      : userProfile?.user?.firstName ?? ""
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
                    lastNameEdited
                      ? editedLastName
                      : userProfile?.user?.lastName ?? ""
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
                  value={
                    emailEdited ? editedEmail : userProfile?.user?.email ?? ""
                  }
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
                  value={
                    usernameEdited
                      ? editedUsername
                      : userProfile?.user?.username ?? ""
                  }
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
