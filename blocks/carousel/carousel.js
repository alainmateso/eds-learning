export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  let current = 0;

  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  const slides = rows.map((row, i) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const imgCell = row.children[0];
    const captionCell = row.children[1];

    if (imgCell) slide.appendChild(imgCell.cloneNode(true));
    if (captionCell) {
      const caption = document.createElement('p');
      caption.textContent = captionCell.textContent;
      caption.classList.add('carousel-caption');
      slide.appendChild(caption);
    }

    if (i !== 0) slide.style.display = 'none';
    wrapper.appendChild(slide);
    return slide;
  });

  block.innerHTML = '';
  block.appendChild(wrapper);

  // Navigation
  const prev = document.createElement('span');
  prev.textContent = '‹';
  prev.classList.add('carousel-prev');

  const next = document.createElement('span');
  next.textContent = '›';
  next.classList.add('carousel-next');

  block.appendChild(prev);
  block.appendChild(next);

  function showSlide(index) {
    slides[current].style.display = 'none';
    slides[index].style.display = 'block';
    current = index;
  }

  prev.addEventListener('click', () => {
    const newIndex = (current - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  });

  next.addEventListener('click', () => {
    const newIndex = (current + 1) % slides.length;
    showSlide(newIndex);
  });
}
