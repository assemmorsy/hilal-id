<template>
  <div>
    <table class="table text-center" v-if="employees && employees.length > 0">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Job Title</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>

          <th scope="col">Nationality</th>
          <th scope="col">Blood Type</th>
          <th scope="col">Card Validity</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <th scope="row">{{ employee.hilalId }}</th>
          <td>{{ employee.name }}</td>
          <td>{{ employee.jobTitle }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.nationality }}</td>
          <td>{{ employee.bloodType }}</td>
          <td>{{ employee.cardValidity }}</td>
          <td>
            <button
              class="btn btn-outline-danger rounded-2 mx-1"
              @click="handleDelete(employee)"
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
            <button
              class="btn btn-outline-warning rounded-3 mx-1"
              @click="handleUpdate(employee)"
            >
              <i class="bi bi-pen"></i>
            </button>

            <button
              class="btn btn-outline-info rounded-3 mx-1"
              @click="handleQr(employee)"
            >
              <i class="bi bi-qr-code"></i>
            </button>

            <!-- <button
              class="btn btn-outline-primary rounded-3 mx-1"
              @click="handlePrint(employee)"
            >
              <i class="bi bi-printer"></i>
            </button> -->

            <router-link
              class="btn btn-outline-secondary rounded-3 mx-1"
              :to="{ name: 'employee', params: { id: employee.id } }"
              target="_blank"
            >
              <i class="bi bi-person-circle"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center display-4 mt-5">
      <p>No Results</p>
      <i class="bi bi-search" style="font-size: 7rem"></i>
    </div>
    <DeleteEmployeeModal
      :employee="currentDoc"
      :show="isDeleteModalVisible"
      @close="
        isDeleteModalVisible = false;
        currentDoc = null;
      "
    />
    <UpdateEmployeeModal
      :employee="currentDoc"
      :show="isUpdateModalVisible"
      @close="
        isUpdateModalVisible = false;
        currentDoc = null;
      "
    />
    <div class="row justify-content-center">
      <qrcode-vue
        v-if="currentDoc"
        :value="`https://hilal-id.web.app/${currentDoc.id}`"
        :size="qrSize"
        level="M"
        render-as="svg"
        ref="qrElm"
      />
    </div>
    <!-- <div class="row justify-content-center" v-if="currentDoc" ref="printElm">
      <PrintEmployee :employee="currentDoc" />
    </div> -->
  </div>
</template>

<script>
import DeleteEmployeeModal from "./DeleteEmployeeModal.vue";
import { ref } from "vue";
import UpdateEmployeeModal from "./UpdateEmployeeModal.vue";
import QrcodeVue from "qrcode.vue";
import PrintEmployee from "@/components/PrintEmployee.vue";
import { jsPDF } from "jspdf";
import "svg2pdf.js";
export default {
  components: {
    DeleteEmployeeModal,
    UpdateEmployeeModal,
    QrcodeVue,
    PrintEmployee,
    PrintEmployee,
  },
  props: ["employees"],
  setup(props) {
    const isUpdateModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const qrElm = ref(null);
    const printElm = ref(null);
    const qrSize = ref(200);
    const currentDoc = ref(null);
    const handleDelete = (employee) => {
      isDeleteModalVisible.value = true;
      currentDoc.value = employee;
    };
    const handleUpdate = (employee) => {
      isUpdateModalVisible.value = true;
      currentDoc.value = employee;
    };
    const handlePrint = (employee) => {
      currentDoc.value = employee;
      setTimeout(() => {
        const doc = new jsPDF();
        console.log(printElm.value);
        if (printElm.value) {
          doc.html(printElm.value);
          doc.save(`${employee.name}_printCard.pdf`);
          currentDoc.value = null;
        }
      }, 500);
    };
    const handleQr = (employee) => {
      currentDoc.value = employee;
      setTimeout(() => {
        const doc = new jsPDF({
          orientation: "landscape",
          format: [110, 110],
        });
        console.log(qrElm.value.$el);
        if (qrElm.value) {
          doc
            .svg(qrElm.value.$el, {
              x: 5,
              y: 5,
              width: 100,
              height: 100,
            })
            .then(() => {
              // save the created pdf
              doc.save(`${employee.name}_QrCode.pdf`);
            });
          currentDoc.value = null;
        }
      }, 500);
    };

    return {
      qrSize,
      printElm,
      handleUpdate,
      handleQr,
      handlePrint,
      qrElm,
      handleDelete,
      isDeleteModalVisible,
      isUpdateModalVisible,
      currentDoc,
    };
  },
};
</script>

<style scoped></style>
