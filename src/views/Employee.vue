<template>
  <div class="container position-relative" v-if="employee">
    <div class="row justify-content-center position-relative bg-img">
      <span
        style="width: 11rem; height: 11rem; background-color: #edf2f4"
        class="rounded-circle position-absolute top-100 start-50 translate-middle"
      ></span>
      <div
        :style="` background-image: url(${employee.imgUrl}) `"
        class="rounded-circle position-absolute top-100 start-50 translate-middle profileImg"
      ></div>
    </div>

    <div class="row justify-content-center data-row text-center">
      <h2 class="display-5 data-color">{{ employee.name }}</h2>

      <div class="row justify-content-center text-center">
        <a
          class="btn btn-primary text-light rounded-circle mx-2 icon"
          :href="`tel:${employee.phone}`"
        >
          <i class="bi bi-telephone icon-data"></i>
        </a>
        <a
          class="btn btn-primary text-light rounded-circle mx-2 icon"
          :href="`sms:${employee.phone}`"
        >
          <i class="bi bi-chat-left-dots icon-data"></i>
        </a>
        <a
          class="btn btn-primary text-light rounded-circle mx-2 icon"
          :href="`mailto:${employee.phone}`"
        >
          <i class="bi bi-envelope icon-data"></i>
        </a>
      </div>

      <div class="row justify-content-center">
        <div class="shadow p-3 m-3 col-11 bg-light rounded">
          <h3 class="fs-2 data-color">
            <i class="bi bi-person-badge"></i> Contact
          </h3>

          <div class="text-start">
            <p class="m-0 label">Name</p>
            <p class="fs-4 data-color">{{ employee.name }}</p>
            <hr />
            <p class="m-0 label">Phone Number</p>
            <a :href="`tel:${employee.phone}`" class="fs-4 data-color">{{
              employee.phone
            }}</a>
            <hr />
            <p class="m-0 label">Email</p>
            <a :href="`mailto:${employee.email}`" class="fs-4 data-color">
              {{ employee.email }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
export default {
  props: ["id"],
  setup(props) {
    const { error, document: employee } = getDocument("employees", props.id);
    const downloadVCF = () => {};
    return { employee, downloadVCF };
  },
};
</script>

<style scoped>
.bg-img {
  height: 30vh;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/hilal-id.appspot.com/o/backdround%2Fbackground.aeba6cd2.jpg?alt=media&token=47905d2a-b4c6-4dd4-b64b-da0c3f570b83");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
}

@media screen and (min-width: 960px) {
  .bg-img {
    background-size: cover;
  }
}
.data-row {
  padding-top: 5rem;
  background-color: #edf2f4;
}
.label {
  color: #8d99ae;
}
.data-color {
  color: #2b2d42;
}
.icon {
  width: 3rem;
  height: 3rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profileImg {
  background-repeat: no-repeat;
  background-size: cover;
  width: 10rem;
  height: 10rem;
}
</style>
