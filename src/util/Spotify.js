const clientId='6d11cd13cd4840cb932761ecb6eaa12b';
const redirectUri='http://localhost:3000';
let accessToken;

const Spotify={
    getAcessToken(){
        if(accessToken){
            return accessToken;
        }
        else{
            // check for accesstoken match using regex 
            //window.location.href gives url and .match() is used to fetch a regex string from it equal to accessToken & expiresIn
            const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch=window .location.href.match(/expires_in=([^&]*)/);

            //means that the user is logged in
            if(accessTokenMatch && expiresInMatch){

                //1st element gives 'access_token=' and 2nd element gives required string
                accessToken=accessTokenMatch[1];

                const expiresIn=Number(expiresInMatch[1]);
                //clear parameter after expiry
                setTimeout(()=>{
                    accessToken='';
                },expiresIn*1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            }
            // if user is not logged in or signed up
            else{
                const accessUrl=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location.href=accessUrl;
            }
        }
    },
    search(term){
        const accessToken=Spotify.getAcessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((response)=>{
            return response.json();
        }).then(jsonResponse=>{
            if(!jsonResponse.tracks){
                return [];
            }
            else{
                return jsonResponse.tracks.items.map((track)=> {
                    return {
                        id : track.id,
                        name: track.name,
                        artists: track.artists[0].name,
                        album:track.album.name,
                        uri:track.uri
                    }

                });
            }
    
        })
    }


};
export default Spotify;