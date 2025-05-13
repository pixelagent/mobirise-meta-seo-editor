defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function () {
        console.log("meta-seo loaded");
        const a = this;

        a.addFilter("sidebarPageSettings", function (settingsPanels, pageData) {
          const val = pageData["meta-seo-value"] || "";

          const html = [
            '<form class="mbr-form">',
            '<div class="form-group col-md-12">',
            '  <label class="control-label">Meta Description</label>',
            '  <input type="text" name="meta-seo-input" class="form-control" value="' + val + '" placeholder="Enter meta description">',
            '</div>',
            '</form>'
          ].join("\n");

          settingsPanels.push({
            title: "Meta SEO",
            name: "meta-seo-editor",
            html: html
          });

          return settingsPanels;
        });

        mbrApp.$body.on("input", "input[name='meta-seo-input']", function () {
          const page = mbrApp.activePage;
          if (page) {
            page["meta-seo-value"] = $(this).val().trim();
          }
        });
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
