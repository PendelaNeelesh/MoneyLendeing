import React from 'react'
import "../css/cal_emi.css"

const CalculatorsIntrest = () => {
    function interest() {
        var principal = document.getElementById("principal").value;
        var rate = document.getElementById("rate").value;
        var time = document.getElementById("time").value;
        var itype = document.getElementById("itype").value;
        var crate = document.getElementById("crate").value;
        var time = document.getElementById("time").value;
        var irate = rate / crate;
        // var inttamt = document.getElementById("inttamt").value;
        // var decimal = 2;
        if (itype === "c") {
            document.getElementById("inttamt").value =
                Math.round(
                    (document.getElementById("principal").value *
                        Math.pow(1 + irate / 100, (time / 12) * crate) *
                        1 -
                        principal * 1) *
                    100
                ) / 100;
        }
        if (itype === "s") {
            document.getElementById("inttamt").value =
                Math.round(
                    ((document.getElementById("principal").value * rate * time) /
                        12 /
                        100) *
                    100
                ) / 100;
        }
    }
    return (
        <div id="outer-intrest">
            <div className="ac b">Interest Calculator</div>
            <div id="cover">
                <form name="intt">
                    <table className="main">
                        <colgroup><col className="w50" />
                            <col className="w40" />
                        </colgroup><tbody><tr>
                            <td>Principal Amount</td>
                            <td>
                                <input id="principal" />
                            </td></tr><tr>
                                <td>Interest Rate</td>
                                <td>
                                    <input id="rate" />
                                </td></tr><tr>
                                <td>Interest Type</td>
                                <td>
                                    <select id="itype">
                                        <option value="s">Simple</option>
                                        <option value="c" selected>Compound</option>
                                    </select>
                                </td></tr><tr>
                                <td>Compounding Frequency</td>
                                <td>
                                    <select id="crate">
                                        <option value={12}>Monthly</option>
                                        <option value={4} selected>Quarterly</option>
                                        <option value={2}>Half-yearly</option>
                                        <option value={1}>Yearly</option>
                                    </select>
                                </td></tr><tr>
                                <td>Period (months)</td>
                                <td>
                                    <input id="time" />
                                </td></tr><tr>
                                <td><button className="cal-sub-btn" type="reset">Reset</button></td>
                                <td>
                                    <button className="cal-sub-btn" type="button" onClick={interest}>
                                        Submit
                                    </button>
                                </td></tr><tr>
                                <td>Interest Amount</td>
                                <td><input id="inttamt" /></td>
                            </tr>
                        </tbody></table>
                </form>
            </div>
        </div>
    )
}

export default CalculatorsIntrest
