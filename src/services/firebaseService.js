import mockedDatabaseData from "@/database.json";
// import settingsLoading from "../test/settingsLoading";
import store from "@/store";

// variables
const globalFirebase = window.firebase;
const { links } = store.state.firebase;
let firebaseAllEventsRefs = {};

// functions
const getMockedDatabaseData = async () => {
// const getTestDbData = async () => {
  await new Promise((resolve, reject) => {
    try {
      setTimeout(
        () => resolve(store.dispatch("setData", mockedDatabaseData)),
          // () => resolve(store.dispatch("setData", settingsLoading)),
        500
      );
    } catch (e) {
      reject();
    }
  });
};

const setFirebaseRefs = () => {
  const db = globalFirebase.database();
  const { playerId = null } = window.olympics2022Settings;

  for (let prop in links) {
    let linkProp = links[prop];
    if (prop === "player" && typeof links[prop] === "function") {
      linkProp = links[prop](playerId);
    }

    firebaseAllEventsRefs[prop] = db.ref(linkProp);
  }
};

const getFirebaseData = () => {
  setFirebaseRefs();

  const cb = (snap, type) => {
    const data = snap.val();

    console.log({
      type,
      data: snap && data ? data : {}
    });

    store.dispatch("setData", {
      type,
      data: snap && data ? data : {}
    });
  };

  if (firebaseAllEventsRefs) {
    Object.keys(firebaseAllEventsRefs).forEach(type => {
      firebaseAllEventsRefs[type].once("value", snap => cb(snap, type));
    });
  }
};

export const setData = () => {
  if (!globalFirebase) {
    return getFirebaseData();
  }
  // return getTestDbData();
  return getMockedDatabaseData();
};
