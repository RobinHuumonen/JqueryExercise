$("#Start").click(function() {
  const startTime = Date.now();
  let fname = "";
  let lname = "";
  function setNames(response, status, xhr) {
    fname = response.fname;
    lname = response.lname;
    return fname, lname;
  }

  const nameData = {
    fname: $("#fname")[0].value,
    lname: $("#lname")[0].value
  }
  if (nameData.fname && nameData.lname) {
    const post = $.post("http://localhost:3000/user", nameData);
    post.done(setNames);
  }

  $("#div1").replaceWith(
    $('<div/>')
      .attr({
        id: "div2",
        class: "container my-container"
      })
  );

  $("#div2").append(
    $('<p/>').attr("id", "textPanel").html("")
  )

  const colors = [];
  colors[0] = "blue";
  colors[1] = "red";
  colors[2] = "green";
  colors[3] = "orange";
  colors[4] = "purple";
  colors[5] = "pink";

  const colorOccurrences = [];

  for (let row = 0; row < 6; row++) {
    $("#div2").append(
      $('<div/>').attr({
        id: `row${row}`,
        class: "row my-row"
      })
    );

    for (let column = 0; column < 6; column++) {
      $(`#row${row}`).append(
        $('<div/>').attr({
          id: `cell${row}${column}`,
          class: "col my-col",
        }).click(cellClick)
      );
    }
  }

  for (let i = 0; i < 36; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    colorOccurrences.push(color);
    const colorCount = colorOccurrences.filter(e => e === color).length;
    if (colorCount >= 6) {
      colors.splice(colors.indexOf(color), 1);
    } 
  }

  $(".my-col").each(function(i) {
    $(this).css('background-color', colorOccurrences[i]);
  });

  let cellClicks = new Array();

  function cellClick() {
    function appendResults(response, status, xhr) {
      if (fname && lname) {
        $("#div2").append(
          $('<p/>').attr("id", "result").html(`${fname} ${lname}'s ${response.result}`)
        )
      } else {
        $("#div2").append(
          $('<p/>').attr("id", "result").html(`${response.result}`)
        )
      }

    }

    cellClicks.push([$(this).css('background-color'), $(this).attr('id')]);

    $('#textPanel').css('color', $(this).css('background-color'));
    $('#textPanel').html($(this).css('background-color'));

    const backgroundColor = 0;
    const id = 1;
    const currentClickColor = cellClicks.length - 1;
    const previousClickColor = cellClicks.length - 2;

    if (cellClicks[previousClickColor]) {

      if (cellClicks[currentClickColor][backgroundColor] ===
        cellClicks[previousClickColor][backgroundColor] &&
        cellClicks[currentClickColor][id] !== cellClicks[previousClickColor][id]) {
        $(`#${cellClicks[currentClickColor][id]}`).css('background-color', 'black');
        $(`#${cellClicks[previousClickColor][id]}`).css('background-color', 'black');
        cellClicks = [];
      }
    }

    const blacks = new Array();

    $(".my-col").each(function() {
      if ($(this).css('background-color') === 'rgb(0, 0, 0)') {
        blacks.push(1)
      } 
    });

    if (blacks.length === 36) {
      const endTime = Date.now();
      const deltaTime = Math.floor(endTime - startTime) / 1000;
      const minutes = (deltaTime / 60);
      const seconds = (minutes - Math.floor(minutes)) * 60;

      $('#textPanel').css('color', "black");
      $('#textPanel').html("Game over");

      const results = {
        result: `total playtime: ${Math.floor(minutes)} minutes and ${Math.floor(seconds)} seconds`,
        fname,
        lname
      };
      
      const post = $.post("http://localhost:3000/result", results);
      post.done(appendResults);
    }
    
  }

});
