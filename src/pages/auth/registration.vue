<script setup lang="ts">

</script>

<template>
  <div class="page-registration">
      <div class="page-registration__row">
        <div class="page-registration__block">
          <AuthRegistration class="page-registration__window"/>
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.page-registration {
  width: 100%;
  position: relative;
  &:before {
    display: none;
    background-image: url('assets/image/balls.jpg');
    ///position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    //z-index: -1;
    content: "";
    top: calc(50px + 30px);
    right: 10%;
    width: 80%;
    height: calc(100% - 100px);

    border-radius: 24px;
    position: absolute;
    opacity: 0.7;
    max-width: 1100px;

    @media (max-width: $sm) {
      //display: block;
      //background-image: url('assets/image/balls.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      //background-position: center;
      top: 0; left: 0; right: 0;
      height: 100%;
      width: 100%;
      border-radius: 0;

    }
  }
  &__row {
    padding: 60px 0;
    gap: 50px;
    justify-content: center;
    align-items: start;
    display: flex;
    width: 100%;
    height: 100%;
    @media (max-width: $md) {
      padding: 80px 0;
    }
    @media (max-width: $sm) {
      padding: 0;
      display: block;
      position: relative;
    }
  }
  &__block {
    position: relative;
    display: flex;
    align-items: start;

    justify-content: center;
    max-width: 1210px;
    height: 100%;

    &::before {
      max-width: 1210px;
      display: block;
      background-image: url('assets/image/balls.jpg');
      ///position: relative;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
      //z-index: -1;
      content: "";
      top: 0;
      width: 80vw;
      height: 100%;
      border-radius: 24px;
      position: absolute;
      opacity: 0.7;
      //display: none;

      @media (max-width: $sm) {
        background-repeat: no-repeat;
        background-size: cover;
        //background-position: center;
        top: 0; left: 0; right: 0;
        height: 100%;
        width: 100%;
        border-radius: 0;

      }
    }

    @media (max-width: $sm) {
      //position: absolute;
      //border-radius: 0;

      //top: 0;
      //z-index: -1;
      //display: none;
    }
  }
  &__window {
    z-index: 1;
    margin: 35px auto 100px;
    @media (max-width: $sm) {
      margin: 80px 20px;
      width: 100%;
      max-width: 642px;
    }
  }

}
</style>