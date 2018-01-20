$.get("https://api.coinmarketcap.com/v1/ticker/", function(data, status) {
  for (var i = 0; i < data.length - 1; i++) {
    if (data[i].id == "pivx") {
      $("#my_cell").html(data[i].price_usd);
    }
  }
});