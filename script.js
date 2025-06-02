document.addEventListener("DOMContentLoaded", function () {

    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();
    let today = new Date();

    function initializeCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = '';

        // Previous Month
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }

        // Current Month
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }

        // Next Month
        const nexMonthFirstDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nexMonthFirstDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }
    }

    prevBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        initializeCalendar(currentDate)
    });

    nextBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        initializeCalendar(currentDate)
    });

    initializeCalendar(currentDate);
});