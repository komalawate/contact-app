import React from "react";


 class EditContact extends React.Component
 {
   constructor(props){
    super(props)
    const {id,name,email}=props.location.state.contact;
    this.state={
        id,
        name,
        email,
    }
   }

    update=(e)=>{
        e.preventDefault();
        if(this.state.name==="" && this.state.email==="")
        {
            alert("All feilds are mandatory!");
        }
        else
        {
        this.props.updateContactHandler(this.state);
        this.setState({name:"",email:""});  
        this.props.history.push("/");          
        //console.log(this.state);
        }
    }
    render(){
        return(
            <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={this.update}>
                <div className="feild">
                    <label>Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>
                <div className="feild">
                    <label>Email</label> 
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e)=>this.setState({email:e.target.value})}/>
                </div>
                <button className="ui button blue">Update</button>
            </form>
            </div>
        );
        }
    }
 export default EditContact;