
<script lang="ts">
    import { FirebaseApp } from 'sveltefire';
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { getStorage } from 'firebase/storage';
    import "../app.css";

    const firebaseConfig = {
        apiKey: "AIzaSyDriGlcD-5iSpKyTCQ3eweM8Wfgs0c9RZw",
        authDomain: "kabloop-5462c.firebaseapp.com",
        projectId: "kabloop-5462c",
        storageBucket: "kabloop-5462c.appspot.com",
        messagingSenderId: "474590737541",
        appId: "1:474590737541:web:403566bee95bc02060e5ec"
    };


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);
</script>

<FirebaseApp {auth} {firestore} {storage}>
    <slot />
</FirebaseApp>
