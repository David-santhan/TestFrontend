import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Home() {
    const data=[
        {
id: "emp_001",
firstName: "John",
lastName: "Doe",
email: "john.doe@company.com",
phone: "+1-555-0123",
department: "Engineering",
position: "Senior Software Engineer",
dateHired: "2020-01-15",
salary: 95000,
employmentType: "Full-time",
status: "Active",
skills: [
{
skillName: "React.js",
proficiencyLevel: "Advanced",
yearsOfExperience: 4
},
{
skillName: "Node.js",
proficiencyLevel: "Intermediate",
yearsOfExperience: 3
}
],
address: {
street: "123 Main St",
city: "New York",
state: "NY",
zipCode: "10001"
},
emergencyContact: {
name: "Jane Doe",
phone: "+1-555-0124",
relationship: "Spouse"
},
createdAt: "2024-01-01T00:00:00Z",
updatedAt: "2024-01-01T00:00:00Z"
},
{
id: "emp_002",
firstName: "Sarah",
lastName: "Johnson",email: "sarah.johnson@company.com",
phone: "+1-555-0125",
department: "Engineering",
position: "Engineering Manager",
dateHired: "2018-03-10",
salary: 125000,
employmentType: "Full-time",
status: "Active",
skills: [
{
skillName: "Team Leadership",
proficiencyLevel: "Expert",
yearsOfExperience: 6
},
{
skillName: "System Architecture",
proficiencyLevel: "Advanced",
yearsOfExperience: 8
}
],
address: {
street: "456 Oak Ave",
city: "San Francisco",
state: "CA",
zipCode: "94102"
},
emergencyContact: {
name: "Mike Johnson",
phone: "+1-555-0126",
relationship: "Brother"
},
createdAt: "2024-01-01T00:00:00Z",
updatedAt: "2024-01-01T00:00:00Z"
},
{
id: "emp_003",
firstName: "Michael",
lastName: "Chen",
email: "michael.chen@company.com",
phone: "+1-555-0127",
department: "Marketing",
position: "Marketing Specialist",
dateHired: "2021-06-01",
salary: 65000,employmentType: "Full-time",
status: "Active",
skills: [
{
skillName: "Digital Marketing",
proficiencyLevel: "Advanced",
yearsOfExperience: 3
},
{
skillName: "SEO",
proficiencyLevel: "Intermediate",
yearsOfExperience: 2
}
],
address: {
street: "789 Pine St",
city: "Chicago",
state: "IL",
zipCode: "60601"
},
emergencyContact: {
name: "Lisa Chen",
phone: "+1-555-0128",
relationship: "Sister"
},
createdAt: "2024-01-01T00:00:00Z",
updatedAt: "2024-01-01T00:00:00Z"
}
];


  const [showCreateEmployeeModal, setShowCreateEmployeeModal] = useState(false);
    const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
    const[showPermissionModal,setShowPermissionModal] = useState(false);
        const[showgGetPermissionModal,setShowGetPermissionModal] = useState(false);
        const[showDeleteModal,setShowDeleteModal] = useState(false);
        const[idToDelete,setIdToDelete] = useState('');
         const [selectedItems, setSelectedItems] = useState([]);
    const[preferenseType,setPreferenceType]=useState("");
    const [items,setItems]=useState();
    let emailRegEx = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
    let emailSpanRef = useRef();


  const handleClose = () => {{setShowCreateEmployeeModal(false);setPreferenceType("")}};
  const handleShow = () => setShowCreateEmployeeModal(true);
    const handleCloseEditModal = () => {{setShowEditEmployeeModal(false)}};
  const handleShowEditModal = () => setShowEditEmployeeModal(true);

const[search,setSearch] = useState();
const[filteredData,setFilteredData] = useState(data);
 const [sortOption, setSortOption] = useState('');
const[localEmployeesData,setLocalEmployeesData] = useState([]);

const getRandomInteger = (min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const [employeeData, setEmployeeData] = useState({
    id:getRandomInteger(1, 100), // Generates a random integer between 1 and 100,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department:'', 
    position:'',
     dateHired:'',
      salary:'',
       employmentType:'',
       status:'',
       Skills:[
        {
            Technologies:'',
            level:'',
        }
       ],
       street:'',
        city:'',
         state:'',
          zipCode:'',
          emergencyContactname:'',
           emergencyContactphone:'',
            emergencyContactrelationship:'',

  });
   const [formData, setFormData] = useState({
    id: getRandomInteger(1, 100),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    dateHired: '',
    salary: '',
    employmentType: '',
    status: '',
    Skills: [{ Technologies: '', level: '' }],
    street: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactname: '',
    emergencyContactphone: '',
    emergencyContactrelationship: '',
  });

// const filteredData = data.filter(item => {
//   const searchableString = `${item.firstName} ${item.lastName} ${item.department}`.toLowerCase();
//   return searchableString.includes(search.toLowerCase());
// });

const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    filterData(value);
  };

  const filterData = (value) => {
    const filtered = data.filter((item) => {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

    const filteredAndSortedData = () => {
    let filteredData = data;
    if (search) {
      filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (sortOption) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortOption] < b[sortOption]) return -1;
        if (a[sortOption] > b[sortOption]) return 1;
        return 0;

      });
    }
    return filteredData;
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
     if (emailRegEx.test(employeeData.email) === true) {
     emailSpanRef.current.innerHTML="Valid Email"
           emailSpanRef.current.style.color="green"
    } else {
      console.log("Invalid Email")
      emailSpanRef.current.innerHTML="Invalid Email"
      emailSpanRef.current.style.color="red"
    }
  };

  const handleSubmit = async(e) => {

    try {
       e.preventDefault();
    if (preferenseType === "Local") {
      const storedEmployees = localStorage.getItem('employees');
    const employees = storedEmployees ? JSON.parse(storedEmployees) : [];

    employees.push(employeeData);

    localStorage.setItem('employees', JSON.stringify(employees));
        alert("Employee Saved!");


    } else if (preferenseType === "Database") {
    e.preventDefault();
     try {
      await axios.post("https://testbackend-4vdh.onrender.com/AddEmployee",employeeData);
    alert("Employee Saved!");

     } catch (error) {
      console.log(error)
     }
      
    }else{
      alert("Please select a preferense type")
    }
    } catch (error) {
      console.log(error);
    }
   
    
    setEmployeeData({
      firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department:'', 
    position:'',
     dateHired:'',
      salary:'',
       employmentType:'',
       status:'',
       Skills:[
        {
            Technologies:'',
            level:'',
        }
       ],
       street:'',
        city:'',
         state:'',
          zipCode:'',
          emergencyContactname:'',
           emergencyContactphone:'',
            emergencyContactrelationship:'',
    });

  };
  const handleSkillChange = (index, event) => {
  const { name, value } = event.target;
  const updatedSkills = [...employeeData.Skills];
  updatedSkills[index][name] = value;
  setEmployeeData({ ...employeeData, Skills: updatedSkills });
};

const addSkill = () => {
  setEmployeeData({
    ...employeeData,
    Skills: [...employeeData.Skills, { Technologies: '', level: '' }],
  });
};

const removeSkill = (index) => {
  const updatedSkills = employeeData.Skills.filter((_, i) => i !== index);
  setEmployeeData({ ...employeeData, Skills: updatedSkills });
};


  const getAddedEmployeesData = async()=>{
    if (preferenseType === "Local") {
      const storedData = localStorage.getItem('employees');
    if (storedData) {
      setLocalEmployeesData(JSON.parse(storedData));
      setShowGetPermissionModal(false);
      
    }
    } else if (preferenseType === "Database") {
     try {
       const response = await fetch('https://testbackend-4vdh.onrender.com/GetAllEmployees');
      const data = await response.json();
      setLocalEmployeesData(data.data);
       setShowGetPermissionModal(false)  
     } catch (error) {
        console.log(error)
     } 
    } 
    
  }
  const getParticularEmployeeData = async(Id) => {
    if (preferenseType === "Local") {
      const employeeData = localStorage.getItem("employees");
  
  if (!employeeData) {
    console.log("No employee data found in localStorage.");
    return null;
  }

  const employeeArray = JSON.parse(employeeData); 

  const employee = employeeArray.find((emp) => emp.id === Id);
  console.log(employee);
  setFormData(employee)
  return employee;
    } else if (preferenseType === "Database") {
      try {
        let response = await fetch(`https://testbackend-4vdh.onrender.com/GetEmployee/${Id}`)
        let data = await response.json();
        setFormData(data.data);
      } catch (error) {
        console.log(error);
      }
    } 
  
};

const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEditedForm = async(e) => {
    try {
      if (preferenseType === "Local") {
         e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('employees')) || [];

    const updatedList = existing.some((emp) => emp.id === formData.id)
      ? existing.map((emp) => (emp.id === formData.id ? formData : emp))
      : [...existing, formData];

    localStorage.setItem('employees', JSON.stringify(updatedList));
    alert('Employee data saved!');
      } else if (preferenseType === "Database") {
        e.preventDefault();
        try {
          const response = await axios.put(
            `https://testbackend-4vdh.onrender.com/updateEmployeeDetails/${formData._id}`,
            formData
          );
          console.log('Item updated:', response.data);
          alert("Updated Successfully")
          // Optionally, redirect or update the item list
        } catch (error) {
          console.error('Error updating item:', error);
        }
      } 
    } catch (error) {
      
    }
   
  };
const handleEditSkillChange = (index, e) => {
  const { name, value } = e.target;
  const updatedSkills = [...formData.Skills];
  updatedSkills[index][name] = value;
  setFormData({ ...formData, Skills: updatedSkills });
};

const addEditSkill = () => {
  setFormData({
    ...formData,
    Skills: [...formData.Skills, { Technologies: '', level: '' }]
  });
};

const removeEditSkill = (index) => {
  const updatedSkills = formData.Skills.filter((_, i) => i !== index);
  setFormData({ ...formData, Skills: updatedSkills });
};

const deleteItem = ()=>{
    localStorage.removeItem("employees");
    alert("Deleted")
    window.location.reload();
}
const handleSoftDelete = async (id)=>{
  console.log(idToDelete);
        try {
          const Status = "Inactive"
          const response = await axios.put(`https://testbackend-4vdh.onrender.com/softDelete/${id}`,Status);
          console.log('Item updated:', response.data);
          alert("Updated Successfully")
          // Optionally, redirect or update the item list
        } catch (error) {
          console.error('Error updating item:', error);
        }
      } 

const handleDeleteEmployee = async (id) => {
    try{
        const res = await axios.delete(`https://testbackend-4vdh.onrender.com/deleteEmployee/${id}`);
        if(res.data.success){
            alert(res.data.msg);
            window.location.reload();
        }
    }
    catch(err){
        console.error(err);
    }
}
const handleCheckboxChange = (event, itemId) => {
           if (event.target.checked) {
               setSelectedItems([...selectedItems, itemId]);
           } else {
               setSelectedItems(selectedItems.filter(id => id !== itemId));
           }
       };

const handleDeleteSelected = async () => {
           try {
               const response = await fetch('https://testbackend-4vdh.onrender.com/deleteSelected', {
                   method: 'DELETE',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ ids: selectedItems })
               });

               if (response.ok) {
                   setLocalEmployeesData(localEmployeesData.filter(item => !selectedItems.includes(item._id)));
                   setSelectedItems([]);
               } else {
                   console.error("Error deleting items");
               }
           } catch (error) {
               console.error("Error deleting items:", error);
           }
       };
const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://testbackend-4vdh.onrender.com/api/search?term=${searchTerm}`);
      const data = await response.json();
      console.log(data)
      setLocalEmployeesData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


 return(
    <div>
    <center>
      <h4>Sample Data Table</h4>
     <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
        <select style={{marginLeft:"20px"}} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
    <option value="">None</option>
    <option value="firstName">Name</option>
    <option value="department">Department</option>
    <option value="dateHired">Date-Hired</option>
        <option value="salary">Salary</option>


  </select>
<h4>Count of Employees = {data.length}</h4>
          <Table responsive> 
        <thead>
            <tr>
                <th>id</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date Hired</th>
                <th>Salary</th>
            </tr>
        </thead>
        {filteredAndSortedData().map((item, index) => (
         
                 <tbody>
                  <tr>
                    <td>{item.id}</td>
                     <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                       <td>{item.department}</td>
                        <td>{item.position}</td>
                         <td>{item.status}</td>
                         <td>{item.dateHired}</td>
                         <td>{item.salary}</td>
                  </tr>
        </tbody>
            
        ))}
       {/* {

        filteredData.map((item,index)=>{
            
        })
       } */}
      </Table> <hr/>
       <Button variant="success" onClick={()=>{setShowPermissionModal(true)}}>
        ADD Employee
      </Button>
       <Button variant="warning" onClick={()=>{setShowGetPermissionModal(true)}}>
        Get Employees Data
      </Button>
    </center>

    <center>
      <h3 style={{marginTop:"20px"}}> Data From :-{preferenseType}</h3>
      <Button variant='danger' onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>Delete Selected</Button> <br></br>
     
      <input disabled={preferenseType === "Local"} style={{marginTop:"10px"}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
       <Button disabled={preferenseType === "Local"} variant='info' onClick={handleSearch}>Search</Button>
      
         <Table responsive bordered>
        <thead>
            <tr>
              
              <th>#</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date Hired</th>
                <th>Salary</th>
                <th style={{textAlign:"center"}} colSpan={2}>Actions</th>
            </tr>
        </thead>
         <tbody>
        {
           localEmployeesData && localEmployeesData.map((item,index)=>{
                return(
                   
                        <tr key={index}>
                          {
                                  preferenseType === "Database" ?   <td>
                            <input
                           type="checkbox"
                           checked={selectedItems.includes(item._id)}
                           onChange={(event) => handleCheckboxChange(event, item._id)}
                       />
                          </td>: <td></td>
                                }
                         
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.department}</td>
                            <td>{item.position}</td>
                            <td>{item.status}</td>
                            <td>{item.dateHired}</td>
                            <td>{item.salary}</td>
                            <td onClick={()=>{
                                handleShowEditModal();
                                {
                                  preferenseType === "Local" ?  getParticularEmployeeData(item.id): getParticularEmployeeData(item._id);
                                }
                            }} onMouseMove={(e)=>{
                                e.target.style.color = "gray"
                            }}
                            onMouseOut={(e)=>{
                                e.target.style.color = "blue"
                            }}  style={{fontWeight:"bold",color:"blue"}}>Edit</td>
                            <td onClick={()=>{
                              {
                                  preferenseType === "Local" ?  deleteItem(index):setShowDeleteModal(true) ;
                                }
                                setIdToDelete(item._id)
                                
                            }} onMouseMove={(e)=>{
                                e.target.style.color = "gray"
                            }}
                            onMouseOut={(e)=>{
                                e.target.style.color = "indianred"
                            }}   style={{fontWeight:"bold",color:"indianred"}}>Delete</td>
                        </tr>
                    
                )
            })
        }
        </tbody>
      </Table>
    </center>

{/* Modal for Asking Permission */}
<Modal size='sm' show={showPermissionModal} onHide={()=>{setShowPermissionModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Select your preference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <CardGroup>
      <Card onClick={()=>{{setPreferenceType("Local");setShowCreateEmployeeModal(true)}}}  onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightblue"
      }} id='localcard'>
        <Card.Body>
          <Card.Title>Add to Local</Card.Title>
         
        </Card.Body>
       
      </Card>
      <Card onClick={()=>{{setPreferenceType("Database");setShowCreateEmployeeModal(true)}}} onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightgreen"
      }} id='dbcard'>
        <Card.Body>
          <Card.Title>Add to Database</Card.Title>
        
        </Card.Body>
       
      </Card>
      </CardGroup>
        </Modal.Body>
      </Modal>

      {/* Getting permission Modal */}
      <Modal size='sm' show={showgGetPermissionModal} onHide={()=>{setShowGetPermissionModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Select your preference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <CardGroup>
      <Card onClick={()=>{{setPreferenceType("Local");getAddedEmployeesData();}}}  onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightblue"
      }} id='localcard'>
        <Card.Body>
          <Card.Title>Get from Local</Card.Title>
         
        </Card.Body>
       
      </Card>
      <Card onClick={()=>{{setPreferenceType("Database");getAddedEmployeesData()}}} onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightgreen"
      }} id='dbcard'>
        <Card.Body>
          <Card.Title>Get from Database</Card.Title>
        
        </Card.Body>
       
      </Card>
      </CardGroup>
        </Modal.Body>
      </Modal>
      {/* Permanent delete/Soft Delete */}
       <Modal  size='sm' show={showDeleteModal} onHide={()=>{setShowDeleteModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Select your preference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <CardGroup>
      <Card onClick={()=>{
        handleSoftDelete(idToDelete);
      }}   onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightblue"
      }} id='localcard'>
        <Card.Body>
          <Card.Title>Soft Delete</Card.Title>
         
        </Card.Body>
       
      </Card>
      <Card onClick={()=>{ handleDeleteEmployee(idToDelete)}}  onMouseMove={(e)=>{
        e.target.style.backgroundColor = "lightgray"
      }}
      onMouseOut={(e)=>{
        e.target.style.backgroundColor = "lightgreen"
      }} id='dbcard'>
        <Card.Body>
          <Card.Title>Hard Delete</Card.Title>
        
        </Card.Body>
       
      </Card>
      </CardGroup>
        </Modal.Body>
      </Modal>
{/* Adding Employee Modal */}
    <Modal  scrollable  show={showCreateEmployeeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee to {preferenseType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <center>

<Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
  <Form.Group className="mb-3">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="First Name" name="firstName" value={employeeData.firstName} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Last Name" name="lastName" value={employeeData.lastName} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Email" name="email" value={employeeData.email} onChange={handleChange} required />
  </Form.Group>
  <h6 ref={emailSpanRef}></h6>

  <Form.Group className="mb-3">
    <Form.Label>Department</Form.Label>
    <Form.Control type="text" placeholder="Department" name="department" value={employeeData.department} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Salary</Form.Label>
    <Form.Control type="text" placeholder="Salary" name="salary" value={employeeData.salary} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="text" placeholder="Phone" name="phone" value={employeeData.phone} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Position</Form.Label>
    <Form.Control type="text" placeholder="Position" name="position" value={employeeData.position} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Date Hired</Form.Label>
    <Form.Control type="date" placeholder="Date Hired" name="dateHired" value={employeeData.dateHired} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Employment Type</Form.Label>
    <Form.Control type="text" placeholder="Employment Type" name="employmentType" value={employeeData.employmentType} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Status</Form.Label>
    <Form.Control type="text" placeholder="Status" name="status" value={employeeData.status} onChange={handleChange} required />
  </Form.Group>
  <h6 className="mt-4">Skills</h6>
  {employeeData.Skills.map((skill, index) => (
    <Row key={index} className="mb-2">
      <Col md={5}>
        <Form.Control
          type="text"
          placeholder="Technology"
          name="Technologies"
          value={skill.Technologies}
          onChange={(e) => handleSkillChange(index, e)}
          required
        />
      </Col>
      <Col md={5}>
        <Form.Control
          type="text"
          placeholder="Level (e.g., Beginner, Intermediate)"
          name="level"
          value={skill.level}
          onChange={(e) => handleSkillChange(index, e)}
          required
        />
      </Col>
      <Col md={2}>
        <Button variant="danger" onClick={() => removeSkill(index)}>X</Button>
      </Col>
    </Row>
  ))}

  <Button variant="primary" onClick={addSkill} className="mb-3">+ Add Skill</Button>


  <h6 className="mt-4">Address Information</h6>

  <Form.Group className="mb-3">
    <Form.Label>Street</Form.Label>
    <Form.Control type="text" placeholder="Street" name="street" value={employeeData.street} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>City</Form.Label>
    <Form.Control type="text" placeholder="City" name="city" value={employeeData.city} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>State</Form.Label>
    <Form.Control type="text" placeholder="State" name="state" value={employeeData.state} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Zip Code</Form.Label>
    <Form.Control type="text" placeholder="Zip Code" name="zipCode" value={employeeData.zipCode} onChange={handleChange} required />
  </Form.Group>

  <h6 className="mt-4">Emergency Contact</h6>

  <Form.Group className="mb-3">
    <Form.Label>Contact Name</Form.Label>
    <Form.Control type="text" placeholder="Emergency Contact Name" name="emergencyContactname" value={employeeData.emergencyContactname} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Contact Phone</Form.Label>
    <Form.Control type="text" placeholder="Emergency Contact Phone" name="emergencyContactphone" value={employeeData.emergencyContactphone} onChange={handleChange} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Relationship</Form.Label>
    <Form.Control type="text" placeholder="Emergency Contact Relationship" name="emergencyContactrelationship" value={employeeData.emergencyContactrelationship} onChange={handleChange} required />
  </Form.Group>

  <div className="text-center">
    <Button variant="success" type="submit" className="mt-2">Save Employee</Button>
  </div>
</Form>

             </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

{/* Editing Employee Modal */}
 <Modal size='lg' show={showEditEmployeeModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmitEditedForm} className="p-3 border rounded bg-light">
      <h4 className="text-center mb-3">Employee Form</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" value={formData.firstName} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" value={formData.lastName} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Control name="department" value={formData.department} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Position</Form.Label>
            <Form.Control name="position" value={formData.position} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Date Hired</Form.Label>
            <Form.Control type="date" name="dateHired" value={formData.dateHired} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Salary</Form.Label>
            <Form.Control type="number" name="salary" value={formData.salary} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Employment Type</Form.Label>
            <Form.Control name="employmentType" value={formData.employmentType} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>Status</Form.Label>
        <Form.Control name="status" value={formData.status} onChange={handleEditChange} />
      </Form.Group>
      <h5 className="mt-3">Skills</h5>
{formData.Skills.map((skill, index) => (
  <Row className="mb-2" key={index}>
    <Col md={5}>
      <Form.Control
        type="text"
        placeholder="Technology"
        name="Technologies"
        value={skill.Technologies}
        onChange={(e) => handleEditSkillChange(index, e)}
        required
      />
    </Col>
    <Col md={5}>
      <Form.Control
        type="text"
        placeholder="Level"
        name="level"
        value={skill.level}
        onChange={(e) => handleEditSkillChange(index, e)}
        required
      />
    </Col>
    <Col md={2}>
      <Button variant="danger" onClick={() => removeEditSkill(index)}>Remove</Button>
    </Col>
  </Row>
))}

<Button variant="success" onClick={addEditSkill} className="mb-3">+ Add Skill</Button>

      <h5 className="mt-3">Address</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Street</Form.Label>
            <Form.Control name="street" value={formData.street} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" value={formData.city} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>State</Form.Label>
            <Form.Control name="state" value={formData.state} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control name="zipCode" value={formData.zipCode} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <h5 className="mt-3">Emergency Contact</h5>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Contact Name</Form.Label>
            <Form.Control name="emergencyContactname" value={formData.emergencyContactname} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Contact Phone</Form.Label>
            <Form.Control name="emergencyContactphone" value={formData.emergencyContactphone} onChange={handleEditChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Relationship</Form.Label>
            <Form.Control name="emergencyContactrelationship" value={formData.emergencyContactrelationship} onChange={handleEditChange} />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <Button type="submit" variant="primary">Save Employee</Button>
      </div>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

    </div>
  
 );
}
export default Home
