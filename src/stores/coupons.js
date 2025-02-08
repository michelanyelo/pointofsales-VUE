import { defineStore } from "pinia";
import { ref } from "vue";

export const useCouponStore = defineStore('coupon', () => {

  const couponInput = ref('');
  const hasMessage = ref(false);
  const message = ref('');
  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: .10 },
    { name: '20DESCUENTO', discount: .20 }
  ];

  function applyCoupon() {
    if (VALID_COUPONS.some(c => c.name === couponInput.value)) {
      hasMessage.value = true;
      message.value = "Aplicando..."
    } else {
      hasMessage.value = true;
      message.value = "El cupón no es válido. Verifica los datos y vuelve a intentar.";
    }

    setTimeout(() => {
      message.value = ''
    }, 5000);
  }

  return {
    couponInput,
    applyCoupon,
    hasMessage,
    message
  }
});
