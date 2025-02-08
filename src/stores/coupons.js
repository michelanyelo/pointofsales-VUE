import { defineStore } from "pinia";
import { ref } from "vue";

export const useCouponStore = defineStore('coupon', () => {

  const couponInput = ref('');
  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: .10 },
    { name: '20DESCUENTO', discount: .20 }
  ];

  function applyCoupon() {
    if (VALID_COUPONS.some(c => c.name === couponInput.value)) {
      console.log("es valido")
    } else {
      console.log("no es valido")
    }
  }

  return {
    couponInput,
    applyCoupon
  }
});
