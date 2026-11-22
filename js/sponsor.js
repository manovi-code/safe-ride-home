(function () {
  "use strict";

  var form = document.getElementById("sponsor-form");
  if (!form) return;

  var customWrap = document.getElementById("custom-amount-wrap");
  var customInput = document.getElementById("custom-amount");
  var nameWrap = document.getElementById("name-wrap");
  var nameInput = document.getElementById("display-name");
  var done = document.getElementById("sponsor-confirmation");
  var heading = document.getElementById("sponsor-confirmation-title");

  function selected(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  var giftNote = document.getElementById("gift-note");

  function giftInfo(id) {
    if (typeof RIDE_PACKAGES === "undefined" || !RIDE_PACKAGES[id]) return null;
    return RIDE_PACKAGES[id];
  }

  function applyGift(id) {
    var info = giftInfo(id);
    if (!giftNote) return;
    if (info && info.sponsorNote) giftNote.textContent = info.sponsorNote;
    else giftNote.textContent = "No package selected. Pricing TBD — this form does not charge a package price.";
  }

  var requestedGift = "";
  try {
    requestedGift = new URLSearchParams(window.location.search).get("package") || "";
  } catch (err) {
    requestedGift = "";
  }
  if (requestedGift && giftInfo(requestedGift) && requestedGift !== "none") {
    var giftRadio = form.querySelector('input[name="gift"][value="' + requestedGift + '"]');
    if (giftRadio) giftRadio.checked = true;
  }
  applyGift(selected("gift") || "general");

  function syncFields() {
    var amount = selected("amount");
    var identity = selected("identity");
    var showCustom = amount === "custom";
    var showName = identity === "named";
    customWrap.hidden = !showCustom;
    nameWrap.hidden = !showName;
    customInput.required = showCustom;
    nameInput.required = showName;
    if (!showCustom) customInput.setCustomValidity("");
    if (!showName) nameInput.setCustomValidity("");
  }

  form.addEventListener("change", function (event) {
    syncFields();
    if (event.target && event.target.name === "gift") applyGift(event.target.value);
  });
  syncFields();

  form.addEventListener("submit", function () {
    if (selected("amount") === "custom") {
      var value = Number(customInput.value);
      if (!customInput.value || Number.isNaN(value) || value <= 0) {
        customInput.setCustomValidity("Enter an amount greater than zero, or pick another choice.");
        customInput.reportValidity();
        return;
      }
      customInput.setCustomValidity("");
    }

    var amountLabel;
    var amount = selected("amount");
    if (amount === "one-ride") {
      amountLabel = "Sponsor one ride (no dollar amount — that price is not set)";
    } else if (amount === "custom") {
      amountLabel = "$" + customInput.value + " (a gift amount you typed — not a ride price)";
    } else {
      amountLabel = "$" + amount + " (a gift amount you picked — not a ride price)";
    }

    var named = selected("identity") === "named";
    if (named && !nameInput.value.trim()) {
      nameInput.setCustomValidity("Enter a name, or choose Anonymous.");
      nameInput.reportValidity();
      return;
    }
    nameInput.setCustomValidity("");
    var displayName = named ? nameInput.value.trim() : "Anonymous";
    var optedIn = document.getElementById("leaderboard").checked;

    var giftId = selected("gift") || "general";
    var gift = giftInfo(giftId);
    var giftLabel = gift ? gift.label : giftId;
    if (giftId === "new-driver") giftLabel = "Gift a New Driver Safe Pass";
    document.getElementById("echo-gift").textContent = giftLabel + ". Pricing TBD — not a package price.";
    document.getElementById("echo-amount").textContent = amountLabel;
    document.getElementById("echo-name").textContent = displayName || "Anonymous";

    var board = document.getElementById("echo-board");
    if (!named && optedIn) {
      board.textContent = "You checked the leaderboard box, and you also chose Anonymous. A live list would not publish a name for an anonymous gift. This demo did not add you to any list.";
    } else if (named && optedIn) {
      board.textContent = "You opted in. On a live site, the name you typed would be allowed on the public donor leaderboard. This demo did not publish it.";
    } else if (named && !optedIn) {
      board.textContent = "You left the leaderboard unchecked, which is the default. On a live site your name would stay off the public list.";
    } else {
      board.textContent = "You stayed anonymous and left the leaderboard unchecked. That is the respectful default. Nothing was listed.";
    }

    done.hidden = false;
    if (heading) heading.focus();
  });
})();
