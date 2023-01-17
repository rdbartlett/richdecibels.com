var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },

  },
  hashNavigation: {
    watchState: true,
  },
  autoHeight: true,
  spaceBetween: 50,
  centeredSlides: true,
  allowTouchMove: false,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

})

mySwiper.on('slideChange', function (s) {
  $(window).scrollTop(0)
  stopSequence()
});
