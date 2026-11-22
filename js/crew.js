(function () {
  "use strict";

  var status = document.getElementById("dispatch-status");
  var flag = typeof SOBER_CREW_DISPATCH_ENABLED === "boolean" ? SOBER_CREW_DISPATCH_ENABLED : false;

  if (status) {
    if (flag === true) {
      status.textContent = "The code flag SOBER_CREW_DISPATCH_ENABLED is true, but this preview still cannot dispatch anyone. There is no driver network here. The flag may only be turned on after Mann confirms in writing that insurance (including driving a third party's vehicle), background checks, and Rhode Island rules are in place.";
    } else {
      status.textContent = "SOBER_CREW_DISPATCH_ENABLED is false. Volunteer drivers are not dispatched. The flag may only be turned on after Mann confirms in writing that insurance (including driving a third party's vehicle), background checks, and Rhode Island rules are in place.";
    }
  }

  var form = document.getElementById("crew-form");
  if (!form) return;

  form.addEventListener("submit", function () {
    var data = new FormData(form);
    document.getElementById("echo-crew-name").textContent = String(data.get("name") || "");
    document.getElementById("echo-crew-town").textContent = String(data.get("town") || "");
    var done = document.getElementById("crew-confirmation");
    done.hidden = false;
    document.getElementById("crew-confirmation-title").focus();
  });
})();
