//map jquery
(function($) {
  // USE STRICT
  "use strict";

  $(document).ready(function() {
    var selector_map = $("#google_map");
    var img_pin = selector_map.attr("data-pin");
    var data_map_x = selector_map.attr("data-map-x");
    var data_map_y = selector_map.attr("data-map-y");
    var scrollwhell = selector_map.attr("data-scrollwhell");
    var draggable = selector_map.attr("data-draggable");

    if (img_pin == null) {
      img_pin = "images/icons/location.png";
    }
    if (data_map_x == null || data_map_y == null) {
      data_map_x = 40.007749;
      data_map_y = -93.266572;
    }
    if (scrollwhell == null) {
      scrollwhell = 0;
    }

    if (draggable == null) {
      draggable = 0;
    }

    var style = [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36
          },
          {
            color: "#000000"
          },
          {
            lightness: 40
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#000000"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 17
          }
        ]
      }
    ];

    var latitude = data_map_x,
      longitude = data_map_y,
      map_zoom = 14;

    var locations = [["Welcome", latitude, longitude, 2]];

    if (selector_map !== undefined) {
      var map = new google.maps.Map(document.getElementById("google_map"), {
        zoom: 13,
        scrollwheel: false,
        zoomControl: false,
        disableDoubleClickZoom: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: false,
        draggable: draggable,
        styles: style,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: img_pin
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  });
})(jQuery);

// Contact Section jquery
(function($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input100").each(function() {
    $(this).on("blur", function() {
      if (
        $(this)
          .val()
          .trim() != ""
      ) {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function() {
    $(this).focus(function() {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if (
        $(input)
          .val()
          .trim() == ""
      ) {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

//pop up contact card

function openBox() {
  var j = jQuery; //Prevent jQuery conflicts by using J

  var overlayCls = ".overlay"; //Overlay class

  j(overlayCls).fadeToggle(); //Fadein

  j(".close").click(function() {
    j(overlayCls).fadeOut(); //Fade out when closebutton is clicked
  });

  j(document).keyup(function(e) {
    if (e.keyCode == 27) {
      // Close lightbox when escape key is clicked
      j(overlayCls).fadeOut();
    }
  });
}
