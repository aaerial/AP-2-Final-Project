document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const eventDay = document.getElementById("event-day");
    const eventDate = document.getElementById("event-date");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();
    let today = new Date();

    const philippineHolidays = [
        { month: 0, day: 1, name: "New Year's Day" },
        { month: 3, day: 9, name: "Araw ng Kagitingan" },
        { month: 3, day: 14, name: "Maundy Thursday" },
        { month: 3, day: 15, name: "Good Friday" },
        { month: 4, day: 1, name: "Black Saturday" },
        { month: 4, day: 1, name: "Eid'l Fitr" },
        { month: 4, day: 1, name: "Labor Day" },
        { month: 5, day: 12, name: "Independence Day" },
        { month: 6, day: 21, name: "National Flag Day" },
        { month: 6, day: 21, name: "Eid'l Adha" },
        { month: 7, day: 21, name: "National Heroes Day" },
        { month: 7, day: 21, name: "Ninoy Aquino Day" },
        { month: 7, day: 26, name: "National Heroes Day" },
        { month: 8, day: 1, name: "National Teachers' Day" },
        { month: 9, day: 31, name: "All Saints' Day" },
        { month: 10, day: 1, name: "All Souls' Day" },
        { month: 10, day: 30, name: "Bonifacio Day" },
        { month: 10, day: 31, name: "Feast of the Immaculate Conception" },
        { month: 11, day: 24, name: "Christmas Eve" },
        { month: 11, day: 25, name: "Christmas Day" },
        { month: 11, day: 26, name: "Boxing Day" },
        { month: 11, day: 30, name: "Rizal Day" },
        { month: 11, day: 31, name: "New Year's Eve" }
    ];

    const customEvents = {}; // Add custom events here if needed

    function isHoliday(year, month, day) {
        for (const holiday of philippineHolidays) {
            if (holiday.month === month && holiday.day === day) return true;
        }
        // Special case: last Monday of August (National Heroes Day)
        if (month === 7) {
            const lastDay = new Date(year, month + 1, 0).getDate();
            for (let d = lastDay; d > lastDay - 7; d--) {
                const date = new Date(year, month, d);
                if (date.getDay() === 1 && day === d) return true;
            }
        }
        return false;
    }

    function initializeCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = '';

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }

        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            if (isHoliday(year, month, i)) {
                dayDiv.classList.add('holiday');
                dayDiv.title = "Philippine Holiday";
            }
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            if (customEvents[dateStr]) {
                dayDiv.classList.add('custom-event');
                dayDiv.title = customEvents[dateStr];
            }

            dayDiv.addEventListener("click", () => {
                const clickedDate = new Date(year, month, i);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                eventDay.textContent = clickedDate.toLocaleDateString("en-US", { weekday: 'long' });
                eventDate.textContent = clickedDate.toLocaleDateString("en-US", options);

                let message = "";
                if (isHoliday(year, month, i)) {
                    const holiday = philippineHolidays.find(h => h.month === month && h.day === i);
                    if (holiday) message += `\n🎉 ${holiday.name}`;
                }
                if (customEvents[dateStr]) {
                    message += `\n📌 ${customEvents[dateStr]}`;
                }
                if (message !== "") {
                    eventDate.textContent += message;
                }
            });

            daysContainer.appendChild(dayDiv);
        }

        const nextMonthOffset = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthOffset; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }
    }

    prevBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        initializeCalendar(currentDate);
    });

    nextBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        initializeCalendar(currentDate);
    });

    initializeCalendar(currentDate);
});

const singleTask = document.getElementById("single-task-day");
const allTask = document.getElementById("all-tasks-day");

function addTask() {
    singleTask.style.display = "block";
    allTask.style.display = "none";

    const textArea1 = document.createElement("textarea");
    const textArea2 = document.createElement("textarea");
    const textArea3 = document.createElement("textarea");

    singleTask.appendChild(textArea1);
    singleTask.appendChild(textArea2);
    singleTask.appendChild(textArea3);
};
