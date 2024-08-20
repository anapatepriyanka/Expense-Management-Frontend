// import {useState} from 'react'
// function Categories(){
//     const [categories,setCategories]=useState([])
//     const [name,setName]=useState('')
    
//     const handleRemove=(obj)=>{
//         const Confirmation=window.confirm(`are you sure want to delete ${obj.name}`)
//         if(Confirmation){
//             const newArr=categories.filter((ele)=>{
//                 return ele._id!==obj._id
//             })
//             setCategories(newArr)
//         }
//     }

//     // const handleAdd=()=>{
//     //     const name=window.prompt("Enter category name")
//     //     if(name){
//     //         const category={
//     //             _id:Number(new Date()),
//     //             name:name

//     //         }
//     //         const newArr=[...categories]
//     //         newArr.push(category)
//     //         setCategories(newArr)
//     //     }
//     // }

//     const handleEdit=(obj)=>{
//         const input=window.prompt(`update category name for ${obj.name}`)
//         if(input.trim()){
//             const newArr=categories.map((category)=>{
//                 if(category._id===obj._id){
//                     category.name=input
//                     return category
//                 }else{
//                     return category
//                 }
//             })
//             setCategories(newArr)
//         }
//     }

//     const handleSubmit = (e) => { 
//         e.preventDefault() 
//         const category = {
//             _id: Number(new Date()),
//             name: name 
//         }

//         // client side form validation
//         // send the data to server
//         // if success then add to state
//         // else display server errors 
       
//         const newArr = [...categories]
//         newArr.push(category) 
//         setCategories(newArr)

//         // setCategories([...categories, category])
//         // reset name input field
//         setName('')
//     }
//     return(
           
//         <div>
//             {categories.length===0?<p>No categories found.Add your first category</p>:(
//             <div><h2>listingCategories-{categories.length}</h2>
//             <ul>

        
//                 {categories.map((category)=>{

//                     return<li key={category._id}>{category.name}
//                     <button onClick={()=>{
//                         handleEdit(category)

//                     }}>edit</button>
//                     <button onClick={()=>{
//                         handleRemove(category)

//                     }}>remove</button>
//                     </li>
//                 })}
//             </ul>
//             </div>)}
            
//             {/* //<button onClick={handleAdd}>Add category</button> */}
//             <h2>Add Category</h2> 
//             <form onSubmit={handleSubmit}>
//                 <label>Enter name</label> <br />
//                 <input 
//                     type="text" 
//                     value={name} 
//                     onChange={(e) => { setName(e.target.value) }}
//                 /><br />
//                 <input type="submit" />
//             </form>
    
    

//         </div>
//     )
// }

// // function Categories(){
// //     return(
// //         <div>
// //             <h2>Listing categories</h2>
// //         </div>
// //     )
// // }
// export default Categories