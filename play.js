/* For some reason, declaring
var el = chrome.extension.getBackgroundPage().document.querySelector('#xray-audio-element');
works on debug console, but not here, so here's the
only workaround I've found
*/

el = function(){
  return chrome.extension.getBackgroundPage().document.querySelector('#xray-audio-element');
}

/* Toggle play/pause when browserAction is clicked, and change
the icon accordingly */
chrome.browserAction.onClicked.addListener((tab) => {
  if (el().paused || el().muted || el().src == "" || el().duration === 0){
    el().src = "http://129.104.201.173:8080";
    el().play();
    // Display an specific icon while loading
    chrome.browserAction.setIcon({path: 'assets/wait.gif'});
    // When the stream is loaded, back to the real icon
    el().addEventListener('canplay', function(){
      chrome.browserAction.setIcon({'path': 'assets/sound.png'});
      el().removeEventListener('canplay', arguments.callee);
    }, false);
  }
  else {
    el().pause();
    // Delete source = avoid buffering the stream
    el().src = "";
    // Mute icon when sound if off
    chrome.browserAction.setIcon({'path': 'assets/mute.png'});
  }
});
