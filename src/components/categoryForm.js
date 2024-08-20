import {useState} from 'react'
import axios from 'axios'
export default function CategoryForm(props){
    const[name,setName]=useState('')
    const[formErrors,setFormErrors]=useState({})
    const errors={}

    const validateErrors=()=>{
        if(name.trim().length===0){
            errors.name = 'name is required'
            //console.log(name)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name : name
        }

        validateErrors()

        if(Object.keys(errors).length===0){ //if(_.isEmpty(errors))
            axios.post('http://localhost:3060/api/categories', formData,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
         
            })
            .then((response)=>{
                const result=(response.data)
                props.addCategory(result)
                setFormErrors({})
                setName('')
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            setFormErrors(errors)
        }
    
        

    }
    return( 
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Enter Name</label>
            <input type='text' value={name} 
            onChange={(e)=>{setName(e.target.value)}}
            id='name'
            /><br/>
            {formErrors.name && <span style={{color:'red'}}>{formErrors.name}</span>}
            <br/>
            <input type='submit'/>
            </form>

        </div>
    )

}