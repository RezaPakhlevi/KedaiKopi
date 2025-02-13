document.addEventListener("alpine:init", () => {
  Alpine.data("product", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 35000 },
      { id: 5, name: "Sumatera Mandheling", img: "5.jpg", price: 40000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    totalPrice: 0, // Tambahkan properti totalPrice di sini
    isCartActive: false, // Menambah properti untuk mengatur status aktif keranjang belanja

    add(newItem) {
      // Cek apakah item sudah ada di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // Jika item belum ada, tambahkan sebagai item baru
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.totalPrice += newItem.price; // Menambahkan totalPrice
      } else {
        // Jika item sudah ada, tingkatkan quantity dan total harga
        cartItem.quantity++;
        cartItem.total = cartItem.price * cartItem.quantity;
        this.totalPrice += cartItem.price; // Menambahkan totalPrice
      }

      // Update quantity badge secara manual
      this.quantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    removeItem(index) {
      const item = this.items[index];

      if (item.quantity > 1) {
        // Jika quantity lebih dari 1, hanya kurangi quantity
        item.quantity--;
        item.total = item.price * item.quantity;
        this.totalPrice -= item.price; // Kurangi totalPrice
      } else {
        // Jika quantity 1, hapus item
        this.items.splice(index, 1);
        this.quantity -= item.quantity; // Kurangi quantity badge
        this.totalPrice -= item.total; // Kurangi total harga
      }
    },

    toggleCart() {
      this.isCartActive = !this.isCartActive;
    },

    closeCartIfOutside(event) {
      if (
        !event.target.closest(".shopping-cart") &&
        !event.target.closest("#shopping-cart-button")
      ) {
        this.isCartActive = false;
      }
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
