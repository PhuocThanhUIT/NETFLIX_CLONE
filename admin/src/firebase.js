import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCgwGbf2UvtaxCsytHI7Nj8G4yvlPyFJdM",
    authDomain: "netflix-220bf.firebaseapp.com",
    projectId: "netflix-220bf",
    storageBucket: "netflix-220bf.appspot.com",
    messagingSenderId: "265843956446",
    appId: "1:265843956446:web:29d86ac26dfdd13221404f",
    measurementId: "G-CL51CNL2MS"
  };

  const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
export default storage;