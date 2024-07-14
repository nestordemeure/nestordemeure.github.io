document.addEventListener('DOMContentLoaded', function () {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];

  // Hide all content initially
  document.querySelectorAll('.heading-wrapper, p').forEach(el => {
    el.style.display = 'none';
  });

  // Find all h2 elements (month headings)
  const monthHeadings = Array.from(document.querySelectorAll('.heading-wrapper h2'));

  // Find the index of the current month
  const currentMonthIndex = monthHeadings.findIndex(h2 =>
    h2.textContent.trim().toLowerCase() === currentMonth
  );

  if (currentMonthIndex !== -1) {
    // Show the current month's heading
    monthHeadings[currentMonthIndex].closest('.heading-wrapper').style.display = '';

    // Show all content until the next month's heading
    let currentElement = monthHeadings[currentMonthIndex].closest('.heading-wrapper').nextElementSibling;
    const nextMonthHeading = monthHeadings[currentMonthIndex + 1];

    while (currentElement && currentElement !== nextMonthHeading?.closest('.heading-wrapper')) {
      currentElement.style.display = '';
      currentElement = currentElement.nextElementSibling;
    }
  }
});