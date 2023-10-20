// Copyright (c) 2022 Steven Ge. All rights reserved.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

// Initialize variables
var result_items = {}
var current_item = ""
var index = 0
var score = 0
var started = false
var timer = "";
var items = [];
var mins = 0;
var seconds = 0;
var gameFontSize = 1;
var countdownValue = 0;
var nrCardsPassed = 0;
var nrShuffleThrough = 15;
var shuffling = false;

// Reset game
var resetGameVariables = function() {
    result_items = {}
    current_item = ""
    index = 0
    score = 0
    started = false
    nrCardsPassed = 0
}

// Initialize game
var initGame = function(title) {
    // Initialize game variables
    resetGameVariables()

    // Set game title add timer elements and obtain timer values
    container.innerHTML = "<p style='text-align:center; font-size:2em'><b>" + title + "</b></p>" + gameSettingsElements()

    // Fetch deck items
    items = data[title]["items"].slice();

    // Keyboard actions
    document.addEventListener('keydown', keyActions);
}

// Go back to main menu
var closeGame = function() {
    resetGameVariables()
    mainMenu()
}

var timerSettings = function() {
    if(timer != "") {
        minsSeconds = timer.split(':')
        mins = minsSeconds[0]
        seconds = minsSeconds[1]
    } else {
        mins = 0
        seconds = 5
    }
}

// Construct timer elements with memory
var gameSettingsElements = function() {
    // Use given timer if applicable
    timerSettings()

    var result = '<p style="text-align:center; font-size:1em"><b>timer</b></p> \
        <form id="timeInput" style="text-align:center; font-size:1em"> \
        <input style="width:20%; display:inline" class="form-control" id="secondsInput" type="number" value="' + seconds + '"> Seconds \
      </form></br> \
        <p style="text-align:center; font-size:1em"><b>Font size</b></p> \
      <form id="timeInput" style="text-align:center; font-size:1em"> \
        <input style="width:20%; display:inline" class="form-control" id="fontSizeInput" type="number" value="' + gameFontSize + '"> em\
      </form></br> \
      <div> \
        <button id="start-button" onclick="start()" type="button" class="btn btn-sm btn-outline-secondary" style="height:100%; width:100%; font-size:1em"><b>Start</br>(spacebar)</b></button> \
      </div>'

    return result
}

// Define beyboard actions
var keyActions = function(e) {
    if (started) {
        if (e.keyCode == 32) {
            nextCard(nrCardsPassed)
        }

    } else {
        if (e.keyCode == 32) {
            start()
        }
    }
};

// Game state change functions
var start = function() {

    // Get game settings
    seconds = document.getElementById("secondsInput").value;
    timer = mins + ":" + seconds
    gameFontSize = document.getElementById("fontSizeInput").value;

    // Set game state to started and construct buttons for the game mechanics
    started = true

    container.innerHTML = ""

    container.innerHTML += '<center> \
                                <div id="timer"> \
                                <span id="mins" style="font-weight: bold;">:</span> \
                                <span id="seconds" style="font-weight: bold;"></span>  \
                                </div> \
                            </center>'
    container.innerHTML += "<div style='height:100%; width:100%;;text-align: center;' id='image'><b></b></div>"
    container.innerHTML += "<div style='height:100%; width:100%; font-size:" + gameFontSize + "em;text-align: center;' id='answer'><b></b></div>"
    container.innerHTML += "<button class='btn btn-sm btn-outline-secondary' onclick='nextCard(nrCardsPassed)' style='position:absolute; text-align:center; left:45%; bottom:10%; height:10%; width:10%; font-size:1em' id='randomize'><b>Randomize</br>(key: spacebar)</b></button>"
    container.innerHTML += "<button class='btn btn-sm btn-outline-secondary' onclick='quit()' style='position:absolute; text-align:center; right:0; bottom:0; height:10%; width:10%; font-size:1em'><b>quit</b></button>"
    nextCard(nrCardsPassed)
}

// Continue to next word
async function nextCard(currentCardsPassed) {
    if (!shuffling) {
        // If nextcard function has been called again, quit the current call
        if (currentCardsPassed !=  nrCardsPassed) {
            return
        }
        // Continue with current call
        nrCardsPassed += 1;

        // Empty answer field
        document.getElementById("answer").innerHTML = "";

        // Pick random image
        var i = 0;
        while(i < nrShuffleThrough) {
            shuffling = true
            id = Math.floor(Math.random() * items.length);
            current_item = items[id]
            document.getElementById("image").innerHTML = "<img style='height:20em; display:block; margin-left: auto;margin-right: auto;width: 50%;' src='" + current_item[1] + "'>";
            i += 1
            await sleep(125);
        }
        shuffling = false
        
        // start timer
        timerSettings()
        startTimer(nrCardsPassed);
    } else {
        return
    }
}

// Game end
var quit = function() {
    started = false
    closeGame()
}

// Start timer (amount of time you have to get through the words)
async function startTimer(localNrCardsId){
    while (seconds >=0 || mins >= 0){
        // Check if current timer corresponds to the current card displayed
        if (nrCardsPassed != localNrCardsId) {
            return
        }

        seconds--;
        if(seconds < 0){
            seconds = 59;
            mins --;
            if(mins < 0) {
                // Ran out of time, reveal word
                document.getElementById("answer").innerHTML = current_item[0];
                return
            }
        }

        if(mins<10){
            document.getElementById("mins").innerHTML = '0'+mins+':'
        } else {
            document.getElementById("mins").innerHTML = mins+':'
        }
        if(seconds <10) {
            document.getElementById("seconds").innerHTML = '0'+seconds
        } else {
            document.getElementById("seconds").innerHTML = seconds
        }
        await sleep(1000);
    }
} 
