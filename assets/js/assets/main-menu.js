// Copyright (c) 2022 Steven Ge. All rights reserved.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

// Initialize data variable
var data = {}

// Obtain timer from url
var timer =  urlParam('timer');

// Construct main menu
var mainMenu = function() {
    container.innerHTML = '<div class="row" id="items">'
    loadItems(data)
}

// Construct deck menu item
var menuItem = function(title, image) {
    return '<div class="col-md-4">\
          <div class="card mb-4 shadow-sm">\
            <h5><b>' + title + '</b></h5> \
             <img  width="auto" height="225" src="' + image + '" alt="Thumbnail"> \
            <div class="card-body"> \
              <div class="d-flex justify-content-between align-items-center"> \
                <div class="btn-group"> \
                  <button onclick="startGame(' + "'" + title + "'" + ')" type="button" class="btn btn-sm btn-outline-secondary">Play</button> \
                  <!--  <button onclick="editDeck(' + "'" + title + "'" + ')" type="button" class="btn btn-sm btn-outline-secondary">Edit</button> --> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div>'
}

// Add/construct new deck option
var addDeckItem = '<div class="col-md-4">\
          <div class="card mb-4 shadow-sm">\
            <h5><b>Create deck</b></h5> \
             <img  width="auto" height="225" src="images/add.svg" alt="Thumbnail"> \
            <div class="card-body"> \
              <div class="d-flex justify-content-between alimportButtonign-items-center"> \
                <div class="btn-group"> \
                  <button onclick="addDeck()" type="button" class="btn btn-sm btn-outline-secondary">Create deck</button> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div>'

// Assign function to import decks button.
var importButton = function() {
  document.getElementById('importButton').onclick = function() {
      var files = document.getElementById('browseButton').files;
      if (files.length <= 0) {
        return false;
      }

      var fr = new FileReader();

      fr.onload = function(e) {
        var result = JSON.parse(e.target.result);
        data = result
        loadItems(data)
        importButton()
      }
      fr.readAsText(files.item(0));
  };
}


// Enter deck function
var startGame = function(t) {
  title = t
  initGame(title)
}

var loadItems = function(data) {
  var doc_items = document.getElementById("items");
  doc_items.innerHTML = "";
   for (let key in data) {
       doc_items.innerHTML += menuItem(key, data[key]["image"]);
    }
//     doc_items.innerHTML += addDeckItem
}

// Download decks function
var download = function(text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)));
  element.setAttribute('download', 'data.json');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
