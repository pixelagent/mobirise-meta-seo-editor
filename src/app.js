defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function() {
        console.log("meta-seo loaded");
        // Check if the current page is a valid page
        var a = this;
        // Add a new panel to the sidebar
        // Check if the page is a valid page
        a.addFilter("sidebarPageSettings", function(settingsPanels, pageData) {
          const val = pageData["meta-seo-value"] || "";

          const html = [
            '<div class="form-group col-md-12">',
            '  <label class="control-label">Meta Description</label>',
            '  <input type="text" name="meta-seo-input" class="form-control" value="' + val + '" placeholder="Enter meta description">',
            '</div>'
          ].join("\n");
          // Check if the page is a valid page
          settingsPanels.push({
            title: "Meta SEO",
            name: "meta-seo-editor",
            html: html
          });

          console.log("Injected meta SEO panel for", pageData.filename);

          return settingsPanels;
        });

        // Save value on change
        mbrApp.$body.on("input", "input[name='meta-seo-input']", function () {
          const page = mbrApp.activePage;
          if (page) {
            page["meta-seo-value"] = $(this).val().trim();
            console.log("Saved meta SEO value:", page["meta-seo-value"]);
          }
        });
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
