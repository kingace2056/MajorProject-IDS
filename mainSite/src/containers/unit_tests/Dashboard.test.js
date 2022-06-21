import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../../store/reducers/auth";
import ReconnectingWebSocket from 'reconnecting-websocket';

import Dashboard from "../Dashboard";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

// create socket for notification
const phpSocket = new ReconnectingWebSocket(
    'ws://' + window.location.host +
    '/ws/phpSocket/');

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}><Dashboard phpSocket={phpSocket} /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});


describe('writearray_car', () => {
    const testCases = [
        {
            data: '20\n30\n40\n50\n',
            array_instance: [20, 30, 40],   //3 elements in array: add 4th(50) then average
            expected: 70.00
        },

        {
            data: '30\n40\n50\n60\n70\n80\n90\n100\n110\n120\n',
            array_instance: [40, 50, 60, 70, 80, 90, 100, 110],  //8 elements in array: add 9th(120) then average
            expected: 160
        },

        {
            data: '30\n40\n50\n60\n70\n80\n90\n100\n110\n120\n',
            array_instance: [30, 40, 50, 60, 70, 80, 90, 100, 110],    //9 elements in array: add 10th(120), it should shift to accommodate the incoming element without changing in size. Fine avg of the current 9 elements then
            expected: 160
        },
        {
            data: '30\n40\n50\n60\n70\n80\n90\n100\n110\nhi\n',
            array_instance: [30, 40, 50, 60],    //the value becomes 0 if incoming element is non-numeric
            expected: 72
        },

        {
            data: '300\n400\n500\n600\n700\n',
            array_instance: [300, 400, 500, 600],    //the value becomes 400 if avg > 400
            expected: 800
        },
    ];
    testCases.forEach(test => {
        it('gives averag value of array', () => {

            var smoothingWindow = 10;
            var d1 = test.data;
            var movingAvg = test.array_instance;
            d1 = d1.split('\n');
            d1.splice(-1, 1);
            d1 = Number(d1[d1.length - 1]);
            if (isNaN(d1)) {
                d1 = 0;
            }
            movingAvg.push(d1)                                               // append to array

            if (movingAvg.length >= smoothingWindow) {
                movingAvg.shift();                                          // removes first value if length reaches smoothing window (eg 10)
            }
            // get sum
            var tempAvg = 0;
            movingAvg.forEach(element => {
                tempAvg += element;
            });
            tempAvg /= movingAvg.length;                                    // get average
            if (tempAvg > 400) {                                            // condition for tempAvg going beyond threshold
                tempAvg = 400;
            }
            tempAvg = (800 * tempAvg) / 400;                                  //Formula to map node data on screen. Movement space on screen is maximum 800 px.
            expect(tempAvg).toEqual(test.expected);
        });
    });

});

describe('writearray_alarm', () => {

    const testCases = [
        {
            data: '20\n30\n40\n50\n',
            expected: 50
        },
        {
            data: '20\n30\n40\nHi\n',
            expected: 0
        },
        {
            data: '20\n30\n40\n700\n',
            expected: 400
        }
    ];
    testCases.forEach(test => {

        it('gives numeric value of array[-1]', () => {
            var d = test.data;
            d = d.split('\n');
            d.splice(-1, 1);
            d = Number(d[d.length - 1]);
            if (isNaN(d)) {
                d = 0;
            }
            if (d > 400) {
                d = 400;
            }
            expect(d).toEqual(test.expected);
        });
    });
});
