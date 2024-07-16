export default function ProductBox({_id,title,description,price,images}){
    return(
        <div className="ProductBox">
            <img className="ProductBoxImage" src={images[0]} alt="" />
            {title}
        </div>
    )
} 