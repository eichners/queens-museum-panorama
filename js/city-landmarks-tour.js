
const locations = [
  { 
    label:"Queens Museum",
    longitude: -73.846707,
    latitude: 40.7458395
  },
  { 
    label:"Manhattan grid system",
    longitude: null,
    latitude: null
  }, 
  { 
    label:"Empire State Building",
    longitude: -73.9856554,
    latitude: 40.7484356,
    height: 700
  }
]

document.getElementById("side-panel-locations").innerHTML = `${locations.map(location => `<li><a href="#" onclick="javascript:flyTo(${location.longitude}, ${location.latitude})">${location.label}</a></li>`).join("")}`

let viewer = null
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDAyZDcyNy00NGQwLTRkODItYjYzZS0xODk1ZDEyZGVjZWIiLCJpZCI6MTA3ODg2LCJpYXQiOjE2NjMwODM2MTV9.nT8QVqASAbBjcvuHZyFKIjhB6r1ncT-hFgL8XXkXFnA';
// Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID.
viewer = new Cesium.Viewer('cesium-container');
 
let tileset = null
//TODO we might want to order these in the order we want them to render?
tileAssets = [ 1409427,1409426,1409424,1409420,1409417,1409405,1409402,1409397,1409393,1409386,1409380,1409375,1409369,1409363,1409359,1409353,1409338,1409337,1409329,1409327,1409322,1409317,1409313,1409300,1409252,1409251,1409209,1409206,1409170,1409165,1409137,1409123,1409122,1409102,1409101,1409087,1408942,1408936,1408935,1408930,1408929,1408927 ];
tileAssets.forEach((tileAsset, i) => {
  tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(tileAsset),
        maximumScreenSpaceError: 16,
        maximumMemoryUsage: 512
    })
  )
})

let marker = null
locations.forEach((location, i) => {
  var marker = viewer.entities.add({
    name : location.label,
    position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, location.height ? location.height : 300),
    billboard : {
      image : 'images/marker_ltgreen.svg',
      width : 64,
      height : 64
    },
    // point : {
    //     pixelSize : 50,
    //     color : Cesium.Color.RED,
    //     outlineColor : Cesium.Color.WHITE,
    //     outlineWidth : 2
    // },
    label : {
        text : location.label,
        font : '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -30)
    }
  });
})




// Add Cesium OSM Buildings, a global 3D buildings layer.
//const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
// Fly the camera to the Queens Museum at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination : Cesium.Cartesian3.fromDegrees(-73.846707, 40.7458395, 800),   
  orientation : {
    heading : Cesium.Math.toRadians(0.0),
    pitch : Cesium.Math.toRadians(-15.0),
  }
});






function onToggleSidePanel(){
  const sidePanel = document.getElementById("side-panel")
  sidePanel.classList.toggle("collapsed")
  // TODO use an icon, not text
  if (sidePanel.classList.contains("collapsed"))
    document.getElementById("toggle-side-panel-label").textContent = "Open"
  else
    document.getElementById("toggle-side-panel-label").textContent = "Close"
}

function onToggleSidePanel(){
  const sidePanel = document.getElementById("side-panel")
  sidePanel.classList.toggle("collapsed")
  // TODO use an icon, not text
  if (sidePanel.classList.contains("collapsed"))
    document.getElementById("toggle-side-panel-label").textContent = "Open"
  else
    document.getElementById("toggle-side-panel-label").textContent = "Close"
}

function flyTo(longitude, latitude){
  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, 800),   
    orientation : {
      heading : Cesium.Math.toRadians(0.0),
      pitch : Cesium.Math.toRadians(-15.0),
    }
  });
}