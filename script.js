$(document).ready(() => {
  let inputValue = '';

  const display = $('#display');

  function addValue(value) {
    setValue(inputValue + value);
  }

  function setValue(value) {
    inputValue = value;
    display.val(value);
    display.scrollTop(display[0].scrollHeight);
  }

  $("#calculator button[id^='n']").each((i, e) => {
    const element = $(e);
    element.on("click", () => {
      addValue(element.text());
    })
  });

  $("#calculator button[id^='insert-']").on("click", (a) => {
    if (a.target.id.endsWith("decimal-point")) {
      addValue($(a.target).text());
    } else {
      addValue(` ${$(a.target).text()} `);
    }
  });

  $("#calculator button[id='delete']").on("click", () => {
    if (inputValue?.length > 0) {
      setValue(inputValue.substring(0, inputValue.length - 1));
    }
  });

  $("#calculator button[id='equal']").on("click", () => {
    try {
      if (inputValue.length > 0) {
        setValue(eval(inputValue).toString());
      } else {
        setValue("");
      }
    } catch (e) {
      setValue("error");
    }
  });

  $("#calculator button[id='clear']").on("click", () => {
    setValue("");
  });


  $("body").on("keydown", function (event) {
    const key = event.which;

    if (key >= 48 && key <= 57) {
      return $(`#calculator button[id^='n${key - 48}']`).click();
    }
    if (key >= 96 && key <= 105) {
      return $(`#calculator button[id^='n${key - 96}']`).click();
    }

    switch (key) {
      case 27:
        return $(`#calculator button[id='clear']`).click();
      case 13:
        return $(`#calculator button[id='equal']`).click();
      case 8:
      case 46:
        return $(`#calculator button[id='delete']`).click();
      case 106:
        return $(`#calculator button[id^='insert-multiply']`).click();
      case 107:
        return $(`#calculator button[id^='insert-plus']`).click();
      case 109:
        return $(`#calculator button[id^='insert-minus']`).click();
      case 110:
      case 190:
      case 188:
        return $(`#calculator button[id^='insert-decimal-point']`).click();
      case 111:
        return $(`#calculator button[id^='insert-divide']`).click();
    }
  });

})

