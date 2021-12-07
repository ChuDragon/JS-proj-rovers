let store = {
  rovers: "",
  manifest: "",
  latestDate: "",
  photos: "",
  roverSelector: [
    ["Curiosity", "Spirit", "Opportunity"],
    [0, 1, 2],
  ],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  // console.log("New State ", newState); //for debugging
  store = Object.assign(store, newState);
  render(root, store);
};

//render function, using App()
const render = async (root, state) => {
  root.innerHTML = App(state);
  const { roverSelector } = state;
  listenerTabs(roverSelector);
  listenerBack(roverSelector);
};

// create content
const App = (state) => {
  let { rovers, manifest, photos, roverSelector, latestDate } = state;
  let htmlStr = `<h1 class="home_link">Mars Rovers</h1>
          <table>
            <tr>${roverInfo(rovers, roverSelector)}</tr>
            <tr>${renderManifest(manifest, roverSelector, latestDate)}</tr>
            <tr>${renderPhotos(photos, roverSelector, latestDate)}</tr>
          </table>`;
  if (roverSelector[1].length == 1) {
    htmlStr = htmlStr + '<h3 class="home_link">Go back</h3>';
  }
  return htmlStr;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Renders general rover info
const roverInfo = (rovers, roverSelector) => {
  let htmlStr = "";
  if (!rovers || rovers === "") {
    getRoverInfo(store);
  } else {
    let roverArr = [];
    //filter data based on selected rover (if any)
    if (roverSelector[1].length == 1) {
      roverArr = rovers.roversRet.rovers.filter(
        (elem) => elem.name == roverSelector[0][0]
      );
    } else {
      roverArr = rovers.roversRet.rovers; //array of 4 objects
    }
    // loop and filter: roverSelector[1] cntains array of indexes, 0 -> 2
    for (let i = 0; i < roverSelector[1].length; i++) {
      htmlStr =
        htmlStr +
        `<td><h3 id="${roverSelector[0][i]}">${roverArr[i].name}</h3>
          <p>Launch date: ${roverArr[i].launch_date}</p>
          <p>Landing date: ${roverArr[i].landing_date}</p>
          Status: ${roverArr[i].status}<br>` +
        (roverSelector[1].length == 1 ? additionalInfo(roverArr[i]) : "") +
        `</td>`;
    }
  }
  return htmlStr;
};

const additionalInfo = (roverObj) => {
  return roverObj.status == "complete"
    ? `The rover has completed its mission. Here are the photos from its last day
  on Mars:</br>`
    : "The rover is currently working on Mars. Here are its latest photos:</br>";
};

// Function that renders the latest photo dates, and obtains latestDate
const renderManifest = (manifest, roverSelector, latestDate) => {
  let latestStr = "";
  if (!manifest || manifest === "") {
    getManifest(store);
  } else {
    // The If block to obtain the latest date of photos
    if (!latestDate || latestDate === "") {
      const latestDate = manifest.manifestRet[0].photo_manifest.max_date;
      updateStore(store, { latestDate });
    }
    let latestStr_1 = "";
    //filter data based on selected rover (if any)
    if (roverSelector[1].length == 1) {
      latestStr_1 = manifest.manifestRet.filter(
        (elem) => elem.photo_manifest.name == roverSelector[0][0]
      );
    } else {
      latestStr_1 = manifest.manifestRet;
    }
    const latestStr_2 = latestStr_1.map(
      (elem) => `<td>Latest photo date: ${elem.photo_manifest.max_date}</td>`
    );
    latestStr = latestStr_2.join("");
  }
  return latestStr;
};

// Renders latest photos
const renderPhotos = (photos, roverSelector, latestDate) => {
  let htmlStr = "";
  if (latestDate) {
    // wait for latestDate to be defined
    if (!photos || photos === "") {
      getAllPhotos(store, latestDate);
    } else {
      const photArr_1 = [
        photos.photosRet.curiosity.photos, //array of 3 arrays
        photos.photosRet.spirit.photos,
        photos.photosRet.opportunity.photos,
      ];
      //filter data based on selected rover (if any)
      let photArr = [];
      roverSelector[1].length == 1
        ? photArr.push(photArr_1[roverSelector[1][0]]) //selected rover index
        : (photArr = photArr_1); //else, array of 4 objects
      for (let i = 0; i < roverSelector[1].length; i++) {
        htmlStr = htmlStr + `<td>`;
        // i = each rover, j = each photo, also checks if < 3 photos
        for (let j = 1; j <= 3 && photArr[i].length - j >= 0; j++) {
          htmlStr =
            htmlStr +
            imageLink(photArr[i][photArr[i].length - j].img_src, roverSelector);
        }
        htmlStr = htmlStr + "</td>";
      }
    }
  }
  return htmlStr;
};

// Constructs HTML for an image with link
const imageLink = (href, roverSelector) => {
  return `<a href="${href}"><img src="${href}" width="100%"/></a>`;
};

// Function to add event listeners to tabs
const listenerTabs = (roverSelector) => {
  for (let i = 0; i < roverSelector[1].length; i++) {
    let element = document.querySelector(`#${roverSelector[0][i]}`);
    if (element && roverSelector[1].length > 1) {
      //if element is defined (after render) & not one-rover page
      mouseEvents(element); //events on mouse-over
      element.addEventListener("click", (event) => {
        const ind = roverSelector[0].findIndex((x) => x == event.target.id);
        roverSelector = [[event.target.id], [ind]]; //selected rover: 2x1 array
        updateStore(store, { roverSelector });
      });
    }
  }
};

// Function to add event listener to home_link class
const listenerBack = (roverSelector) => {
  let elements = document.getElementsByClassName(`home_link`);
  for (let i = 0; i < elements.length; i++) {
    if (elements) {
      //if element is defined (this HTML part was rendered)
      mouseEvents(elements[i]); //events on mouse-over
      elements[i].addEventListener("click", (event) => {
        roverSelector = [
          ["Curiosity", "Spirit", "Opportunity"],
          [0, 1, 2],
        ];
        updateStore(store, { roverSelector });
      });
    }
  }
};

// function to add mouse* event listeners
const mouseEvents = (target) => {
  //const tabEl = document.querySelector(target);
  target.addEventListener("mouseenter", () => {
    target.style.background = "grey";
    target.style.color = "white";
    target.style.cursor = "pointer";
  });
  target.addEventListener("mouseleave", () => {
    target.style.background = "white";
    target.style.color = "black";
    target.style.cursor = "default";
  });
};

// ------------------------------------------------------  API CALLS
// API call to get a rover's general info
const getRoverInfo = (state) => {
  let { rovers } = state;
  fetch(`http://localhost:3000/rovers`)
    .then((res) => res.json())
    .then((rovers) => updateStore(store, { rovers }));
};

// API call to get a rover's manifest info, containing the latest photo date
const getManifest = (state) => {
  let { manifest } = state;
  fetch(`http://localhost:3000/mani`)
    .then((res) => res.json())
    .then((manifest) => updateStore(store, { manifest }));
};

// API call to get each rover's photos as of the latet date
const getAllPhotos = (state) => {
  let { photos, latestDate } = state;
  fetch(`http://localhost:3000/photos${latestDate}`)
    .then((res) => res.json())
    .then((photos) => updateStore(store, { photos }));
};
