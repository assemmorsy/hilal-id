import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue"

const getDocument = (collection, id) => {
    const error = ref(null)
    const document = ref(null)

    const documentRef = projectFirestore.collection(collection).doc(id)
    const unsub = documentRef.onSnapshot((doc) => {
        if (doc.data() && doc.data().createdAt) {
            
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = "this document does not exist"
        }

    }, (err) => {
        console.log(err.message);
        error.value = "could not fetch data"
        document.value = null
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })

    return { error, document }
}
export default getDocument