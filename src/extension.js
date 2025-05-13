defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function () {
        const self = this;

        self.addFilter("sidebarPageSettings", function (panels, pageData) {
          const val = pageData["meta-seo-test"] || "";

          panels.push({
            title: "Meta SEO (Test)",
            name: "meta-seo-editor",
            html: `
              <form class="mbr-form">
                <div class="form-group col-md-12">
                  <label class="control-label">Meta Description (Test)</label>
                  <input type="text" name="meta-seo-input" class="form-control" value="${val}" placeholder="Type something...">
                </div>
              </form>
            `
          });

          return panels;
        });

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
