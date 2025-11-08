import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  // State for edit modes
  const [editPersonalInfo, setEditPersonalInfo] = useState(false)
  const [editEmergencyContact, setEditEmergencyContact] = useState(false)
  
  // State for form data
  const [personalInfo, setPersonalInfo] = useState({
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

  const [emergencyContacts, setEmergencyContacts] = useState(
    user?.emergency_contact?.length > 0 
      ? user.emergency_contact 
      : [{ name: '', Relationship: '', phone: '', Address: '' }]
  )

  // Handle personal info changes
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle emergency contact changes
  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts[index][field] = value
    setEmergencyContacts(updatedContacts)
  }

  // Add new emergency contact
  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [
      ...prev,
      { name: '', Relationship: '', phone: '', Address: '' }
    ])
  }

  // Remove emergency contact
  const removeEmergencyContact = (index) => {
    if (emergencyContacts.length > 1) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index)
      setEmergencyContacts(updatedContacts)
    }
  }

  // Save personal information
  const savePersonalInfo = async () => {
    try {
      await updateUser(personalInfo)
      setEditPersonalInfo(false)
    } catch (error) {
      console.error('Error updating personal info:', error)
    }
  }

  // Save emergency contacts
  const saveEmergencyContacts = async () => {
    try {
      await updateUser({ emergency_contact: emergencyContacts })
      setEditEmergencyContact(false)
    } catch (error) {
      console.error('Error updating emergency contacts:', error)
    }
  }

  // Cancel editing
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
    setEditPersonalInfo(false)
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

        {/* Personal Information Section */}
        <div className='personal-info-section'>
          <div className='section-header'>
            <h3>Personal Information</h3>
            <button 
              className={`edit-btn ${editPersonalInfo ? 'cancel' : 'edit'}`}
              onClick={() => editPersonalInfo ? cancelEditPersonalInfo() : setEditPersonalInfo(true)}
            >
              {editPersonalInfo ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className='cards leftSide'>
            {editPersonalInfo ? (
              <div className='edit-form'>
                <div className='form-group'>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Designation:</label>
                  <input
                    type="text"
                    value={personalInfo.designation}
                    onChange={(e) => handlePersonalInfoChange('designation', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Employee ID:</label>
                  <input
                    type="text"
                    value={personalInfo.userId}
                    onChange={(e) => handlePersonalInfoChange('userId', e.target.value)}
                    disabled // Usually employee ID shouldn't be editable
                  />
                </div>
                <div className='form-group'>
                  <label>Date Of Join:</label>
                  <input
                    type="date"
                    value={personalInfo.doj}
                    onChange={(e) => handlePersonalInfoChange('doj', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Work Email:</label>
                  <input
                    type="email"
                    value={personalInfo.work_email}
                    onChange={(e) => handlePersonalInfoChange('work_email', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Personal Email:</label>
                  <input
                    type="email"
                    value={personalInfo.personal_email}
                    onChange={(e) => handlePersonalInfoChange('personal_email', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>DOB:</label>
                  <input
                    type="date"
                    value={personalInfo.birthday}
                    onChange={(e) => handlePersonalInfoChange('birthday', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Address:</label>
                  <textarea
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    rows="3"
                  />
                </div>
                <div className='form-group'>
                  <label>Gender:</label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  />
                </div>
                <div className='form-actions'>
                  <button className='save-btn' onClick={savePersonalInfo}>
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className='view-mode'>
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
            )}
          </div>

          {/* Emergency Contact Section */}
          <div className='cards right'>
            <div className='section-header'>
              <h3>Emergency Contact</h3>
              <button 
                className={`edit-btn ${editEmergencyContact ? 'cancel' : 'edit'}`}
                onClick={() => editEmergencyContact ? cancelEditEmergencyContacts() : setEditEmergencyContact(true)}
              >
                {editEmergencyContact ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editEmergencyContact ? (
              <div className='edit-form'>
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
                <div className='form-actions'>
                  <button className='add-btn' onClick={addEmergencyContact}>
                    Add Another Contact
                  </button>
                  <button className='save-btn' onClick={saveEmergencyContacts}>
                    Save Contacts
                  </button>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile