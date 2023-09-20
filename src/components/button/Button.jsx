import "./Button.css"
import { BsArrowLeft } from "react-icons/bs"
import { PiEqualsBold } from "react-icons/pi"
import { AiOutlinePlus } from "react-icons/ai"
import { GrFormSubtract } from "react-icons/gr"
import { LiaTimesSolid } from "react-icons/lia"
import { BsSlashLg } from "react-icons/bs"
import { TbMath } from "react-icons/tb"
function Button(props) {
    return (
        <div className="button-box">
            <div className="button">
                <button onClick={()=>props.click("AC")} className="box">AC</button>
                <button onClick={()=>props.click("√")} className="box"><TbMath/></button>
                <button onClick={()=>props.click("^")} className="box">x<sup>y</sup></button>
                <button onClick={()=>props.click("/")} className="box"><BsSlashLg/></button>

                <button onClick={()=>props.click(7)} className="box">7</button>
                <button onClick={()=>props.click(8)} className="box">8</button>
                <button onClick={()=>props.click(9)} className="box">9</button>
                <button onClick={()=>props.click("*")} className="box"><LiaTimesSolid/></button>

                <button onClick={()=>props.click(4)} className="box">4</button>
                <button onClick={()=>props.click(5)} className="box">5</button>
                <button onClick={()=>props.click(6)} className="box">6</button>
                <button onClick={()=>props.click("-")} className="box"><GrFormSubtract/></button>

                <button onClick={()=>props.click(1)} className="box">1</button>
                <button onClick={()=>props.click(2)} className="box">2</button>
                <button onClick={()=>props.click(3)} className="box">3</button>
                <button onClick={()=>props.click("+")} className="box"><AiOutlinePlus/></button>

                <button onClick={()=>props.click("back")}  className="box"><BsArrowLeft /></button>
                <button onClick={()=>props.click(0)} className="box">0</button>
                <button onClick={()=>props.click(".")} className="box">.</button>
                <button onClick={()=>props.click("=")} className="box"><PiEqualsBold /></button>
            </div>
        </div>
    )
}
export default Button