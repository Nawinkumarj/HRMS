import { useState } from 'react';
import teammem from '../../data/teammem.json';
import { assets } from '../../assets/assets';
import team1 from '../../assets/jack.jpeg';
import team2 from '../../assets/mrb.jpeg';
import team3 from '../../assets/bheem.jpeg';
import team4 from '../../assets/ben.jpeg';

const teamimg = {
    team1: team1,
    team2: team2,
    team3: team3,
    team4: team4,
  };

const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByNew, setSortByNew] = useState(false);
  const [members, setMembers] = useState(teammem);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    Designation: '',
    img: '',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember((prev) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmployee = () => {
    if (newMember.name && newMember.Designation && newMember.img) {
      setMembers([...members, newMember]);
      setIsPopupOpen(false);
      setNewMember({ name: '', Designation: '', img: '' });
    } else {
      alert('Please fill out all fields and upload an image.');
    }
  };

  const filteredMembers = members.filter((team) => {
    const searchText = searchTerm.toLowerCase();
    return (
      team.name.toLowerCase().includes(searchText) ||
      team.Designation.toLowerCase().includes(searchText)
    );
  });

  const sortedMembers = sortByNew
    ? [...filteredMembers].reverse()
    : filteredMembers;

  return (
    <div className="team-members">
      <div className="team-header">
        <div className="filter-btn">
          <label>
            <input
              type="radio"
              name="sort"
              value="new"
              checked={sortByNew}
              onChange={() => setSortByNew(true)}
            />
            Newly Added
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="default"
              checked={!sortByNew}
              onChange={() => setSortByNew(false)}
            />
            Default
          </label>
        </div>
        <div className="team-searchbar">
          <input
            type="text"
            placeholder="Search for team members"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={assets.search} alt="Search Icon" className="search-icon" />
          <button>Search</button>
          <button
            className="add-employee"
            onClick={() => setIsPopupOpen(true)}
          >
            <img src={assets.addemp} alt="add-employee" className="add-emp-img" />
            Add Employee
          </button>
        </div>
      </div>
      <div className="team-cards">
        {sortedMembers.map((team, index) => (
          <div className="team-card" key={index}>
            <div className="team-img">
              <img src={teamimg[team.img]} alt={team.name} />
            </div>
            <div className="team-card-name">
              <h2>{team.name}</h2>
              <p>{team.Designation}</p>
            </div>
          </div>
        ))}
        {sortedMembers.length === 0 && <p>No team members found.</p>}
      </div>

      {isPopupOpen && (
        <div className="emp-popup">
          <div className="popup-content">
            <h2>Add New Employee</h2>
            <label>
              Name:
              <input type="text" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </label>
            <label>
              Designation:
              <input type="text" value={newMember.Designation} onChange={(e) => setNewMember({ ...newMember, Designation: e.target.value })}
              />
            </label>
            <label>
              Upload Image:
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            {newMember.img && (
              <div className="image-preview">
                <img src={newMember.img} alt="Preview" className="preview-img" />
              </div>
            )}
            <div className="popup-buttons">
              <button onClick={handleAddEmployee}>Save</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
