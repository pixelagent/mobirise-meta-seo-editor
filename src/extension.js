defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function () {
        const self = this;

        self.addFilter("sidebarPageSettings", function (panels, pageData) {
          panels.push({
            title: "Meta SEO (Test)",
            name: "meta-seo-editor",
            html: `<h2 style="padding: 1rem;">Meta SEO (Test Panel)</h2>` // ✅ simple visible HTML
          });

          return panels;
        });

        // optional, not needed for the test panel
        mbrApp.$body.on("input", "input[name='meta-seo-input']", function () {
          const page = mbrApp.activePage;
          if (page) {
            page["meta-seo-test"] = jQuery(this).val().trim();
          }
        });
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
