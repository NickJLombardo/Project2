let today = new Date();
let todayDate = today.getDate();
let todayMonth = today.getMonth() + 1;
let todayYear = today.getFullYear();
let allTables = document.querySelectorAll(".table");
const dateValidation = date => {
  let [mm, dd, yyyy] = date.split("/").map(x => parseInt(x));
  if (
    isNaN(mm) ||
    isNaN(dd) ||
    isNaN(yyyy) ||
    yyyy < todayYear ||
    (yyyy === todayYear && mm < todayMonth) ||
    (yyyy === todayYear && mm === todayMonth && dd < todayDate)
  ) {
    return "Invalid Date";
  }
  return `${yyyy}-${mm}-${dd}`;
};

const timeValidation = inputTime => {
  if (inputTime.includes(":")) {
    let [time, noon] = inputTime.split(" ");
    let [hour, minute] = time.split(":").map(x => parseInt(x));
    if (noon === undefined || noon === null || isNaN(hour) || isNaN(minute))
      return "Invalid time format";
    if (noon.toLowerCase() === "pm") hour += 12;
    if (hour >= 9 && hour < 22 && minute >= 0 && minute < 60) {
      return `${hour}:${minute < 10 ? "0" + minute : minute}:00`;
    } else return "Invalid time format";
  } else return "Invalid time format";
};

const postReservation = async data => {
  let url = "./api/reservations";
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    });
    let result = await res.json();
    alert("Successfully reserved");
  } catch (err) {
    alert(err);
  }
};

const getReservation = () => {
  let url = "./api/reservations/";
  fetch(url)
    .then(res => res.json())
    .then(res => alert("reserved"));
};

const createRandomTableId = arr => {
  let ranNum = Math.floor(Math.random() * 22 + 1);
  return arr.includes(ranNum) ? createRandomTableId(arr) : ranNum;
};

document.querySelector(".submit-btn").addEventListener("click", e => {
  e.preventDefault();
  let form = document.querySelector(".reserve-form");
  if (
    dateValidation(form.date.value.trim()) === "Invalid Date" ||
    timeValidation(form.time.value.trim()) === "Invalid time format"
  ) {
    if (
      dateValidation(form.date.value.trim()) === "Invalid Date" &&
      timeValidation(form.time.value.trim()) === "Invalid time format"
    ) {
      document.querySelector(".invalid-text").textContent =
        "Invalid Date and Time";
    } else if (
      dateValidation(form.date.value.trim()) !== "Invalid Date" &&
      timeValidation(form.time.value.trim()) === "Invalid time format"
    )
      document.querySelector(".invalid-text").textContent = "Invalid Time";
    else document.querySelector(".invalid-text").textContent = "Invalid Date";
  } else {
    document.querySelector(".invalid-text").textContent = "";
    let reservationDate = dateValidation(form.date.value.trim());
    let reservationTime =
      dateValidation(form.date.value.trim()) +
      " " +
      timeValidation(form.time.value.trim());
    let reservationName = form.name.value.trim();
    let reservationNoOfPeople = form.people.value.trim();
    let reservationEmail = form.email.value.trim();
    let reservationPhone = form.phone.value.trim();
    if (
      reservationNoOfPeople === "" ||
      reservationEmail === "" ||
      reservationPhone === ""
    ) {
      document.querySelector(".invalid-text").textContent = "Enter all inputs";
    } else {
      let url = `./api/reservations/?reservationDate=${reservationDate}T00:00:00.000Z`;
      let tableIdArr = new Array();
      let TableId;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          result.map(reservation => tableIdArr.push(reservation.TableId));
          return result;
        })
        .then(result => {
          TableId =
            localStorage.getItem("table") !== null &&
            localStorage.getItem("table") !== ""
              ? parseInt(localStorage.getItem("table"))
              : parseInt(createRandomTableId(tableIdArr));
          if (tableIdArr.includes(TableId))
            alert("This table is not available for this reservation time");
          else {
            let reservation = {
              reservationName,
              reservationDate,
              reservationTime,
              reservationEmail,
              reservationNoOfPeople,
              reservationPhone,
              TableId
            };
            postReservation(reservation);
            localStorage.setItem("table", "");
            tableIdArr = new Array();
          }
        });
    }
  }
});

const getId = (node, className) => {
  for (; node !== document; node = node.parentNode) {
    if (node.matches(className))
      return [node, node.dataset.id, node.classList.value];
  }
};

allTables.forEach(table =>
  table.addEventListener("click", e => {
    allTables.forEach(table => {
      table.classList = `table ${table.classList.value.split(" ")[1]}`;
    });
    let [node, tableNumber, classList] = getId(e.target, ".table");
    localStorage.setItem("table", tableNumber);
    let initShapeClass = classList.split(" ")[1];
    node.classList = `chose ${initShapeClass} table-chose`;
  })
);
