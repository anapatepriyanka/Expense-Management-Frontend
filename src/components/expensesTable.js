import ExpenseItem from "./expenseItem"
export default function ExpensesTable(props) {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.expenses.map((ele) => {
                    return (
                        <ExpenseItem 
                            key={ele._id}
                            expense={ele}
                            categories={props.categories}
                            removeExpense={props.removeExpense}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

// import "./styles.css";
// import { useReducer } from "react";
// import Container from "./Container";
// import TaskContext from "./TaskContext";

// // Assuming taskReducer is defined somewhere in your code
// const taskReducer = (state, action) => {
//   // Your reducer logic here
// };

// export default function App() {
//   const initialState = {
//     data: [],
//     search: "",
//     errors: "",
//   };
//   const [state, taskDispatch] = useReducer(taskReducer, initialState);
//   return (
//     <div>
//       <Container />
//     </div>
//   );
// }
