defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function () {
        const self = this;

        // Add fields to page settings
        self.addFilter("sidebarPageSettings", function (panels, pageData) {
          const description = pageData["meta-description"] || "";
          const keywords = pageData["meta-keywords"] || "";

          panels.push({
            title: "Meta SEO",
            name: "meta-seo-editor",
            html: [
              '<div class="form-group col-md-12">',
              '  <label class="control-label">Meta Description</label>',
              `  <input type="text" name="meta-description" class="form-control" value="${description}" placeholder="Enter meta description">`,
              '</div>',
              '<div class="form-group col-md-12">',
              '  <label class="control-label">Meta Keywords</label>',
              `  <input type="text" name="meta-keywords" class="form-control" value="${keywords}" placeholder="Enter meta keywords">`,
              '</div>'
            ].join("\n")
          });

          return panels;
        });

        // Save on change
        mbrApp.$body.on("input", "input[name='meta-description'], input[name='meta-keywords']", function () {
          const $input = jQuery(this);
          const page = mbrApp.activePage;
          if (page) {
            page[$input.attr("name")] = $input.val().trim();
          }
        });

        // Inject <meta> tags into <head> during export
        self.addFilter("publishHTML", function (html, page) {
          const headInsert = [];
          if (page["meta-description"]) {
            headInsert.push(`<meta name="description" content="${page["meta-description"]}">`);
          }
          if (page["meta-keywords"]) {
            headInsert.push(`<meta name="keywords" content="${page["meta-keywords"]}">`);
          }

          return html.replace(/<\/head>/i, headInsert.join("\n") + "\n</head>");
        });
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
