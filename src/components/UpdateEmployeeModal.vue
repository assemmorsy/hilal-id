<template>
  <div
    class="modal fade"
    ref="modalElm"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Employee Data</h5>
          <button
            type="button"
            class="btn-close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <div class="modal-body" v-if="employee">
          <form @submit.prevent.stop="handleSubmit" id="addEmpForm">
            <div class="row justify-content-around">
              <div class="mb-3 col-11 col-md-6">
                <label class="form-label fs-5" for="Name"> Name</label>
                <input
                  id="Name"
                  type="text"
                  class="form-control"
                  v-model="employee.name"
                  placeholder="Employee Name"
                  required
                />
              </div>
              <div class="mb-3 col-11 col-md-6">
                <label class="form-label fs-5" for="Job Title">
                  Job Title</label
                >
                <input
                  id="Job Title"
                  type="text"
                  class="form-control"
                  v-model="employee.jobTitle"
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
                  v-model="employee.nationality"
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
                  v-model="employee.hilalId"
                  placeholder="Id Number"
                  readonly
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
                  v-model="employee.email"
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
                  v-model="employee.phone"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>

            <div class="row justify-content-around">
              <div class="mb-3 col-11 col-md-6">
                <label class="form-label fs-5" for="Blood Type"
                  >Blood Type</label
                >

                <select
                  class="form-select"
                  id="Blood Type"
                  v-model="employee.bloodType"
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
                  v-model="employee.cardValidity"
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
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click.prevent="closeModal"
          >
            Close
          </button>
          <button
            disabled
            v-if="isPending || loadingImg"
            class="btn btn-outline-warning"
          >
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-outline-warning"
            @click.prevent="handleUpdate"
            for="addEmpForm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import { Modal } from "bootstrap";
export default {
  props: ["employee", "show"],
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
      isPending,
      updateDoc,
    } = useDocument("employees");
    const {
      error: imgError,
      url,
      filePath,
      deleteImage,
      uploadImage,
      loading: loadingImg,
    } = useStorage();
    const modalElm = ref(null);
    let updateModal = null;

    const imgFile = ref(null);
    const errorInImgType = ref(false);

    const handleFileChange = (e) => {
      const selected = e.target.files[0];

      if (ImageMIME.includes(selected.type)) {
        imgFile.value = selected;
        errorInImgType.value = false;
      } else errorInImgType.value = true;
    };
    onMounted(() => {
      if (modalElm.value) {
        updateModal = new Modal(modalElm.value);
      }
    });
    watch(
      () => props.show,
      () => {
        props.show && updateModal.show();
      }
    );

    const closeModal = () => {
      updateModal.hide();
      context.emit("close");
    };

    const handleUpdate = async () => {
      let newDoc = { ...props.employee };
      if (imgFile.value) {
        await deleteImage(props.employee.imgPath);
        if (!imgError.value) {
          await uploadImage(props.employee.hilalId, imgFile.value);
          if (imgError.value) return null;
          else {
            newDoc.imgUrl = url.value;
            newDoc.imgPath = filePath.value;
          }
        } else return null;
      }

      await updateDoc(props.employee.id, newDoc);
      if (!uploadDocError.value) closeModal();
    };

    return {
      modalElm,
      handleUpdate,
      uploadDocError,
      imgError,
      isPending,
      loadingImg,
      closeModal,
      BLOOD_TYPES,
      handleFileChange,
      imgFile,
      errorInImgType,
    };
  },
};
</script>

<style lang="scss" scoped></style>
