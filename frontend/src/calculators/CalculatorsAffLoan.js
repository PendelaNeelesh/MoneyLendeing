import React, { useState } from 'react'
import "../css/cal_emi.css"
const CalculatorsAffLoan = () => {
    const [princ2, setprinc2] = useState("")
    const [tintt2, settintt2] = useState("")
    const [gt2, setgt2] = useState("")
    const principal = () => {
        console.log("Affordableloan")
        if (
            document.getElementById("emi2").value === null ||
            document.getElementById("emi2").value.length === 0 ||
            document.getElementById("months2").value === null ||
            document.getElementById("months2").value.length === 0 ||
            document.getElementById("rate2").value === null ||
            document.getElementById("rate2").value.length === 0
        ) {
            document.getElementById("princ2").value = "Data Reqd.";
        } else {
            var emi = document.getElementById("emi2").value;
            // var princ = document.getElementById("princ2").value;
            var term = document.getElementById("months2").value;
            var intr = document.getElementById("rate2").value / 1200;
            setprinc2(Math.round(
                (emi * (1 - Math.pow(1 / (1 + intr), term))) / intr
            ));
            setgt2(Math.round(
                document.getElementById("emi2").value *
                document.getElementById("months2").value
            ))
            settintt2(Math.round(
                document.getElementById("gt2").value * 1 -
                document.getElementById("princ2").value * 1
            ));
        }
    }
    return (
        <div id="outer-affloan">
            <div className="ac b">Affordable Loan Calculator</div>
            <div id="cover">
                <form>
                    <table className="main">
                        <colgroup><col className="w50" />
                            <col className="w50" />
                        </colgroup><tbody><tr>
                            <td>Affordable EMI</td>
                            <td>
                                <input id="emi2" />
                            </td></tr><tr>
                                <td>Repayment in months</td>
                                <td>
                                    <input id="months2" />
                                </td></tr><tr>
                                <td>Interest Rate</td>
                                <td>
                                    <input id="rate2" />
                                </td></tr><tr>
                                <td><button className="cal-sub-btn" type="reset">Reset</button></td>
                                <td>
                                    <button className="cal-sub-btn" type="button" onClick={principal}>
                                        Submit
                                    </button>
                                </td></tr><tr>
                                <td>Affordable Loan</td>
                                <td>
                                    <input id="princ2" value={princ2} />
                                </td></tr><tr>
                                <td>Interest payable</td>
                                <td>
                                    <input id="tintt2" value={tintt2} />
                                </td></tr><tr>
                                <td>Total payable</td>
                                <td><input id="gt2" value={gt2} /></td>
                            </tr>
                        </tbody></table>
                </form>
            </div>
        </div>
    )
}

export default CalculatorsAffLoan
