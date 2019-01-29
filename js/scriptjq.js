const $inputAdd = $('.add-input');
const $date = new Date();
const $formatDate = `${$date.getHours()}:${$date.getMinutes()}`;


// ADD TASK
$('.add-btn').click(() => {
  $inputAdd.val();
  $(`<li class="list-item">
    <div class="item-header">
      <h2 class="title">${$inputAdd.val()}</h2>
      <p class="add-date">${$formatDate}</p>
    </div>
  <button class="delete-btn">
    <i class="far fa-trash-alt"></i>
  </button></li>`)
    .appendTo('.to-do-list');

  $inputAdd.val('');
})