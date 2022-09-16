<script>
import { reactive, toRefs, ref } from "vue";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { timestamp } from "@/firebase/config";
import useCheck from "@/composables/useCheck";
export default {
  setup(props, context) {
    const BLOOD_TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
    const ImageMIME = [
      "image/avif",
      "image/bmp",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
    ];
    const {
      error: uploadDocError,
      addDoc,
      isPending,
    } = useCollection("employees");
    const {
      error: imgError,
      url,
      filePath,
      uploadImage,
      loading: loadingImg,
    } = useStorage();
    const {
      error: errorInCheckId,
      loading: loadinCheck,
      check,
    } = useCheck("employees");
    const employee = reactive({
      name: "",
      jobTitle: "",
      nationality: "",
      hilalId: "",
      bloodType: "",
      cardValidity: "",
      email: "",
      phone: "",
    });

    const handleCancel = () => {
      employee.name = "";
      employee.jobTitle = "";
      employee.nationality = "";
      employee.hilalId = "";
      employee.bloodType = "";
      employee.cardValidity = "";
      employee.phone = "";
      employee.email = "";
      imgFile.value = null;
      errorInImgType.value = false;
      context.emit("hideCard");
    };

    const imgFile = ref(null);
    const errorInImgType = ref(false);

    const handleFileChange = (e) => {
      const selected = e.target.files[0];

      if (ImageMIME.includes(selected.type)) {
        imgFile.value = selected;
        errorInImgType.value = false;
      } else errorInImgType.value = true;
    };
    const idUsed = ref(null);
    const handleSubmit = async () => {
      let employeesWithId = await check([
        "hilalId",
        "==",
        `${employee.hilalId}`,
      ]);
      idUsed.value = employeesWithId.length > 0;
      if (idUsed.value) return null;
      await uploadImage(employee.hilalId, imgFile.value);
      if (!imgError.value) {
        await addDoc({
          ...employee,
          imgUrl: url.value,
          imgPath: filePath.value,
          createdAt: timestamp(),
        });
        if (!uploadDocError.value) handleCancel();
      }
    };
    return {
      imgFile,
      BLOOD_TYPES,
      errorInImgType,
      ...toRefs(employee),
      handleCancel,
      handleSubmit,
      handleFileChange,
      imgError,
      uploadDocError,
      isPending,
      loadingImg,
      idUsed,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title display-5 mb-3 text-center">Add Employee</h5>
        <form @submit.prevent.stop="handleSubmit" id="addEmpForm">
          <div class="row justify-content-around">
            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="Name"> Name</label>
              <input
                id="Name"
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Employee Name"
                required
              />
            </div>
            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="Job Title"> Job Title</label>
              <input
                id="Job Title"
                type="text"
                class="form-control"
                v-model="jobTitle"
                placeholder="Job Title"
                required
              />
            </div>
          </div>

          <div class="row justify-content-around">
            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="Nationality"
                >Nationality</label
              >
              <input
                id="Nationality"
                type="text"
                class="form-control"
                v-model="nationality"
                placeholder="Nationality"
                required
              />
            </div>

            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="hilalId">Id Number</label>
              <input
                id="hilalId"
                type="text"
                class="form-control"
                v-model="hilalId"
                placeholder="Id Number"
                required
              />
            </div>
          </div>

          <div class="row justify-content-around">
            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                v-model="email"
                placeholder="Email"
                required
              />
            </div>

            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                class="form-control"
                v-model="phone"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div class="row justify-content-around">
            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="Blood Type">Blood Type</label>

              <select
                class="form-select"
                id="Blood Type"
                v-model="bloodType"
                required
              >
                <option selected disabled value="">Choose Blood Type</option>
                <option v-for="bt in BLOOD_TYPES" :key="bt" :value="bt">
                  {{ bt }}
                </option>
              </select>
            </div>

            <div class="mb-3 col-11 col-md-6">
              <label class="form-label fs-5" for="Card Validity"
                >Card Validity</label
              >
              <input
                required
                id="Card Validity"
                type="date"
                class="form-control"
                v-model="cardValidity"
                placeholder="Card Validity"
              />
            </div>
          </div>

          <div class="row justify-content-around">
            <div class="mb-3 col-10">
              <label class="form-label fs-5" for="Profile Image"
                >Profile Image</label
              >
              <input
                required
                id="Profile Image"
                type="file"
                class="form-control"
                @change="handleFileChange($event)"
              />
              <div class="text-danger text-center" v-if="errorInImgType">
                please, select correct image file...
              </div>
            </div>
          </div>

          <div class="text-danger text-center">
            {{ imgError }}
            {{ uploadDocError }}
          </div>
          <div class="text-danger text-center" v-if="idUsed">
            This id number is already used before ...
          </div>
          <div class="row justify-content-around">
            <button
              v-if="loadingImg || isPending"
              disabled
              class="btn btn-primary col-8 col-sm-3 my-2"
            >
              <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
            <button
              v-else
              type="submit"
              class="btn btn-primary col-8 col-sm-3 my-2"
            >
              Save
            </button>
            <button
              class="btn btn-outline-secondary col-8 col-sm-3 my-2"
              @click.prevent="handleCancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
