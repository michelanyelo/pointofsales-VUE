import { defineStore } from "pinia";
import { ref } from "vue";

export const useCouponStore = defineStore('coupon', () => {
  const couponInput = ref('');
  const message = ref(''); // Almacena el mensaje (éxito o error)
  const messageType = ref(''); // 'success' o 'error'
  const discountPercent = ref(0);

  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: 0.10 },
    { name: '20DESCUENTO', discount: 0.20 }
  ];

  function applyCoupon() {
    const validCoupon = VALID_COUPONS.find(c => c.name === couponInput.value);
    if (validCoupon) {
      messageType.value = 'success';
      message.value = "Aplicando...";
      setTimeout(() => {
        discountPercent.value = validCoupon.discount;
        message.value = "¡Descuento aplicado!";
      }, 3000);
    } else {
      messageType.value = 'error';
      message.value = "El cupón no es válido. Verifica los datos y vuelve a intentar.";
    }

    // Limpiar el mensaje después de 6 segundos
    setTimeout(() => {
      message.value = '';
      messageType.value = '';
    }, 6000);
  }

  return {
    couponInput,
    applyCoupon,
    message,
    messageType,
    discountPercent
  };
});
