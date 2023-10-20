// Copyright (c) 2022 Steven Ge. All rights reserved.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

// global variables
var title = ""
var container = "";
var correctAudio = "";
var wrongAudio = "";
var outOfTimeAudio = "";
var startAudio = "";
var finishedAudio = "";

// When window is loaded, load existing data and set function for import button
window.onload = function() {
    // Get game data
    fetch('data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            this.data = data
            loadItems(data)
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

        // Assign import button
        importButton()

        // Element location
        container = document.getElementById("container");
}
