
import { useState, useEffect } from 'react'
import Container from './components/Container'
import ExpensesContainer from './components/expensesContainer'
import LoginForm from './components/loginForm'
import axios from 'axios'


function App () {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [categories, setCategories] = useState([])
    const [expenses, setExpenses] = useState([])

    useEffect(()=>{
        if(userLoggedIn){
            axios.get('http://localhost:3060/api/categories',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{
                setCategories(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
            axios.get('http://localhost:3060/api/expenses',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{
                setExpenses(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            setCategories([])
            setExpenses([])
        }

    },[userLoggedIn])

    const addCategory = (category) => {
        setCategories([...categories, category])
    }

    const removeCategory = (id) => {
        const newArr = categories.filter((ele) => {
            return ele._id != id 
        })
        setCategories(newArr) 
    }

    const addExpense = (expense) => {
        setExpenses([...expenses, expense])
    }

    const removeExpense = (id) => {
        const newArr = expenses.filter((ele) => {
            return ele._id != id 
        })
        setExpenses(newArr)
    }

    const loginSuccess = () => {
        setUserLoggedIn(true) 
    }

    const logoutUser = () => {
        setUserLoggedIn(false)
    }

    return (
        <div>
            <h1>Expense App</h1>
            { userLoggedIn ? (
                <div>
                    <button onClick={logoutUser}>Logout</button>
                    <Container 
                        categories={categories} 
                        addCategory={addCategory}   
                        removeCategory={removeCategory} 
                    />

                    <ExpensesContainer 
                        expenses={expenses}
                        categories={categories}
                        addExpense={addExpense}
                        removeExpense={removeExpense}
                    />
                </div> 
            ) : (
                <div>
                   <LoginForm loginSuccess={loginSuccess} />
                </div> 
            )}

        </div>
    )
}
export default App