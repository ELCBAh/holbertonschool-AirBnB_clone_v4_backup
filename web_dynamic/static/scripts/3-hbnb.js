$(document).ready(function () {
  let amenitees = {};

  $('input[type="checkbox"]').change(function () {
    let id = $(this).data('id');
    let name = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitees[id] = name;
    } else {
      delete amenitees[id];
    }

    let amenities = Object.values(amenitees).join(', ');
    if (amenities.length > 30) {
      amenities = amenities.substring(0, 30) + '...';
    }
    amenities += "&nbsp;"
    $('.amenities h4').html(amenities);
  });

  $.get('http://0000000:5001/api/v1/places_search/', function (data, status) {
    if (status === 'success') {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        let amenities = place.amenities.join(', ');
        if (amenities.length > 30) {
          amenities = amenities.substring(0, 30) + '...';
        }
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
      }
    }
  });

  $.ajax({
    url: "http://localhost:5001/api/v1/status/",
    type: "GET",
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
