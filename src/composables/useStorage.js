import { projectStorage } from "@/firebase/config";
import { ref } from "vue";


const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
    const loading = ref(false)
    const uploadImage = async (docId, file) => {
        console.log(file);
        error.value = null
        loading.value = false
        filePath.value = `employeesImages/${docId}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)
        try {
            loading.value = true
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
            loading.value = false

        }
        catch (err) {
            loading.value = false
            console.log(err.message);
            error.value = "Can't upload the file"
        }
    }

    const deleteImage = async (path) => {
        loading.value = false
        error.value = null
        const storageRef = projectStorage.ref(path)
        try {
            loading.value = true
            const res = await storageRef.delete()
            loading.value = false
            error.value = null
            return res
        } catch (err) {
            loading.value = false
            console.log(err.message);
            error.value = "Can't delete the file"
        }

    }
    return { error, url, filePath, uploadImage, deleteImage, loading }
}
export default useStorage