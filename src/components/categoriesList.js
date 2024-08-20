
import CategoryItem from "./categoryItem"
export default function CategoriesList(props){
    return (
        <div> 
        {
            props.categories.map( ele =>{
              return  <CategoryItem 
                                    removeCategory={props.removeCategory}
                                    key={ele._id}
                                    name={ele.name}
                                    id={ele._id}/>
            })
         } 
   
    </div> 
    )
}