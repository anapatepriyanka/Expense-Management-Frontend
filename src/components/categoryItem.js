import axios from 'axios'
export default function CategoryItem(props){
    const handleRemove=()=>{
        const confirmation=window.confirm('Are you sure?')
        if(confirmation){
            axios.delete(`http://localhost:3060/api/categories/${props.id}`,{
        
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{
                const result=response.data
                props.removeCategory(result._id)
            })
            .catch((err)=>{
                console.log(err)

            })

        }
    }
    return <li> { props.name }
    <button onClick={handleRemove}>remove</button>
 </li>
}
