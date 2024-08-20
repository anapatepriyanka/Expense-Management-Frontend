import { useState } from 'react' 
import axios from 'axios'
// import isEmpty from 'lodash/isEmpty'

const errorStyle = {
    color: 'red'
}

export default function ExpenseForm(props) {
    const [expenseDate, setExpenseDate] = useState('') 
    const [amount, setAmount] = useState('') 
    const [description, setDescription] = useState('') 
    const [categoryid, setCategoryid] = useState('')

    const [formErrors, setFormErrors] = useState({}) 
    const errors = {}

    const validateErrors = () => {
        if(expenseDate.trim().length === 0) {
            errors.expenseDate = 'Date is required'
        } else if(new Date(expenseDate) > new Date()) {
            errors.expenseDate = 'Date cannot be greater than today\'s date'
        }

        if(amount.trim().length === 0) {
            errors.amount = 'Amount is required'
        } 

        if(description.trim().length === 0) {
            errors.description = 'Description is required'
        }

        if(categoryid.trim().length === 0) {
            errors.categoryid = 'Category a required'
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        // es6 concise property
        const formData = {
            expenseDate,
            amount,
            description, 
            categoryid 
        }
        validateErrors() 

        if(Object.keys(errors).length === 0) {
            axios.post('http://localhost:3060/api/expenses', formData,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response) => {
                const result = response.data 
                props.addExpense(result)
                setFormErrors({})
                setExpenseDate('')
                setAmount('')
                setDescription('')
                setCategoryid('')
            })
            .catch((err) => {
                console.log(err) 
            })
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="expDate">Expense Date</label> 
                <input 
                    type="date" 
                    value={expenseDate} 
                    onChange={(e) => { setExpenseDate(e.target.value) }}
                    id="expDate" 
                />
                { formErrors.expenseDate && <span style={errorStyle}>{ formErrors.expenseDate }</span>}
                <br /> 

                <label htmlFor="amount">Amount</label>
                <input 
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value) }}
                    id="amount"
                /> 
                { formErrors.amount && <span style={errorStyle}>{ formErrors.amount }</span>}
                <br /> 

                <label htmlFor="category">Category</label> 
                <select 
                    value={categoryid} 
                    onChange={(e) => { setCategoryid(e.target.value)}} 
                    id="category"
                >
                    <option value="">Select Category</option>
                    { props.categories.map((cat) => {
                        return <option 
                                    key={cat._id}
                                    value={cat._id}
                                > { cat.name } </option>
                    })}
                </select> 
                { formErrors.categoryid && <span style={errorStyle}>{ formErrors.categoryid }</span>}
                <br/>

                <label htmlFor="description">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    id="description"
                >
                </textarea> 
                { formErrors.description && <span style={errorStyle}>{ formErrors.description }</span>}
                <br />

                <input type="submit" /> 
            </form>
        </div>
    )
}    


// import CategoryItem from "./CategoryItem"

// export default function CategoriesList(props) {
//     return (
//         <ul>
//             { props.categories.map((ele) => {
//                 return <CategoryItem 
//                             removeCategory={props.removeCategory}
//                             key={ele._id} 
//                             name={ele.name}
//                             id={ele._id}
//                         /> 
//             })}
//         </ul>
//     )
// }

//  57 changes: 57 additions & 0 deletions57  
// src/components/CategoryForm.js
// @@ -0,0 +1,57 @@
// import { useState } from 'react' 
// import axios from 'axios' 

// export default function CategoryForm(props) {
//     const [name,setName] = useState('') 
//     const [formErrors, setFormErrors] = useState({})
//     const errors = {}

//     const validateErrors = () => {
//         if(name.trim().length === 0) {
//             errors.name = 'name is required'
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const formData = {
//             name: name
//         }
//         validateErrors()

//         if(Object.keys(errors).length === 0) {
//             axios.post('http://localhost:3050/api/categories', formData) 
//                 .then((response) => {
//                     const result = response.data 
//                     props.addCategory(result) 
//                     setFormErrors({})
//                     setName('')
//                 })
//                 .catch((err) => {
//                     alert(err.message) 
//                 })
//         } else {
//             setFormErrors(errors)
//         }
//     }

//     return (
//         <div>
//             <h2>Add Category</h2>
//             <form onSubmit={handleSubmit}>
//                 <label
//                     htmlFor='name'
//                 > Enter Name </label>
//                 <input 
//                     type="text"
//                     value={name}
//                     onChange={(e) => { setName(e.target.value) }}
//                     id="name"
//                 /> 
//                 { formErrors.name && <span style={{ color: 'red'}}> { formErrors.name } </span> }
//                 <br />
//                 <input type="submit" /> 
//             </form>
//         </div>
//     )
// }
//  20 changes: 20 additions & 0 deletions20  
// src/components/CategoryItem.js
// @@ -0,0 +1,20 @@
// import axios from 'axios'
// import { url } from '../config'
// export default function CategoryItem(props) {
//     const handleRemove = () => {
//         const confirmation = window.confirm("Are you sure?")
//         if(confirmation) {
//             axios.delete(`${url}/api/categories/${props.id}`)
//             .then((response) => {
//                 const result = response.data 
//                 props.removeCategory(result._id)
//             })
//             .catch((err) => {
//                 alert(err.message)
//             })
//         }
//     }
//     return <li> { props.name }
//         <button onClick={handleRemove}>remove</button>
//      </li>
// }
//  124 changes: 124 additions & 0 deletions124  
// src/components/ExpenseForm.js
// @@ -0,0 +1,124 @@
// import { useState } from 'react' 
// import axios from 'axios'
// import isEmpty from 'lodash/isEmpty'

// const errorStyle = {
//     color: 'red'
// }

// export default function ExpenseForm(props) {
//     const [expenseDate, setExpenseDate] = useState('') 
//     const [amount, setAmount] = useState('') 
//     const [description, setDescription] = useState('') 
//     const [categoryId, setCategoryId] = useState('')

//     const [formErrors, setFormErrors] = useState({}) 
//     const errors = {}

//     const validateErrors = () => {
//         if(expenseDate.trim().length === 0) {
//             errors.expenseDate = 'Date is required'
//         } else if(new Date(expenseDate) > new Date()) {
//             errors.expenseDate = 'Date cannot be greater than today\'s date'
//         }

//         if(amount.trim().length === 0) {
//             errors.amount = 'Amount is required'
//         } 

//         if(description.trim().length === 0) {
//             errors.description = 'Description is required'
//         }

//         if(categoryId.trim().length === 0) {
//             errors.categoryId = 'Category a required'
//         }
//     }

//     const handleSubmit = (e) =>{
//         e.preventDefault()
//         // es6 concise property
//         const formData = {
//             expenseDate,
//             amount,
//             description, 
//             categoryId 
//         }
//         validateErrors() 

//         if(isEmpty(errors)) {
//             axios.post('http://localhost:3050/api/expenses', formData)
//             .then((response) => {
//                 const result = response.data 
//                 props.addExpense(result)
//                 setFormErrors({})
//                 setExpenseDate('')
//                 setAmount('')
//                 setDescription('')
//                 setCategoryId('')
//             })
//             .catch((err) => {
//                 console.log(err.message) 
//             })
//         } else {
//             setFormErrors(errors)
//         }
//     }

//     return (
//         <div>
//             <h2>Add Expense</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="expDate">Expense Date</label> 
//                 <input 
//                     type="date" 
//                     value={expenseDate} 
//                     onChange={(e) => { setExpenseDate(e.target.value) }}
//                     id="expDate" 
//                 />
//                 { formErrors.expenseDate && <span style={errorStyle}>{ formErrors.expenseDate }</span>}
//                 <br /> 

//                 <label htmlFor="amount">Amount</label>
//                 <input 
//                     type="number"
//                     min="1"
//                     value={amount}
//                     onChange={(e) => { setAmount(e.target.value) }}
//                     id="amount"
//                 /> 
//                 { formErrors.amount && <span style={errorStyle}>{ formErrors.amount }</span>}
//                 <br /> 

//                 <label htmlFor="category">Category</label> 
//                 <select 
//                     value={categoryId} 
//                     onChange={(e) => { setCategoryId(e.target.value)}} 
//                     id="category"
//                 >
//                     <option value="">Select Category</option>
//                     { props.categories.map((cat) => {
//                         return <option 
//                                     key={cat._id}
//                                     value={cat._id}
//                                 > { cat.name } </option>
//                     })}
//                 </select> 
//                 { formErrors.categoryId && <span style={errorStyle}>{ formErrors.categoryId }</span>}
//                 <br/>

//                 <label htmlFor="description">Description</label>
//                 <textarea
//                     value={description}
//                     onChange={(e) => { setDescription(e.target.value) }}
//                     id="description"
//                 >
//                 </textarea> 
//                 { formErrors.description && <span style={errorStyle}>{ formErrors.description }</span>}
//                 <br />

//                 <input type="submit" /> 
//             </form>
//         </div>
//     )
// }