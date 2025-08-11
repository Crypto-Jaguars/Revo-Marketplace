// Helper function to redirect to order-confirmation page with the correct locale
function redirectToOrderSuccess() {
  const urlPath = window.location.pathname;
  const locale = urlPath.split('/')[1] || 'es';
  window.location.href = `/${locale}/order-confirmation`;
}

// Make the function available globally
window.redirectToOrderSuccess = redirectToOrderSuccess; 