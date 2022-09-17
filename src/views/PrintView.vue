<template>
  <PrintEmployee v-if="employee" :employee="employee" />
</template>

<script>
import PrintEmployee from "@/components/PrintEmployee.vue";
import getDocument from "@/composables/getDocument";
import { watch } from "vue";
export default {
  props: ["id"],
  components: { PrintEmployee },
  setup(props) {
    const { error, document: employee } = getDocument("employees", props.id);
    watch(
      () => employee.value,
      () => {
        if (employee.value) {
          setTimeout(() => {
            window.print();
          }, 1000);
        }
      }
    );
    return { employee };
  },
};
</script>

<style scoped></style>
