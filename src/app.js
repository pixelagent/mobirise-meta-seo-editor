defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function () {
        var a = this;

        const $container = a.$body.find("#app-page-settings .app-layer-cont");

        // Add a textarea to display full <body> HTML
        $container.append([
          '<div class="form-group">',
          '  <label for="body_html_viewer">Body HTML Content</label>',
          '  <textarea id="body_html_viewer" class="form-control" rows="15" placeholder="Loading body HTML..."></textarea>',
          '</div>'
        ].join("\n"));

        // Try to get the <body> HTML from the iframe
        setTimeout(function () {
          try {
            const iframe = document.querySelector("#app-iframe");
            if (iframe && iframe.contentDocument) {
              const bodyHTML = iframe.contentDocument.body.innerHTML.trim();
              a.$body.find("#body_html_viewer").val(bodyHTML);
              console.log("✅ Injected <body> HTML into textarea");
            } else {
              console.warn("⚠️ iframe not found or not loaded");
              a.$body.find("#body_html_viewer").val("Unable to load iframe content.");
            }
          } catch (e) {
            console.error("❌ Error reading <body> HTML:", e);
            a.$body.find("#body_html_viewer").val("Error reading HTML: " + e.message);
          }
        }, 1000); // Delay for iframe to load
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
