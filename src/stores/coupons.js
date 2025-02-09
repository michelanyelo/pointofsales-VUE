import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore('coupon', () => {
  const cartStore = useCartStore();
  const couponInput = ref('');
  const message = ref(''); // Almacena el mensaje (éxito o error)
  const messageType = ref(''); // 'success' o 'error'
  const discountPercent = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: 0.10 },
    { name: '20DESCUENTO', discount: 0.20 }
  ];

  watch(discountPercent, () => {
    discount.value = (cartStore.subtotal * discountPercent.value).toFixed(2);
  });

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

  function $reset() {
    couponInput.value = '';
    message.value = '';
    messageType.value = '';
    discountPercent.value = 0;
    discount.value = 0;
  }

  const isApplied = computed(() => discountPercent.value > 0);

  return {
    couponInput,
    applyCoupon,
    message,
    messageType,
    discountPercent,
    discount,
    isApplied,
    $reset
  };
});
