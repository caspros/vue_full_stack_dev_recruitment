<script setup>
import { ref, provide, onMounted } from "vue";
const props = defineProps({
  apiErrors: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["submit", "valid", "blur", "update:valid"]);
const disabled = ref(false);
const valid = ref(false);
provide("form-disabled", disabled);

const errors = ref({});
const errorsProvide = ref(null);
provide("form-errors", errorsProvide);
// const errorsShowProvide = ref(false);
// provide("form-errors-show", errorsShowProvide);
const formRef = ref(null);
function validateForm({}) {
  if (formRef.value)
    formRef.value.querySelectorAll("input, textarea").forEach(input => {
      let errorsArray = [];
      // console.clear();
      // console.log("działam");
      // console.log(input.name);
      const validityState = input.validity;
      if (!input.name) {
        return;
      }
      // console.clear();
      // console.log("działam");
      // console.log(input.name);
      //

      // if (input.name === "about") {
      //   console.log(validityState);
      //   // console.log(errors.value);
      //   // console.log(errorsArray.value);
      // }
      // console.log(input.name);

      if (validityState.valueMissing) {
        errorsArray.push("form.errors.valueMissing");
      } else if (validityState.typeMismatch) {
        errorsArray.push("form.errors.typeMismatch");
      } else if (validityState.tooShort) {
        errorsArray.push("form.errors.tooShort");
      } else if (validityState.tooLong) {
        errorsArray.push("form.errors.tooLong");
      } else if (validityState.patternMismatch) {
        errorsArray.push("form.errors.rangeUnderflow");
      } else if (validityState.rangeUnderflow) {
        errorsArray.push("form.errors.rangeOverflow");
      } else if (validityState.rangeOverflow) {
        errorsArray.push("form.errors.patternMismatch");
      } else if (input.getAttribute("passvalid")) {
        const name = input.getAttribute("passvalid");
        const equalInput = input.form.querySelector(`input[name="${name}"]`);
        if (equalInput.value !== input.value) {
          errorsArray.push("form.errors.passwordNotEqual");
        }
        input.setCustomValidity("Error");
      }

      errors.value[input.name] = errorsArray;
    });

  valid.value = isValid(errors.value);
  emit("update:valid", valid.value);
}

function isValid(obj) {
  for (let key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      return false;
    }
  }
  return true;
}

async function sendForm() {
  validateForm({});
  errorsProvide.value = Object.assign({}, errors.value);
  // errorsShowProvide.value = true;
  if (!valid.value) {
    return;
  } else {
    emit("valid");
  }
  emit("submit");
}

onMounted(() => {
  setTimeout(() => {
    validateForm({});
  }, 100);
});

const forceSendForm = () => {
  sendForm();
};

defineExpose({
  forceSendForm,
});
</script>

<template>
  <form
    ref="formRef"
    novalidate
    @keyup="validateForm({})"
    @change="validateForm({})"
    @paste="validateForm({})"
    @submit.prevent="sendForm"
    @focusout="emit('blur', $event)"
  >
    <slot :valid="valid"></slot>
  </form>
</template>

<style scoped lang="scss"></style>
