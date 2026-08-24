
const supabaseUrl = "https://wbtpsyykiuelxrhdwilp.supabase.co" //link to db
const supabaseKey = "sb_publishable_Kafle7Qq_m5qHg9mD5o7zQ_-puneESp" //public key to talk to db
const mySupabase = supabase.createClient(supabaseUrl, supabaseKey) //creates client instance to allow communication with db

console.log("SupabaseRes" + mySupabase)


//map bounds for what the user can scroll to on map
const ukBounds = [
    [30, -20],  // Southwest corner
    [60, 20]    // Northeast corner
];


// Create the map and set initial view
const map = L.map('MapBox', {

}).setView([51.505, -0.09], 6);


// Add OpenStreetMap tiles, this actually loads the tiles that makes up the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 200);

map.setMinZoom(5);


//////////////////////////////////
// display pin point types     //
////////////////////////////////


let markers = []; //used to hold info on all makers currently displayed on the map so they can be deleted when update 



const mapdiv = document.getElementById("MapBox")

if(mapdiv){
  DisplayUniversities()
}

async function DisplayUniversities () {
 

  const { data, error } = await mySupabase
    .from("universities")
    .select("*")
    
 console.log("error:", error);
  //for each record create pin point
  data.forEach(item => {

   

    const marker = L.marker([item.latitude, item.longitude], {
      icon: geticon(item.guardian_rank_2026),
      title: item.name
    }).addTo(map)
      .bindTooltip(item.name, { permanent: false })
      .bindPopup(`Description:${item.description} <br>
                  Ranking:${item.guardian_rank_2026}
          `);

    markers.push(marker); //adds to marker so can be removed when update btn pressen
  });

}



//creates leaflet icon object for specified colour
function geticon(ranking) {
  if (ranking <= 30) {
    return L.icon({
      iconUrl: `markers/location-pin-icon-gold_22187384.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  else if (ranking <= 60) {
    return L.icon({
      iconUrl: `markers/location-pin-icon-silver_22062080.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  else {
    return L.icon({
      iconUrl: `markers/location-pin-icon-bronze_22187384.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
}