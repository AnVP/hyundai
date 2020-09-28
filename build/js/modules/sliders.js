(function () {
  const spaceDigits = function (number){
    return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  const ranges = document.querySelectorAll('.main-form__range');
  if (!ranges.length) {
    return;
  }

  ranges.forEach(function (item) {
    const id = item.getAttribute('data-value');
    const input = document.querySelector('#' + id);
    const unit = item.dataset.unit;
    const start = input.value;
    const min = Math.round(item.dataset.min);
    const max = Math.round(item.dataset.max);

    noUiSlider.create(item, {
      start: [start],
      connect: 'lower',
      step: 1,
      range: {
        'min': min,
        'max': max
      },
      // padding: 1
    });

    item.noUiSlider.on('update', function (values, handle) {
      input.value = (Math.round(values[handle]));
      input.value = spaceDigits(input.value) + unit;
    });

    input.addEventListener('change', function () {
        item.noUiSlider.set(this.value);
    });
  });
})();