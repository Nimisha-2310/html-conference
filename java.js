document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const bookingList = document.getElementById("bookingList");

  function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookingList.innerHTML = "";

    bookings.forEach((booking, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${booking.title}</strong><br/>
        Date: ${booking.date}, Time: ${booking.time}<br/>
        <em>${booking.description}</em><br/>
        <button onclick="deleteBooking(${index})">Cancel</button>
      `;
      bookingList.appendChild(li);
    });
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;

    const newBooking = { title, date, time, description };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    bookingForm.reset();
    loadBookings();
  });

  window.deleteBooking = function(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
  };

  loadBookings();
});