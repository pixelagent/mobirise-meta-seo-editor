defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function() {
        var a = this;

        // 1) Inject Meta SEO fields directly into Page Settings
        var $container = a.$body.find("#app-page-settings .app-layer-cont");

        $container.append([
          '<div class="form-group col-md-12">',
          '  <label for="meta_seo_description">Meta Description</label>',
          '  <textarea id="meta_seo_description" ',
          '    class="form-control" ',
          '    data-page-settings="meta_seo_description" ',
          '    rows="3" ',
          '    placeholder="Enter custom meta description here…"></textarea>',
          '</div>',
          '<div class="form-group col-md-12">',
          '  <label for="meta_seo_keywords">Meta Keywords</label>',
          '  <textarea id="meta_seo_keywords" ',
          '    class="form-control" ',
          '    data-page-settings="meta_seo_keywords" ',
          '    rows="2" ',
          '    placeholder="Enter comma‑separated keywords…"></textarea>',
          '</div>'
        ].join("\n"));

        console.log("✅ Meta SEO Editor injected into page settings.");

        // 2) On publish, insert the stored values into <head> as meta tags
        a.addFilter("publishHTML", function(html, pageData) {
          var headInserts = [];

          if (pageData.meta_seo_description) {
            headInserts.push(
              '<meta name="description" content="' +
              pageData.meta_seo_description.replace(/"/g, '&quot;') +
              '">'
            );
          }

          if (pageData.meta_seo_keywords) {
            headInserts.push(
              '<meta name="keywords" content="' +
              pageData.meta_seo_keywords.replace(/"/g, '&quot;') +
              '">'
            );
          }

          if (headInserts.length) {
            html = html.replace(
              /<\/head>/i,
              headInserts.join("\n    ") + "\n</head>"
            );
          }

          return html;
        });
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
