(function () {
  "use strict";

  var form = document.getElementById("request-form");
  if (!form) return;

  var done = document.getElementById("request-confirmation");
  var heading = document.getElementById("request-confirmation-title");
  var note = document.getElementById("package-note");
  var riders = document.getElementById("riders");

  function selected(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  function packageInfo(id) {
    if (typeof RIDE_PACKAGES === "undefined" || !RIDE_PACKAGES[id]) return null;
    return RIDE_PACKAGES[id];
  }

  function applyPackage(id) {
    var info = packageInfo(id);
    if (note) {
      note.textContent = info && info.requestNote
        ? info.requestNote
        : "No package selected. Pricing TBD on every package.";
    }
    if (id === "romantic") {
      var round = form.querySelector('input[name="trip"][value="round"]');
      if (round) round.checked = true;
      if (riders) riders.value = "2";
    }
  }

  var requested = "";
  try {
    requested = new URLSearchParams(window.location.search).get("package") || "";
  } catch (err) {
    requested = "";
  }
  if (packageInfo(requested) && requested !== "none" && requested !== "general") {
    var radio = form.querySelector('input[name="package"][value="' + requested + '"]');
    if (radio) radio.checked = true;
  }
  applyPackage(selected("package") || "none");

  form.addEventListener("change", function (event) {
    if (event.target && event.target.name === "package") {
      applyPackage(event.target.value);
    }
  });

  form.addEventListener("submit", function () {
    var data = new FormData(form);
    var packageId = String(data.get("package") || "none");
    var info = packageInfo(packageId);
    var trip = String(data.get("trip") || "one-way");
    document.getElementById("echo-package").textContent = info ? info.label : packageId;
    document.getElementById("echo-trip").textContent = trip === "round"
      ? "Round trip (two ride credits: out and back). Pricing TBD."
      : "One way. Pricing TBD.";
    document.getElementById("echo-pickup").textContent = String(data.get("pickup") || "");
    document.getElementById("echo-dropoff").textContent = String(data.get("dropoff") || "");
    document.getElementById("echo-riders").textContent = String(data.get("riders") || "");
    done.hidden = false;
    if (heading) heading.focus();
  });
})();
