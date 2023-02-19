// https://www.youtube.com/watch?v=QegE9i4UW4I&t=253s
// https://rapidapi.com/Glavier/api/spotify23/

// api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '744e4198c9mshe5b43c88fbc2611p146d98jsn1766ef28e733',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// code

let searchType = "singer";
let params = '';
const callParams = () => {
    var searchValue = document.getElementsByName('searchValue')[0].value;

    if(searchType == "song") {
        !async function(){
            let data = await fetch('https://spotify23.p.rapidapi.com/search/?q=' + searchValue, options)
                .then((response) => response.json())
                .then(data => {
                    return data;
                })
                .catch(error => {
                    console.error(error);
                });
            console.log(data)
            getSongInfo(data)
        }()
        document.getElementById("singer-info").style.display = "none";
        document.getElementById("song-info").style.display = "flex";
    } 
    // search for singer
    else {
        !async function(){
            let data = await fetch('https://spotify23.p.rapidapi.com/search/?q=' + searchValue, options)
                .then((response) => response.json())
                .then(data => {
                    return data

                })
                .catch(error => {
                    console.error(error);
                });
            let artistData = await fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=' + getSingerId(data), options)
                .then((response) => response.json())
                .then(artistData => {
                    return artistData;
                })
                .catch(error => {
                    console.error(error);
                });
            console.log(artistData)
            getSingerInfo(artistData)
        }()
        document.getElementById("song-info").style.display = "none";
        document.getElementById("singer-info").style.display = "flex";
    }

}

//------------------------------------------------------------
// Singer Search 
//------------------------------------------------------------

var getSingerId = (data) => {
    console.log(data)
    var id = data.artists.items[0].data.uri
    id = id.slice(15, id.length)
    console.log(id)
    return id
};

var getSingerInfo = (artistData) => {
    getAlbumCount(artistData)
    getBiography(artistData)
    getFollowers(artistData)
    getMonthlyListeners(artistData)
    getAvatar(artistData)
};

var getAlbumCount = (artistData) => {
    return artistData.data.artist.discography.albums.totalCount
};

var getBiography = (artistData) => {
    return artistData.data.artist.profile.biography
}

var getFollowers = (artistData) => {
    return artistData.data.artist.stats.followers
}

var getMonthlyListeners = (artistData) => {
    return artistData.data.artist.stats.monthlyListeners
}

var getAvatar = (artistData) => {
    return artistData.data.artist.visuals.avatarImage
}

//------------------------------------------------------------
// Song Search
//------------------------------------------------------------

var getSongInfo = (data) => {
    getCoverArt(data)
    getSinger(data)
    getReleaseDate(data)
    getDuration(data)
};

var getSinger = (data) => {
    console.log(data.tracks.items[0].data.artists.items[0].profile.name)
};

var getReleaseDate = (data) => {
    var album = data.tracks.items[0].data.albumOfTrack.name;
    !async function(){
        let albumData = await fetch('https://spotify23.p.rapidapi.com/search/?q=' + album, options)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
            });
            console.log(albumData.albums.items[0].data.date.year)

    }()
}

var getDuration = (data) => {
    var totalMS = data.tracks.items[0].data.duration.totalMilliseconds
    var duration = millisToMinAndSeconds(totalMS);
    console.log(duration);
}

var millisToMinAndSeconds = (totalMS) => {
    var seconds = totalMS * 0.001
    var minutes = Math.floor(seconds / 60)
    seconds = (seconds - (minutes * 60)).toFixed(0)
    if(seconds == 60) {
        minutes++
        seconds = 0
    } 
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

var getCoverArt = (data) => {
    console.log(data.tracks.items[0].data.albumOfTrack.coverArt.sources[0])
}

//------------------------------------------------------------
// Search Type 
//------------------------------------------------------------

var setSearchToSong = () => {
    searchType = "song"

    // change appearance
    document.getElementById("song-button").classList.add('song-button-on');
    document.getElementById("song-button").classList.remove('song-button-off');
    document.getElementById("singer-button").classList.add('singer-button-off');
    document.getElementById("singer-button").classList.remove('singer-button-on');
}

var setSearchToSinger = () => {
    searchType = "singer"

    // change appearance
    document.getElementById("singer-button").classList.add('singer-button-on');
    document.getElementById("singer-button").classList.remove('singer-button-off');
    document.getElementById("song-button").classList.add('song-button-off');
    document.getElementById("song-button").classList.remove('song-button-on');
}
