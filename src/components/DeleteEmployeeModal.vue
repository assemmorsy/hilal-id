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
          <h5 class="modal-title">Deleting Employee</h5>
          <button
            type="button"
            class="btn-close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="employee">
            Are You sure that you want to delete employee (
            {{ employee.name }} ) ?
          </p>
        </div>

        <div>{{ error }} {{ errorDeleteImg }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click.prevent="closeModal"
          >
            Close
          </button>
          <button
            v-if="isPending || pendingDeleteImg"
            disabled
            class="btn btn-danger"
          >
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-outline-danger"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { ref, watch, onMounted } from "vue";
export default {
  props: ["show", "employee"],

  setup(props, context) {
    const { error, isPending, deleteDoc } = useDocument("employees");
    const {
      error: errorDeleteImg,
      loading: pendingDeleteImg,
      deleteImage,
    } = useStorage();
    const modalElm = ref(null);
    let deleteModal = null;
    onMounted(() => {
      if (modalElm.value) {
        deleteModal = new Modal(modalElm.value);
      }
    });
    watch(
      () => props.show,
      () => {
        props.show && deleteModal.show();
      }
    );

    const closeModal = () => {
      deleteModal.hide();
      context.emit("close");
    };
    const handleDelete = async () => {
      await deleteDoc(props.employee.id);
      if (!error.value) {
        console.log(props.employee.imgPath);
        await deleteImage(props.employee.imgPath);
        if (!errorDeleteImg.value) {
          console.log("deleted");
          closeModal();
        }
      }
    };
    return {
      modalElm,
      closeModal,
      handleDelete,
      error,
      isPending,
      errorDeleteImg,
      pendingDeleteImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
