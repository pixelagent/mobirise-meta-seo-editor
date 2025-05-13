defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function() {
        var a = this;

        // Inject Meta SEO fields directly into page settings
        a.$body.find("#app-page-settings .app-layer-cont").append([
          '<div class="form-group">',
          '  <label for="meta_seo_description">Meta SEO Description</label>',
          '  <textarea id="meta_seo_description" class="form-control" data-page-settings="meta_seo_description" rows="3" placeholder="Enter custom meta description here..."></textarea>',
          '</div>'
        ].join("\n"));

        // Optional console for dev confirmation
        console.log("✅ Meta SEO Editor injected into page settings.");
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
