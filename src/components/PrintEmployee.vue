<template>
  <div class="row justify-content-center">
    <div class="my-card position-relative">
      <div
        :style="`background-image:url(${employee.imgUrl})`"
        class="rounded-circle profileImg"
      ></div>
      <div class="text-center text-light name-title">
        <h4>{{ employee.name }}</h4>
        <h6>{{ employee.jobTitle }}</h6>
      </div>
      <span class="rounded-circle hala"></span>
      <div class="qr position-absolute">
        <QrcodeVue
          v-if="employee"
          :value="`https://hilal-id.web.app/${employee.id}`"
          :size="100"
          level="L"
          render-as="svg"
        />
      </div>
      <img src="@/assets/img/logo.svg" class="logo position-absolute" />
    </div>
    <div class="my-card text-light">
      <div class="field-container">
        <p class="field-data">{{ employee.nationality }}</p>

        <div class="label-container">
          <p class="label">الجنسية</p>
          <p class="label">Nationality</p>
        </div>
      </div>

      <div class="field-container">
        <p class="field-data">{{ employee.hilalId }}</p>

        <div class="label-container">
          <p class="label">رقم الهوية</p>
          <p class="label">ID Number</p>
        </div>
      </div>

      <div class="field-container">
        <p class="field-data">{{ employee.bloodType }}</p>

        <div class="label-container">
          <p class="label">فصيلة الدم</p>
          <p class="label">Blood Type</p>
        </div>
      </div>

      <div class="field-container">
        <p class="field-data">{{ employee.cardValidity }}</p>

        <div class="label-container">
          <p class="label">صلاحية البطاقة</p>
          <p class="label">Validation</p>
        </div>
      </div>

      <div class="text">
        هذه البطاقة ملك لنادى الهلال السعودى وتستخدم لاغراض تعريفية.ولايسمح
        برهنها ولا استخدامها من قبل طرف ثالث فى حال العثور عليها الرجاء الاتصال
        بإدارة النادى
      </div>

      <div class="contacts">
        <p>هاتف : 966127467844</p>
        <p>فاكس : 96614627444</p>
      </div>

      <img src="@/assets/img/logo.svg" class="footer-logo" />
      <p class="email">alhelal@info.com</p>
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
@font-face {
  font-family: "Bukra-Medium";
  src: url("@/assets/fonts/Bukra-Medium.ttf") format("truetype");
}
@media print {
  * {
    font-family: Bukra-Medium;
  }

  .my-card {
    height: 560px;
    width: 380px;
    background-color: #001f60;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .profileImg {
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 50px;
    width: 250px;
    height: 250px;
    margin: 0px;
    padding: 0px;
    z-index: 2;
  }

  .name-title {
    z-index: 4;
    position: relative;
    top: 80px;
  }

  .hala {
    background-image: linear-gradient(to bottom right, #001f5f, #005cb9);
    width: 250px;
    height: 250px;
    margin: 0px;
    padding: 0px;
    position: relative;
    top: -70px;
    z-index: 0;
  }

  .logo {
    height: 100px;
    right: -15px;
    bottom: 10px;
    z-index: 19;
  }

  .qr {
    height: 100px;
    left: 10px;
    bottom: 10px;
    z-index: 19;
  }

  .label {
    padding: 0px;
    margin: 0px;
  }
  .field-container {
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 90%;
    padding-bottom: 2px;
    border-bottom: #ffffff solid 1px;
    margin: 13px;
  }
  .field-data {
    height: 100%;
    padding: 10px 0px;
    margin: auto auto 0px 0px;
    display: inline-block;
  }
  .label-container {
    align-self: flex-start;
    height: 100%;
    padding: 0px;
    margin: 0px;
    display: inline-block;
    text-align: right;
  }
  .text {
    padding-top: 10px;
    text-align: center;
    font-size: 13px;
  }
  .contacts {
    padding-top: 10px;
    text-align: center;
    font-size: 13px;
  }
  .contacts p {
    padding: 0px;
    margin: 0px;
  }
  .footer-logo {
    padding: 0px;
    margin: 10px;
    height: 80px;
  }
  .email {
    font-size: 13px;
    padding: 0px;
    margin: 0px;
  }
}

@media screen {
  * {
    font-family: Bukra-Medium;
  }

  .my-card {
    height: 560px;
    width: 380px;
    background-color: #001f60;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .profileImg {
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 50px;
    width: 250px;
    height: 250px;
    margin: 0px;
    padding: 0px;
    z-index: 2;
  }

  .name-title {
    z-index: 4;
    position: relative;
    top: 80px;
  }

  .hala {
    background-image: linear-gradient(to bottom right, #001f5f, #005cb9);
    width: 250px;
    height: 250px;
    margin: 0px;
    padding: 0px;
    position: relative;
    top: -70px;
    z-index: 0;
  }

  .logo {
    height: 100px;
    right: -15px;
    bottom: 10px;
    z-index: 19;
  }

  .qr {
    height: 100px;
    left: 10px;
    bottom: 10px;
    z-index: 19;
  }

  .label {
    padding: 0px;
    margin: 0px;
  }
  .field-container {
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 90%;
    padding-bottom: 2px;
    border-bottom: #ffffff solid 1px;
    margin: 13px;
  }
  .field-data {
    height: 100%;
    padding: 10px 0px;
    margin: auto auto 0px 0px;
    display: inline-block;
  }
  .label-container {
    align-self: flex-start;
    height: 100%;
    padding: 0px;
    margin: 0px;
    display: inline-block;
    text-align: right;
  }
  .text {
    padding-top: 10px;
    text-align: center;
    font-size: 13px;
  }
  .contacts {
    padding-top: 10px;
    text-align: center;
    font-size: 13px;
  }
  .contacts p {
    padding: 0px;
    margin: 0px;
  }
  .footer-logo {
    padding: 0px;
    margin: 10px;
    height: 80px;
  }
  .email {
    font-size: 13px;
    padding: 0px;
    margin: 0px;
  }
}
</style>
