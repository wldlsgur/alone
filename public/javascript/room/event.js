var CreateRoom = {
  Show: function () {
    modal_create_room.css("display", "block");
  },
  Hidden: function () {
    modal_create_room.css("display", "none");
  },
  Create: function (event) {
    event.preventDefault();
    let info = {
      user_id: $("#user_id").val(),
      title: $(".create-form__title").val(),
      pw: $(".create-form__pw").val(),
      people: $(".create-form__max").val(),
    };
    axios
      .post("/room/make", info)
      .then((response) => {
        if (response.data.res === true) {
          CreateRoom.Hidden();
          alert("방 생성 완료!");
          return location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        return alert("방 생성 실패!");
      });
  },
};

var room = {
  root_all_room: document.querySelector(".room-list"),
  root_myall_room: document.querySelector(".my-room-list"),
  all_room: () => {
    axios
      .get("/room/show/all")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.setAttribute("class", "room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" />
          <p class="room__name">${response.data[i].title}</p>
          <p class="room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>
          `;
          room.root_all_room.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  all_my_room: () => {
    axios
      .get("/room/show/my")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.classList.add("my-room");
          let mm = new modal_myroom(
            response.data[i].room_id,
            response.data[i].title,
            response.data[i].nowpeople,
            response.data[i].people
          );
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" />
          <p class="my-room__name">${response.data[i].title}</p>
          <p class="my-room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>
          `;
          make_room
            .querySelector(".my-room__name")
            .addEventListener("click", mm.Show);
          console.log(mm);
          room.root_myall_room.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
class modal_myroom {
  constructor(id, title, nowpeople, people) {
    this.id = id;
    this.title = title;
    this.nowpeople = nowpeople;
    this.people = people;
  }
  Show(e) {
    console.log(this.title);
    e.target.innerText = this.title;
    e.target.querySelector(".nowpeople").innerText = this.nowpeople;
    e.target.querySelector(".people").innerText`` = this.people;
    document.querySelector(".modal-myroom").style.display = "block";
  }
  Hidden() {
    document.querySelector(".modal-myroom").style.display = "none";
  }
}
const modal_create_room = $(".create-room");
const user_id = document.querySelector("#user_id").value;
const modalMyroom = new modal_myroom();
$(document).ready(function () {
  room.all_room();
  room.all_my_room();
});
$(".header__add").click(CreateRoom.Show);
$(".create-form__exit").click(CreateRoom.Hidden);
$(".create-form__create").click(CreateRoom.Create);
document
  .querySelector(".room-btn__exit")
  .addEventListener("click", modalMyroom.Hidden);

// class Axios {
//   constructor() {}
//   Post() {}
//   GEt() {}
//   Put() {}
//   Delete() {}
// }
