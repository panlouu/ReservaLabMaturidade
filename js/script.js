const laboratories = [
  { id: 1, name: "Laboratório 01", capacity: 30, available: true },
  { id: 2, name: "Laboratório 02", capacity: 40, available: false },
  { id: 3, name: "Laboratório 03", capacity: 25, available: true }
];

const MINIMUM_CAPACITY = 30;
const laboratoryList = document.querySelector("#laboratory-list");
const laboratorySelect = document.querySelector("#laboratory");
const reservationForm = document.querySelector("#reservation-form");
const reservationList = document.querySelector("#reservation-list");
const bookingCount = document.querySelector("#booking-count");
const feedback = document.querySelector("#form-feedback");
const dateInput = document.querySelector("#date");

const reservations = [];

function canBeReserved(laboratory) {
  return laboratory.available && laboratory.capacity >= MINIMUM_CAPACITY;
}

function renderLaboratories() {
  laboratoryList.innerHTML = "";
  laboratorySelect.innerHTML = '<option value="">Selecione um laboratório</option>';

  laboratories.forEach((laboratory) => {
    const card = document.createElement("article");
    card.className = "lab-card";

    const statusText = laboratory.available ? "Disponível" : "Indisponível";
    const statusClass = laboratory.available ? "available" : "unavailable";

    card.innerHTML = `
      <div class="lab-icon" aria-hidden="true">▦</div>
      <div class="lab-info">
        <h3>${laboratory.name}</h3>
        <p>Capacidade: ${laboratory.capacity} alunos</p>
      </div>
      <span class="status ${statusClass}">${statusText}</span>
    `;
    laboratoryList.appendChild(card);

    const option = document.createElement("option");
    option.value = laboratory.id;
    option.textContent = `${laboratory.name} · ${laboratory.capacity} alunos`;
    option.disabled = !canBeReserved(laboratory);
    if (!laboratory.available) option.textContent += " · Indisponível";
    else if (laboratory.capacity < MINIMUM_CAPACITY) option.textContent += " · Capacidade insuficiente";
    laboratorySelect.appendChild(option);
  });
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `form-feedback ${type}`;
}

function renderReservations() {
  bookingCount.textContent = reservations.length;
  reservationList.innerHTML = "";

  if (reservations.length === 0) {
    reservationList.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">▤</span>
        <h3>Nenhuma reserva ainda</h3>
        <p>As solicitações confirmadas aparecerão aqui durante esta execução da página.</p>
      </div>
    `;
    return;
  }

  [...reservations].reverse().forEach((reservation) => {
    const item = document.createElement("article");
    item.className = "reservation-item";
    const [year, month, day] = reservation.date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    item.innerHTML = `
      <div class="reservation-top">
        <h3>${reservation.laboratory}</h3>
        <span class="confirmed">Confirmada</span>
      </div>
      <div class="reservation-meta">
        <span>▦ ${formattedDate}</span>
        <span>◷ ${reservation.time}</span>
        <span>Professor: ${reservation.professor}</span>
      </div>
      <p class="reservation-purpose">${reservation.purpose}</p>
    `;
    reservationList.appendChild(item);
  });
}

function validateReservation(data) {
  if (!data.professor.trim() || !data.registration.trim() || !data.laboratory ||
      !data.date || !data.time || !data.purpose.trim()) {
    return "Preencha todos os campos obrigatórios para continuar.";
  }

  const selectedLaboratory = laboratories.find(
    (laboratory) => laboratory.id === Number(data.laboratory)
  );

  if (!selectedLaboratory) return "Selecione um laboratório válido.";
  if (!selectedLaboratory.available) return "Este laboratório está indisponível.";
  if (selectedLaboratory.capacity < MINIMUM_CAPACITY) {
    return "Este laboratório não atende à capacidade mínima de 30 alunos para aulas regulares.";
  }

  const selectedDate = new Date(`${data.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) return "A data da reserva não pode estar no passado.";

  return "";
}

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(reservationForm);
  const data = Object.fromEntries(formData.entries());
  const validationMessage = validateReservation(data);

  if (validationMessage) {
    showFeedback(validationMessage, "error");
    return;
  }

  const selectedLaboratory = laboratories.find(
    (laboratory) => laboratory.id === Number(data.laboratory)
  );

  reservations.push({
    professor: data.professor.trim(),
    registration: data.registration.trim(),
    laboratory: selectedLaboratory.name,
    date: data.date,
    time: data.time,
    purpose: data.purpose.trim()
  });

  renderReservations();
  reservationForm.reset();
  dateInput.min = new Date().toISOString().split("T")[0];
  showFeedback("Reserva confirmada! A solicitação foi adicionada à lista de reservas.", "success");
});

dateInput.min = new Date().toISOString().split("T")[0];
renderLaboratories();
renderReservations();
