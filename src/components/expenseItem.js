import axios from 'axios'
export default function ExpenseItem(props) {
    const getCategoryName = (id) => {
        const category = props.categories.find(ele => ele._id == id) 
        if(category) {
            return category.name 
        } else {
            return '-'
        }
    }

    const handleRemove = () => {
        const confirmation = window.confirm("Are you sure?")
        if(confirmation) {
            axios.delete(`http://localhost:3060/api/expenses/${props.expense._id}`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data 
                    props.removeExpense(result._id)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <tr>
            <td> { props.expense.expenseDate } </td>
            <td> { props.expense.amount } </td> 
            <td> { props.expense.description } </td> 
            <td> { getCategoryName(props.expense.categoryId) } </td> 
            <td>
                <button onClick={handleRemove}>remove</button>
            </td>
        </tr>
    )
}
