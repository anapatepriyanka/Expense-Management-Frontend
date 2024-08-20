import { useState } from 'react'
import ExpensesTable from "./expensesTable"
import ExpenseForm from "./expenseForm"
export default function ExpensesContainer(props){
    const [ search, setSearch ] = useState('')

    const calcTotal = () => {
        const total = filterExpenses().reduce((acc,cv) => {
            return acc + parseInt(cv.amount)
        }, 0)
        return total 
    }

    const filterExpenses = () => {
        return props.expenses.filter((ele) => { 
            return ele.description.toLowerCase().includes(search.toLowerCase())
        })
    }

    return (
        <div>
            <h2>Listing Expenses - { filterExpenses().length }</h2>
            <input 
                type="text" 
                placeholder="search..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value )}}
            />

            <ExpensesTable 
                expenses={filterExpenses()} 
                categories={props.categories}
                removeExpense={props.removeExpense}
            />
            <h2>Total Expenses - { calcTotal() }</h2>            \
            <ExpenseForm 
                categories={props.categories } 
                addExpense={props.addExpense}    
            />
        </div>
    )
}