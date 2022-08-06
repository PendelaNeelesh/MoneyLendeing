import React from 'react'
import "../css/cal_emi.css"
const CalculatorsEmi = () => {
    function emi() {
        if (
            document.getElementById("loan1").value === null ||
            document.getElementById("loan1").value.length === 0 ||
            document.getElementById("months1").value === null ||
            document.getElementById("months1").value.length === 0 ||
            document.getElementById("rate1").value === null ||
            document.getElementById("rate1").value.length === 0
        ) {
            document.getElementById("pay1").value = "Data Reqd.";
        } else {
            // var pay1 = "";
            var princ1 = document.getElementById("loan1").value;
            var term1 = document.getElementById("months1").value;
            var intr1 = document.getElementById("rate1").value / 1200;
            document.getElementById("pay1").value =
                Math.round(
                    ((princ1 * intr1) / (1 - Math.pow(1 / (1 + intr1), term1))) * 100
                ) / 100;
            document.getElementById("gt1").value =
                Math.round(
                    document.getElementById("pay1").value *
                    document.getElementById("months1").value *
                    100
                ) / 100;
            document.getElementById("tintt1").value =
                Math.round(
                    (document.getElementById("gt1").value * 1 -
                        document.getElementById("loan1").value * 1) *
                    100
                ) / 100;
        }
    }
    return (
        <div>
            <div id="outer-emi">
                <div className="ac b">EMI Calculator</div>
                <div id="cover">
                    <form>
                        <table className="main">
                            <colgroup><col className="w50" />
                                <col className="w50" />
                            </colgroup><tbody><tr>
                                <td>Loan Amount</td>
                                <td>
                                    <input id="loan1" />
                                </td></tr><tr>
                                    <td>Repayment in months</td>
                                    <td>
                                        <input id="months1" />
                                    </td></tr><tr>
                                    <td>Interest Rate</td>
                                    <td>
                                        <input id="rate1" />
                                    </td></tr><tr>
                                    <td><button className="cal-sub-btn" type="reset">Reset</button></td>
                                    <td>
                                        <button className="cal-sub-btn" type="button" onClick={emi}>
                                            Submit
                                        </button>
                                    </td></tr><tr>
                                    <td>EMI</td>
                                    <td>
                                        <input id="pay1" />
                                    </td></tr><tr>
                                    <td>Interest payable</td>
                                    <td>
                                        <input id="tintt1" />
                                    </td></tr><tr>
                                    <td>Total payable</td>
                                    <td><input id="gt1" /></td>
                                </tr>
                            </tbody></table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CalculatorsEmi
