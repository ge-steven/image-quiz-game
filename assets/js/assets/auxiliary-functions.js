// Copyright (c) 2022 Steven Ge. All rights reserved.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

// sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get url except for last part after last /
var createBaseUrl = function() {
  var getUrl = window.location;
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
	var pathComponents = getUrl.pathname.split('/');
	for(let i = 1; i < pathComponents.length-1; i++){
		baseUrl = baseUrl + pathComponents[i] + "/"
	}
	return baseUrl
}

// Fetch url parameter with given name
var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}

// Decode unicode array to string array
var decodeUriArray = function(array) {
    var result = []
    for(let i = 0; i < array.length; i++) {
        result.push(decodeURIComponent(array[i]))
    }
    return result
}

// Play audio immediatly
var playSound = function(audio) {
  audio.currentTime = 0;
  audio.play();
}
