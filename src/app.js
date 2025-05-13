defineM("test-page-field", function(jQuery, mbrApp, TR) {
    mbrApp.regExtension({
      name: "test-page-field",
      events: {
        load: function() {
          console.log("Test extension loaded");
  
          var a = this;
  
          a.addFilter("sidebarPageSettings", function(settingsPanels, pageData) {
            const testVal = pageData["test-page-value"] || "";
  
            const html = [
              '<div class="form-group col-md-12">',
              '  <label class="control-label">Test Page Field</label>',
              '  <input type="text" id="test-page-input" class="form-control" value="' + testVal + '" placeholder="Type something...">',
              '</div>'
            ].join("\n");
  
            settingsPanels.push({
              title: "Test Field",
              name: "test-page-field",
              html: html
            });
  
            return settingsPanels;
          });
  
          // Save value
          mbrApp.$body.on("input", "#test-page-input", function() {
            const page = mbrApp.activePage;
            if (page) {
              page["test-page-value"] = $(this).val().trim();
            }
          });
        }
      }
    });
  }, ["jQuery", "mbrApp", "TR()"]);
  
/*

defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
    mbrApp.regExtension({
        name: "meta-seo-editor",
        events: {
            load: function() {
                console.log("meta-seo-editor loaded");
                var a = this;
                
                // Add inputs to each page's settings
                a.addFilter("sidebarPageSettings", function(settingsPanels, pageData) {
                    const keywords = pageData["meta-seo-keywords"] || "";
                    const description = pageData["meta-seo-description"] || "";
                    const author = pageData["meta-seo-author"] || "";

                    const html = [
                        '<div class="form-group col-md-12">',
                        '  <label class="control-label">Meta Keywords:</label>',
                        '  <input type="text" id="meta-seo-keywords" class="form-control" value="' + keywords + '" placeholder="e.g. photography, travel, blog">',
                        '</div>',
                        '<div class="form-group col-md-12">',
                        '  <label class="control-label">Meta Description:</label>',
                        '  <textarea id="meta-seo-description" class="form-control" rows="3" placeholder="Short summary for search engines">' + description + '</textarea>',
                        '</div>',
                        '<div class="form-group col-md-12">',
                        '  <label class="control-label">Meta Author:</label>',
                        '  <input type="text" id="meta-seo-author" class="form-control" value="' + author + '" placeholder="Your Name or Company">',
                        '</div>'
                    ].join("\n");

                    settingsPanels.push({
                        title: "SEO Meta Tags",
                        name: "meta-seo-editor",
                        html: html
                    });

                    return settingsPanels;
                });

                // Save inputs to page settings
                mbrApp.$body.on("input", "#meta-seo-keywords", function () {
                    const page = mbrApp.activePage;
                    if (page) page["meta-seo-keywords"] = $(this).val().trim();
                });

                mbrApp.$body.on("input", "#meta-seo-description", function () {
                    const page = mbrApp.activePage;
                    if (page) page["meta-seo-description"] = $(this).val().trim();
                });

                mbrApp.$body.on("input", "#meta-seo-author", function () {
                    const page = mbrApp.activePage;
                    if (page) page["meta-seo-author"] = $(this).val().trim();
                });
            },

            exportHtml: function(html, pageName) {
                const page = mbrApp.pages.find(p => p.name === pageName);
                if (!page) return html; 

                const tags = [];

                if (page["meta-seo-keywords"]) {
                    tags.push(`<meta name="keywords" content="${page["meta-seo-keywords"].replace(/"/g, '&quot;')}">`);
                }

                if (page["meta-seo-description"]) {
                    tags.push(`<meta name="description" content="${page["meta-seo-description"].replace(/"/g, '&quot;')}">`);
                }

                if (page["meta-seo-author"]) {
                    tags.push(`<meta name="author" content="${page["meta-seo-author"].replace(/"/g, '&quot;')}">`);
                }

                if (tags.length) {
                    const finalMeta = "\n<!-- SEO Meta Tags Start -->\n" + tags.join("\n") + "\n<!-- SEO Meta Tags End -->\n";
                    html = html.replace(/<\/head>/i, finalMeta + "</head>");
                }

                return html;
            }
        }
    });
}, ["jQuery", "mbrApp", "TR()"]);

*/