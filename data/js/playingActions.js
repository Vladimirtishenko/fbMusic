/*

// Main Class
    
*/
function FbPlayingMusic() {

}


/*

// Main Inheritance
    
*/

FbPlayingMusic.prototype = Object.create(FbXhrSendMessage.prototype);
FbPlayingMusic.prototype.constructor = FbPlayingMusic;


/*

// Audio object to play
    
*/

FbPlayingMusic.prototype.audios = function() {

	var self = this;

	if (!this.audioFbplayer) {
		this.audioFbplayer = new Audio();
	}

	this.audioFbplayer.addEventListener("error", function(e){
		if(e.type == "error") {
			self.stopMusic();
			self.createWarning();
		}
	})

	return this.audioFbplayer;

}


/*

// Curent time for audio
    
*/


FbPlayingMusic.prototype.currentTimes = function(time) {

	if (time) {
		this.currentTimese = time;
	} else {
		return ((this.currentTimese) ? this.currentTimese : 0);
	}
}


/*

// Play Music Main Method which define all state of playing.
    
*/


FbPlayingMusic.prototype.playMusic = function(el) {

	var musicPause = this.pauseMusic(el),
		plays;

	if (musicPause) {
		this.trackEvent('song', 'pause');
		return;
	}

	var musicStop = this.stopMusic(el);

	if (musicStop) {
		this.trackEvent('song', 'stop');
		return;
	}

	if (el.classList.contains("-item-paused")) {
		this.trackEvent('song', 'unpause');
		this.playAudio(null, el, "paused", "-item-paused");
		return;
	}


	if (!this.statusPlay) {
		return;
	}

	this.statusPlay = false;


	if (document.querySelector(".-item-paused")) {
		document.querySelector(".-item-paused").classList.remove('-item-paused');
	}

	event.target.classList.add("-item-loader-song");

	this.trackEvent('song', 'play');

	var self = this,
		song = el.getAttribute("data-id-song"),
		url = "https://pleer.com/site_api/files/get_url";


	self.makeRequest(url, "POST", {
		id: song,
		action: "play"
	}, function(data) {
		self.playAudio(JSON.parse(data).track_link, el);
		self.statusPlay = true;

	});
}


/*

// Pause Music Method
    
*/


FbPlayingMusic.prototype.pauseMusic = function(el) {

	if (document.querySelectorAll(".-now-plaing-fb-music").length < 1 && document.querySelectorAll(".-item-paused").length < 1 && el.parentNode.parentNode.id == "status-plaing") {
		el.classList.add("-now-plaing-fb-music");
	}

	if (el.classList.contains("-now-plaing-fb-music")) {

		el.classList.remove("-now-plaing-fb-music");
		el.classList.add("-item-paused");

		var backPlayer = el.getAttribute("data-id"),
			elementBack = document.getElementById(backPlayer) ? document.getElementById(backPlayer) : null;

		if (elementBack) {
			elementBack.classList.remove("-now-plaing-fb-music");
			elementBack.classList.add("-item-paused");
		}

		var audio = this.audios();
		this.currentTimes(audio.currentTime);
		audio.pause();
		return true;

	}
}

/*

// Stop Music Method
    
*/


FbPlayingMusic.prototype.stopMusic = function(el) {


	if (document.querySelector("#status-plaing")) {
		document.querySelector("#status-plaing").innerHTML = "";
	}

	var tryClass = document.querySelector(".-now-plaing-fb-music"),
		durationTime = document.querySelector(".-to-playeng-now"),
		playngIco = (durationTime) ? durationTime.parentNode.firstElementChild.getAttribute("data-duration-time-true") : null,
		progressBar = document.querySelectorAll("#-item-audio-duration"),
		audio = this.audios();
	audio.pause();
	audio.currentTime = 0;

	if ((progressBar && !el) ||
		(progressBar && !el.classList.contains("-item-paused")) ||
		(progressBar && !el.parentNode.querySelector('#-item-audio-duration')) ||
		(progressBar && event.target.classList.contains("-close-to-action-player"))) {

		for (var i = progressBar.length - 1; i >= 0; i--) {
			progressBar[i].parentNode.removeChild(progressBar[i]);
		};

		if (playngIco) {
			durationTime.classList.remove("-to-playeng-now");
			durationTime.innerHTML = playngIco;
		}
	}

	if (tryClass && el) {
		tryClass.classList.remove("-now-plaing-fb-music");
		return false;
	} else if (tryClass && !el) {
		tryClass.classList.remove("-now-plaing-fb-music");
		return true;
	} else if (!tryClass && el) {
		return false;
	} else {
		return true;
	}

}


/*

// Play Music Method
    
*/


FbPlayingMusic.prototype.playAudio = function(src, el, playing, classie) {


	var self = this,
		audio = this.audios(),
		dataIdSong = el.getAttribute("data-id-song"),
		dataName = el.getAttribute("data-name-song"),
		dataArtist = el.getAttribute("data-name-artist"),
		dataDuration = el.getAttribute("data-duration"),
		dataFullLink = el.getAttribute("data-full-link");


	if (playing) {
		this.audios().currentTime = this.currentTimes();
		this.audios().play();
		el.classList.add("-now-plaing-fb-music");
		el.classList.remove(classie);
		playindPrivate();
		return;
	}

	self.setFavoritesTrask(dataIdSong, dataName, dataArtist, dataDuration, dataFullLink);

	playindPrivate();

	audio.src = src;
	audio.play();

	var elementDuration = document.createElement("span"),
		progress = document.createElement("mark"),
		elementFullDuration = ((parseFloat(el.getAttribute("data-duration")) / 1000)).toFixed(2);
	elementDuration.id = "-item-audio-duration";
	progress.classList.add("-item-progress-to-play");
	elementDuration.appendChild(progress);

	el.parentNode.appendChild(elementDuration);

	var widthElement = parseInt(window.getComputedStyle(elementDuration).getPropertyValue("width")),
		timePrograss = el.parentNode.querySelector(".-item-duration-to-play");

	timePrograss.classList.add("-to-playeng-now");

	function playindPrivate() {

		if (!document.querySelector("#status-plaing")) {
			document.body.insertAdjacentHTML('afterbegin', "<div id='status-plaing'></div>");
		} else {
			document.querySelector("#status-plaing").innerHTML = "";
		}

		var playengBackground = document.querySelector("#status-plaing"),
			parentAttr = el.getAttribute("data-full-link"),
			parent = document.createElement("div"),
			playerBack = self.generateOurPlayerInDialog(el, parentAttr),
			closeBackgroundPlayer = document.createElement("span"),
			parentDuration = parent.querySelector("#-item-audio-duration");

		parent.insertAdjacentHTML("afterbegin", playerBack);
		closeBackgroundPlayer.classList.add("-close-to-action-player");
		parent.appendChild(closeBackgroundPlayer);
		(parentDuration) ? parentDuration.parentNode.removeChild(parentDuration) : "";

		playengBackground.appendChild(parent);
		closeBackgroundPlayer.addEventListener("click", function() {
			self.stopMusic(el)
		});


		var playToBack = parent.querySelector(".-item-play"),
			dataId = el.getAttribute("data-id");

		playToBack.id = dataId;


		playToBack.classList.add("-now-plaing-fb-music");
		playengBackground.querySelector('.-item-play').addEventListener("click", function() {

			var elGeneral = document.querySelector("i[data-id='" + playToBack.id + "']");

			if (!elGeneral) {
				elGeneral = playengBackground.querySelector('.-item-play');
			}

			self.playMusic(elGeneral);
		});


		audio.addEventListener("timeupdate", timeUpdate.bind(this, el, self), false);

	}

	function timeUpdate(event) {
		var duration = el.parentNode.querySelector('.-item-progress-to-play'),
			dataElement = document.getElementById(el.getAttribute("data-id")),
			durationBackground = (dataElement) ? dataElement.parentNode.querySelector(".-item-duration-to-play") : "",
			s = Number((audio.currentTime).toFixed(2)),
			currents = parseFloat(arguments[0].getAttribute("data-duration") / 1000) - parseFloat(audio.currentTime),
			playingTime = arguments[1].formatTime(currents);
		if (duration) {
			if (timePrograss && timePrograss.classList && timePrograss.classList.contains("-to-playeng-now")) {
				if (playingTime == "00:00") {
					self.stopMusic();
					return;
				}
				timePrograss.innerHTML = playingTime;
				durationBackground.innerHTML = playingTime;
			}
			duration.style.width = (s * 100) / elementFullDuration + "%";
		} else {
			durationBackground.innerHTML = playingTime;
		}
	}


	elementDuration.addEventListener("click", function() {
		var clicked = (event.offsetX * 100) / widthElement,
			crtTime = elementFullDuration * (clicked / 100);
		self.currentTimes(crtTime);
		audio.currentTime = self.currentTimes();

	})

	el.classList.add("-now-plaing-fb-music");
	el.classList.remove("-item-loader-song");

}

FbPlayingMusic.prototype.setFavoritesTrask = function(dataIdSong, dataName, dataArtist, dataDuration, dataFullLink) {

	var self = this;

	this.getLsParameter('favorites', function(res) {

		if (!res) {
			self.setLsParameter('favorites', JSON.stringify([{
				id: dataIdSong,
				song: encodeURIComponent(dataName),
				artist: encodeURIComponent(dataArtist),
				duration: dataDuration,
				fullLink: encodeURIComponent(dataFullLink),
			}]));
		} else {
			var data = JSON.parse(res),
			newSong = {};

			data.forEach(inArray);

			function inArray(item){
				if(item.id == dataIdSong){
					newSong = null;
				}
			}

			if(data.length > 20){
				data.shift();
			}

			if(newSong){
				data.push({
					id: dataIdSong,
					song: encodeURIComponent(dataName),
					artist: encodeURIComponent(dataArtist),
					duration: dataDuration,
					fullLink: encodeURIComponent(dataFullLink),
				})

				self.setLsParameter('favorites', JSON.stringify(data));
			}



		}


	});
}


var _FbPlayingMusic = new FbPlayingMusic();