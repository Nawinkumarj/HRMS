import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'
//                                                                                                                                        


const Profile = () => {
  const { user, updateUser } = useAuth();

  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [editEmergencyContact, setEditEmergencyContact] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    designation: user?.designation || '',
    userId: user?.userId || '',
    doj: user?.dataOfJoing || '',
    work_email: user?.work_email || '',
    personal_email: user?.personal_email || '',
    birthday: user?.birthday || '',
    address: user?.address || '',
    gender: user?.gender || '',
    phone: user?.phone || ''
  })

  const [emergencyContacts, setEmergencyContacts] = useState(
    user?.emergency_contact?.length > 0
      ? user.emergency_contact
      : [{ name: '', Relationship: '', phone: '', Address: '' }]
  )

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts[index][field] = value
    setEmergencyContacts(updatedContacts)
  }

  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [
      ...prev,
      { name: '', Relationship: '', phone: '', Address: '' }
    ])
  }

  const removeEmergencyContact = (index) => {
    if (emergencyContacts.length > 1) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index)
      setEmergencyContacts(updatedContacts)
    }
  }

  const savePersonalInfo = async () => {
    try {
      await updateUser(personalInfo)
      setShowPersonalModal(false)
    } catch (error) {
      console.error('Error updating personal info:', error)
    }
  }

  const saveEmergencyContacts = async () => {
    try {
      await updateUser({ emergency_contact: emergencyContacts })
      setEditEmergencyContact(false)
    } catch (error) {
      console.error('Error updating emergency contacts:', error)
    }
  }

  const cancelEditPersonalInfo = () => {
    setPersonalInfo({
      name: user?.name || '',
      designation: user?.designation || '',
      userId: user?.userId || '',
      doj: user?.doj || '',
      work_email: user?.work_email || '',
      personal_email: user?.personal_email || '',
      birthday: user?.birthday || '',
      address: user?.address || '',
      gender: user?.gender || '',
      phone: user?.phone || ''
    })
    setShowPersonalModal(false)
  }

  const cancelEditEmergencyContacts = () => {
    setEmergencyContacts(
      user?.emergency_contact?.length > 0
        ? user.emergency_contact
        : [{ name: '', Relationship: '', phone: '', Address: '' }]
    )
    setEditEmergencyContact(false)
  }

  return (
    <div className='ProfilePageContainer'>
      <div className='TopBanner'>
        <div>
          <div className='bannerSection'>
            <img src={user?.bannerImg} alt="" className='bannerImg' />
            <div className='profileCard'>
              <img src={assets.profileImg} alt="" className='profileImg' />
              <p className='name'>{user?.name}</p>
              <p className='designation'>{user?.designation}</p>
              <a href={`tel:${user?.phone}`}>
                <span>{user?.phone}</span>
              </a>
            </div>
          </div>

          <div className='profileInfoLeft'>
            <div className='cards leftSide'></div>
            <div className='cards rightSide'>RIGHT</div>
          </div>
        </div>

        {/* Personal Information */}
        <div className='personal-info-section'>
          <div className='section-header'>
            <h3>Personal Information</h3>
            <button
              className='edit-btn-profile '
              onClick={() => setShowPersonalModal(true)}
            >
              Edit
            </button>
          </div>

          <div className="cards leftSide">
            <div className="view-mode">
              <p><span>Name :</span> {user?.name}</p>
              <p><span>Designation :</span> {user?.designation}</p>
              <p><span>Employee ID :</span> {user?.userId}</p>
              <p><span>Date Of Join :</span> {user?.doj}</p>
              <p><span>Work Email :</span> {user?.work_email}</p>
              <p><span>Personal Email :</span> {user?.personal_email}</p>
              <p><span>DOB :</span> {user?.birthday}</p>
              <p><span>Address :</span> {user?.address}</p>
              <p><span>Gender :</span> {user?.gender}</p>
              <p><span>Phone :</span> {user?.phone}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className='cards right'>
            <div className='section-header'>
              <h3>Emergency Contact</h3>
              <button
                className={`edit-btn-profile ${editEmergencyContact ? 'cancel' : 'edit'}`}
                onClick={() => editEmergencyContact ? cancelEditEmergencyContacts() : setEditEmergencyContact(true)}
              >
                Edit
              </button>
            </div>
            <div className='view-mode'>
              {user?.emergency_contact?.length > 0 ? (
                user.emergency_contact.map((contact, index) => (
                  <div key={index} className='emergency-contact-item'>
                    <p><span>Name :</span> {contact.name}</p>
                    <p><span>Relationship :</span> {contact.Relationship}</p>
                    <p><span>Phone :</span> {contact.phone}</p>
                    <p><span>Address :</span> {contact.Address}</p>
                    {index < user.emergency_contact.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <p>No Emergency Contact</p>
              )}
            </div>
          </div>
        </div>
      </div>


      {showPersonalModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPersonalModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <h3>Edit Personal Information</h3>

            <div className="edit-form">
              {Object.keys(personalInfo).map((key) => (
                <div className="form-group" key={key}>
                  <label style={{ textTransform: "capitalize" }}>
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    value={personalInfo[key]}
                    onChange={(e) =>
                      handlePersonalInfoChange(key, e.target.value)
                    }
                  />
                </div>
              ))}

              <div className="modal-actions" style={{ marginTop: "20px" }}>
                <button
                  className="save-btn"
                  onClick={savePersonalInfo}
                  style={{ padding: "8px 14px", marginRight: "10px" }}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={cancelEditPersonalInfo}
                  style={{ padding: "8px 14px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editEmergencyContact && (
        <div
          className="modal-overlay"
          onClick={() => setEditEmergencyContact(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Edit Emergency Contact</h3>

            {emergencyContacts.map((contact, index) => (
              <div key={index} className='emergency-contact-form'>
                <div className='form-group'>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Relationship:</label>
                  <input
                    type="text"
                    value={contact.Relationship}
                    onChange={(e) => handleEmergencyContactChange(index, 'Relationship', e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Address:</label>
                  <textarea
                    value={contact.Address}
                    onChange={(e) => handleEmergencyContactChange(index, 'Address', e.target.value)}
                    rows="2"
                  />
                </div>

                {emergencyContacts.length > 1 && (
                  <button
                    className='remove-btn'
                    onClick={() => removeEmergencyContact(index)}
                  >
                    Remove Contact
                  </button>
                )}

                <hr />
              </div>
            ))}

            <div className='form-actions-contact'>
              <button className='add-btn-contact' onClick={addEmergencyContact}>
                Add Another Contact
              </button>

              <button
                className='save-btn'
                onClick={() => {
                  saveEmergencyContacts();
                  setEditEmergencyContact(false);
                }}
              >
                Save Contacts
              </button>

              <button
                className='cancel-btn'
                onClick={() => {
                  cancelEditEmergencyContacts();
                  setEditEmergencyContact(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Profile
