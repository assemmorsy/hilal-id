<template>
  <div class="row justify-content-center" v-if="employee">
    <div class="card d-inline-block m-5">
      <div
        :style="` background-image: url(${employee.imgUrl}) `"
        class="rounded-circle position-absolute profileImg"
      ></div>

      <span class="rounded-circle position-absolute hala"></span>

      <div class="text-center position-absolute img-data">
        <p class="m-0">{{ employee.name }}</p>
        <p class="m-0">{{ employee.jobTitle }}</p>
      </div>
      <div class="qr position-absolute">
        <QrcodeVue
          v-if="employee"
          :value="`https://hilal-id.web.app/${employee.id}`"
          :size="40"
          level="H"
          render-as="svg"
        />
      </div>
      <img src="@/assets/img/logo.svg" class="logo position-absolute" />
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: { QrcodeVue },
  props: ["employee"],
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.card {
  height: 280px;
  width: 190px;
  background-color: #001f5f;
  font-family: bukra;
  color: #fff;
  position: relative;
}
.logo {
  height: 80px;
  right: -20px;
  bottom: -15px;
  z-index: 19;
}
.qr {
  height: 80px;
  left: 5px;
  bottom: -35px;
  z-index: 19;
}
.profileImg {
  background-repeat: no-repeat;
  background-size: cover;
  width: 140px;
  height: 140px;
  top: 10px;
  right: 23px;
  z-index: 20;
}
.hala {
  background-image: linear-gradient(to bottom right, #001f5f, #005cb9);
  width: 140px;
  height: 140px;
  bottom: 10px;
}
.img-data {
  margin: 0 auto;
  bottom: 60px;
  right: 20px;
  z-index: 21;
}
</style>
