import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/updateSlice";
import { updateProfilePicture } from "../features/user/userSlice";

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
  const [editedImgSrc, setEditedImgSrc] = useState(userProfile.imgSrc ?? "");

  const [firstNameEdited, setFirstNameEdited] = useState(false);
  const [lastNameEdited, setLastNameEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [usernameEdited, setUsernameEdited] = useState(false);
  const [imageEdited, setImageEdited] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [saveRequested, setSaveRequested] = useState(false);

  useEffect(() => {
    if (saveRequested) {
      if (imageEdited) {
        const formData = new FormData();
        formData.append("picture", editedImgSrc);
        dispatch(updateProfilePicture({ pictureFormData: formData }))
          .unwrap()
          .then((res) => {
            if (res && res.status === "success") {
              console.log("Image Update Success:", res);
            } else {
              console.error("Unexpected response structure or status:", res);
            }
          })
          .catch((error) => {
            console.error("Image Update failed:", error);
          })
          .finally(() => {
            setSaveRequested(false);
            setEditMode(false);
          });
      } else if (
        firstNameEdited ||
        lastNameEdited ||
        emailEdited ||
        usernameEdited
      ) {
        dispatch(
          updateUser({
            ...(firstNameEdited && { firstName: editedFirstName }),
            ...(lastNameEdited && { lastName: editedLastName }),
            ...(emailEdited && { email: editedEmail }),
            ...(usernameEdited && { username: editedUsername }),
            ...(imageEdited && { profilePicture: editedImgSrc }),
          })
        )
          .unwrap()
          .then((res) => {
            if (res && res.status === "success") {
              console.log("Profile Update Success:", res);
            } else {
              console.error("Unexpected response structure or status:", res);
            }
          })
          .catch((error) => {
            console.error("Profile Update failed:", error);
          })
          .finally(() => {
            setSaveRequested(false);
            setEditMode(false);
          });
      }
    }
  }, [
    saveRequested,
    imageEdited,
    firstNameEdited,
    lastNameEdited,
    emailEdited,
    usernameEdited,
    editedFirstName,
    editedLastName,
    editedEmail,
    editedUsername,
    editedImgSrc,
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
      case "profilePicture":
        setEditedImgSrc(value);
        setImageEdited(true);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImgSrc(reader.result.toString());
        setImageEdited(true);
      };
      reader.readAsDataURL(file);
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

        <div className="flex flex-col-reverse md:flex-row md:gap-10">
          <div className="">
            <div className="relative ">
              <img
                src={editedImgSrc || "/assets/profile.svg"}
                alt="Profile Icon"
                className="w-96 md:h-96 object-cover"
              />
              {editMode && (
                <input
                  type="file"
                  className="mt-4   "
                  onChange={handleImageChange}
                  alt=""
                />
              )}
            </div>

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
            <div className="flex md:flex-row">
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

            <div className="flex flex-col md:flex-row md:mt-10">
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

            <div className="flex md:mt-10">
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
