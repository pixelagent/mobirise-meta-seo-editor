defineM("meta-seo-editor", function(jQuery, mbrApp, TR) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    mbrApp.regExtension({
      name: "meta-seo-editor",
      events: {
        load: function() {
          console.log("meta-seo loaded");
  
          var a = this;
  
          a.addFilter("sidebarPageSettings", function(settingsPanels, pageData) {
            const testVal = pageData["meta-seo-value"] || "";
  
            const html = [
              '<div class="form-group col-md-12">',
              '  <label class="control-label">meta-seo Field</label>',
              '  <input type="text" id="meta-seo-input" class="form-control" value="' + testVal + '" placeholder="Type something...">',
              '</div>'
            ].join("\n");
  
            settingsPanels.push({
              title: "meta-seo Field",
              name: "meta-seo-editor",
              html: html
            });
  
            return settingsPanels;
          });
  
          // Save value
          mbrApp.$body.on("input", "#meta-seo-input", function() {
            const page = mbrApp.activePage;
            if (page) {
              page["meta-seo-value"] = $(this).val().trim();
            }
=======
=======
>>>>>>> Stashed changes
  mbrApp.regExtension({
    name: "meta-seo-editor",
    events: {
      load: function() {
        console.log("Meta SEO Editor loaded");

        const a = this;

        a.addFilter("sidebarPageSettings", function(panels, page) {
          const metaKeywords = page["metaKeywords"] || "";
          const metaDescription = page["metaDescription"] || "";
          const metaAuthor = page["metaAuthor"] || "";

          const html = `
            <div class="form-group col-md-12">
              <label class="control-label">Meta Keywords</label>
              <input type="text" name="metaKeywords" class="form-control" value="${metaKeywords}" placeholder="e.g. web, development, seo">
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Meta Description</label>
              <textarea name="metaDescription" class="form-control" rows="3" placeholder="Page description...">${metaDescription}</textarea>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Meta Author</label>
              <input type="text" name="metaAuthor" class="form-control" value="${metaAuthor}" placeholder="Author name">
            </div>
          `;

          panels.push({
            title: "Meta SEO",
            name: "meta-seo-editor",
            html: html
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          });

          return panels;
        });

        // Save changes to page data
        mbrApp.$body.on("input change", "[name='metaKeywords'], [name='metaDescription'], [name='metaAuthor']", function() {
          const page = mbrApp.activePage;
          if (page) {
            page["metaKeywords"] = $("[name='metaKeywords']").val().trim();
            page["metaDescription"] = $("[name='metaDescription']").val().trim();
            page["metaAuthor"] = $("[name='metaAuthor']").val().trim();
          }
        });
      },

      exportHtml: function(html, pageName) {
        const page = mbrApp.pages.find(p => p.name === pageName);
        if (!page) return html;

        let metaTags = "";

        if (page.metaKeywords) {
          metaTags += `<meta name="keywords" content="${page.metaKeywords}">\n`;
        }
        if (page.metaDescription) {
          metaTags += `<meta name="description" content="${page.metaDescription}">\n`;
        }
        if (page.metaAuthor) {
          metaTags += `<meta name="author" content="${page.metaAuthor}">\n`;
        }

        if (metaTags) {
          html = html.replace(/<\/head>/i, metaTags + "</head>");
        }

        return html;
      }
    }
  });
}, ["jQuery", "mbrApp", "TR()"]);
<<<<<<< Updated upstream
<<<<<<< Updated upstream

*/
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
