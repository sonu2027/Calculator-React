import "./Input.css"
function Input(props){
    return (
        <div className="input-div">
        <input placeholder="0" value={props.val} onChange={props.change} type="text"/>
        </div>
    )
}
export default Input