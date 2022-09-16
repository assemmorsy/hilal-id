<template>
  <nav class="navbar bg-primary bg-gradient">
    <div class="container-fluid">
      <a class="navbar-brand text-light">
        <img
          :src="require('@/assets/img/logoOnly.svg')"
          alt="Logo"
          height="60"
          class="d-inline-block align-text-middle"
        />
        <span class="fs-3 ms-4">Hilal Id System</span>
      </a>
      <button class="btn btn-secondary rounded-5" @click="handleLogout">
        Logout
        <i class="bi bi-door-closed"></i>
      </button>
    </div>
  </nav>
  <div class="row justify-content-around mt-3">
    <div class="mb-3 col-10 col-sm-7">
      <input
        id="Job Title"
        type="text"
        class="form-control"
        v-model="search"
        placeholder="search"
      />
    </div>
    <button
      class="btn btn-primary mb-3 col-9 col-sm-3"
      @click="addVisible = !addVisible"
    >
      Add Employee
    </button>
  </div>

  <AddEmployee v-if="addVisible" @hideCard="addVisible = false" />
  <EmployeeList :employees="filteredEmployees" v-show="!addVisible" />
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import useLogout from "@/composables/useLogout";
import getCollection from "@/composables/getCollection";

import AddEmployee from "@/components/AddEmployee.vue";
import EmployeeList from "../components/EmployeeList.vue";
export default {
  setup() {
    const addVisible = ref(false);
    const search = ref("");
    const router = useRouter();
    const { logout, error: logoutError, loading } = useLogout();
    const { error: collectionError, documents: employees } =
      getCollection("employees");
    const filteredEmployees = computed(() => {
      if (employees.value) {
        return employees.value.filter((emp) => {
          return emp.name.toLowerCase().includes(search.value.toLowerCase());
        });
      } else {
        return null;
      }
    });
    const handleLogout = async () => {
      await logout();
      if (!logoutError.value) router.push({ name: "login" });
    };
    return { addVisible, search, handleLogout, filteredEmployees, employees };
  },
  components: { AddEmployee, EmployeeList },
};
</script>

<style scoped></style>
