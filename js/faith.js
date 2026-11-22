(function () {
  "use strict";

  var form = document.getElementById("faith-form");
  if (!form) return;

  var fileInput = document.getElementById("card-image");
  var preview = document.getElementById("card-preview");
  var empty = document.getElementById("preview-empty");
  var fileError = document.getElementById("file-error");
  var done = document.getElementById("faith-confirmation");
  var heading = document.getElementById("faith-confirmation-title");
  var objectUrl = null;

  function clearPreview() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
    preview.removeAttribute("src");
    preview.hidden = true;
    empty.hidden = false;
  }

  function showError(message) {
    fileError.textContent = message;
    fileError.hidden = !message;
    if (message) fileInput.setAttribute("aria-invalid", "true");
    else fileInput.removeAttribute("aria-invalid");
  }

  fileInput.addEventListener("change", function () {
    showError("");
    fileInput.setCustomValidity("");
    clearPreview();
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;

    var looksLikeImage = (file.type && file.type.indexOf("image/") === 0) ||
      /\.(png|jpe?g|gif|webp|bmp|avif)$/i.test(file.name);

    if (!looksLikeImage) {
      fileInput.value = "";
      var message = "Choose an image file. This demo only draws a local preview. Nothing was uploaded.";
      fileInput.setCustomValidity(message);
      showError(message);
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      fileInput.value = "";
      var tooBig = "Choose an image under 8 MB so this browser stays responsive. The file was not uploaded.";
      fileInput.setCustomValidity(tooBig);
      showError(tooBig);
      return;
    }

    objectUrl = URL.createObjectURL(file);
    preview.src = objectUrl;
    preview.alt = "Local preview of the image you selected. It is only on this device.";
    preview.hidden = false;
    empty.hidden = true;
  });

  preview.addEventListener("error", function () {
    if (!objectUrl) return;
    clearPreview();
    showError("This browser could not draw that image. It still was not uploaded or stored.");
  });

  form.addEventListener("submit", function () {
    if (!fileInput.files || !fileInput.files[0] || preview.hidden) {
      var message = "Choose an image to preview. It will stay in this browser.";
      fileInput.setCustomValidity(message);
      showError(message);
      fileInput.reportValidity();
      return;
    }
    fileInput.setCustomValidity("");
    document.getElementById("echo-parish").textContent = String(new FormData(form).get("parish") || "");
    done.hidden = false;
    if (heading) heading.focus();
  });

  window.addEventListener("pagehide", clearPreview);
})();
