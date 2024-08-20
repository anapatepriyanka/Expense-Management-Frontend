import CategoriesList from './categoriesList'
import CategoryForm from './categoryForm'
export default function Container(props){
    return (
        <div>
             <h2>List the Categories - {props.categories.length}</h2>
           
             <CategoriesList categories={props.categories} removeCategory={props.removeCategory}/>
             <CategoryForm addCategory={props.addCategory}/>
             
             </div>
    )
} 