import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';
import EditContact  from './EditContact';
import { useState,useEffect } from 'react';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import { v4 as uuid } from "uuid";
import api from "../api/contacts";


function App() {
 //const LOCAL_STORAGE_KEY="contacts";
 const [contacts,setContacts]=useState([]);
 const [searchTerm,setSearchTerm]=useState("");
 const [searchResult,setSearchResult]=useState([]);
 //Retrivecontacts
 const retriveContacts=async ()=>
 {
 
  const response= await api.get("/contacts");
  console.log(response);
  return response.data;
 }
 const addContactHandler= async (contact)=>
 {
 // console.log(contact);
  const request={
    id:uuid(),
    ...contact
  }
  const response= await api.post("/contacts",request);
  console.log(response);
  setContacts([...contacts,response.data]);
 };

 const updateContactHandler= async(contact)=>{
  const response=await api.put(`/contacts/${contact.id}`,contact);
  const {id,name,email}=response.data;
  setContacts(contacts.map(contact=>{
  return contact.id === id ?{...response.data}:contact;
   } ))};


const removeContactHandler= async (id)=>{
  await api.delete(`/contacts/${id}`);
const newContactList=contacts.filter((contact)=>
{
  return contact.id !== id;
})
setContacts(newContactList);
};

const searchHandler=(searchTerm)=>{
setSearchTerm(searchTerm);
if(searchTerm!=="")
{
const newContactList=contacts.filter(contact=>{
  return Object.values(contact)
  .join("")
  .toLowerCase()
  .includes(searchTerm.toLowerCase());
});
setSearchResult(newContactList);
}
else
{
  setSearchResult(contacts);
}
}

 useEffect(()=>{
  const getAllContacts = async () => {
    const allContacts= await retriveContacts();
    if(allContacts) setContacts(allContacts);
  };
  getAllContacts();
},[]); 

useEffect(()=>{
  // if(contacts.length>0)
  // {
  //   //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  // };
  },[contacts]);
     
  return ( 
    <div className='ui container'>
      <Router> 
      <Header/>
        <Switch>
        <Route  path="/" exact
              render={(props)=>(
                <ContactList {...props} contacts={searchTerm.length < 1 ? contacts:searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}/>)}>
        </Route>
        <Route path="/add" 
              render={(props)=>(
              <AddContact {...props} addContactHandler={addContactHandler}/>)}>
        </Route>  
        <Route path="/edit" 
              render={(props)=>(
              <EditContact {...props} updateContactHandler={updateContactHandler}/>)}>
        </Route>    
        <Route path="/contact/:id"
          component={ContactDetail}>
          </Route>      
        </Switch> 
      </Router>
    </div>
  );
} 

export default App;
